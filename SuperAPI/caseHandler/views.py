from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.response import FileResponse
from django.http.response import HttpResponse
from django.http import Http404
import os

from datetime import datetime
from caseHandler.models import Case
from caseHandler.serializers import CaseSerializer

from caseHandler.models import Exhibits
from caseHandler.serializers import ExhibitsSerializer

from docsCreate.docx_generator import generate_docx
from django.core.files.storage import default_storage


def filterDate(case_list,query_data):
    if "" != query_data['min_date']:
        min_date = datetime. strptime(query_data['min_date']+" 00:00:00", '%d/%m/%y'+' %H:%M:%S')
    else:
        min_date = datetime.min
    if "" != query_data['max_date']:
        max_date = datetime. strptime(query_data['max_date']+" 00:00:00", '%d/%m/%y'+' %H:%M:%S')
    else:
        max_date = datetime.max

    for case in Case.objects.values():
        #create datetime objects from given dates
        case_date = datetime. strptime(case['event_date']+" 00:00:00", '%d/%m/%y'+' %H:%M:%S')
        if not min_date <= case_date <= max_date:#if date not in range
            case_list.exclude(event_date = case['event_date'])#remove all objects with this date
            print("in between")
        else:
            print("No!")
    #returns new case querySet object
    return case_list

def monthly_sum(dates):#more updates will come
    case_list = []
    count = 0
    monthly_sum_events = []
    for case in Case.objects.all():
        if case['reference_type'] == 'open':
            count += 1
        case_list += [case]
    filtered_case_list = filterDate(case_list, dates)

    #generally opened

    monthly_sum_events += [count]

    count = 0

    #opened cases this month
    for case in filtered_case_list:
        if case['reference_type'] == 'open':
            count += 1
    monthly_sum_events += [count]

    #closed cases this month
    closed_cases = len(filtered_case_list) - count
    monthly_sum_events += [closed_cases]

    count = 0
    #events without area
    for case in filtered_case_list:
        if case['event location'] == '':
            count += 1
    monthly_sum_events += [count]

    #total evetns this month
    monthly_sum_events += [len(filtered_case_list)]

    count_weapons = 0
    count_explosive_device = 0
    count_fireworks = 0
    count_query = 0
    for case in filtered_case_list:
        if case['event_type'] == 'weapons':
            count_weapons += 1
        if case['event_type'] == 'explosive_device':
            count_explosive_device += 1
        if case['event_type'] == 'fireworks':
            count_fireworks += 1
        if case['event_type'] == 'query':
            count_query += 1
    num_of_event_types = [count_weapons,count_explosive_device,count_fireworks,count_query]
    monthly_sum_events += [num_of_event_types]

    monthly_sum_events += [0]
    monthly_sum_events += [0]

    return monthly_sum_events

def yearly_sum(msg):
    date_list = list(msg.split('/'))
    year = date_list[2]
    year = year[6:]
    jan_sum = monthly_sum({'min_date': ('01/01/' + year), 'max_date': ('31/01/' + year)})#with /
    feb_sum = monthly_sum({'min_date': ('01/02/' + year), 'max_date': ('28/02/' + year)})
    mar_sum = monthly_sum({'min_date': ('01/03/' + year), 'max_date': ('31/03/' + year)})
    apr_sum = monthly_sum({'min_date': ('01/04/' + year), 'max_date': ('30/04/' + year)})
    may_sum = monthly_sum({'min_date': ('01/05/' + year), 'max_date': ('31/05/' + year)})
    jun_sum = monthly_sum({'min_date': ('01/06/' + year), 'max_date': ('30/06/' + year)})
    jul_sum = monthly_sum({'min_date': ('01/07/' + year), 'max_date': ('31/07/' + year)})
    aug_sum = monthly_sum({'min_date': ('01/08/' + year), 'max_date': ('31/08/' + year)})
    sep_sum = monthly_sum({'min_date': ('01/09/' + year), 'max_date': ('30/09/' + year)})
    oct_sum = monthly_sum({'min_date': ('01/10/' + year), 'max_date': ('31/10/' + year)})
    nov_sum = monthly_sum({'min_date': ('01/11/' + year), 'max_date': ('30/11/' + year)})
    dec_sum = monthly_sum({'min_date': ('01/12/' + year), 'max_date': ('31/12/' + year)})
    general_list = [jan_sum,feb_sum,mar_sum,apr_sum,may_sum,jun_sum,jul_sum,aug_sum,sep_sum,oct_sum,nov_sum,dec_sum]
    yearly_sum_events = []

    count = 0

    for num in range(len(jan_sum) - 1):
        for sum in general_list:
            count += sum[num]
        yearly_sum_events += [count]
        count = 0
    yearly_sum_events += jan_sum[len(jan_sum) - 2]

    categ_list = []

    for i in range(4):
        count = 0
        for sum in general_list:
            count += sum[len(sum) - 1][i]
        categ_list += [count]

    yearly_sum_events += [categ_list]

    yearly_sum_events += [0]
    yearly_sum_events += [0]

    return yearly_sum_events

def general_sum(msg):
    data_list = []

    if 'month' in msg:
        new_msg = list(msg.split('/'))
        msg = new_msg[len(new_msg) - 1]
        splited_msg = list(msg.split('|'))
        dates_data = {'min_date': splited_msg[0], 'max_date': splited_msg[1]}
        data_list = monthly_sum(dates_data)
    elif 'year' in msg:
        data_list = yearly_sum(msg)

    return data_list

@csrf_exempt
def queryHandler(request):
    query_data = JSONParser().parse(request)
    cases = Case.objects.all()
    if "" != query_data['min_date'] and "" != query_data['max_date']:
        filterDate(cases,query_data)

    if "" != query_data['internal_number']:
        cases.filter(internal_number=query_data['internal_number'])
    if "" != query_data['event_type']:
        cases.filter(event_type = query_data['event_type'])
    if "" != query_data['received_date']:
        cases.filter(received_date=query_data['received_date'])
    if "" != query_data['district']:
        cases.filter(district=query_data['district'])
    if "" != query_data['event_location']:
        cases.filter(event_location=query_data['event_location'])
    if "" != query_data['station']:
        cases.filter(station=query_data['station'])
    if "" != query_data['reference_number']:
        cases.filter(reference_number=query_data['reference_number'])
    if "" != query_data['area']:
        cases.filter(area=query_data['area'])
    if "" != query_data['station']:
        cases.filter(station=query_data['station'])
    if "" != query_data['weapon_name']:
        cases.filter(weapon_name=query_data['weapon_name'])
    if "" != query_data['explosive_device_material']:
        cases.filter(explosive_device_material=query_data['explosive_device_material'])
    if "" != query_data['explosive_device_means']:
        cases.filter(explosive_device_means=query_data['explosive_device_means'])
    if "" != query_data['weapon_options']:
        cases.filter(weapon_options=query_data['weapon_options'])
    if "" != query_data['explosive_device_operating_system']:
        cases.filter(explosive_device_operating_system=query_data['explosive_device_operating_system'])
    if "" != query_data['weapon_mark']:
        cases.filter(weapon_mark=query_data['weapon_mark'])
    if "" != query_data['explosive_device_spray']:
        cases.filter(explosive_device_spray=query_data['explosive_device_spray'])
    if "" != query_data['weapon_color']:
        cases.filter(weapon_color=query_data['weapon_color'])
    if "" != query_data['explosive_device_camouflage']:
        cases.filter(explosive_device_camouflage=query_data['explosive_device_camouflage'])
    if "" != query_data['weapon_additional_characteristics']:
        cases.filter(weapon_additional_characteristics=query_data['weapon_additional_characteristics'])
    if "" != query_data['lab_name']:
        cases.filter(lab_name=query_data['lab_name'])
    cases_serializer = CaseSerializer(cases, many=True)
    return JsonResponse(cases_serializer.data, safe=False)


# Create your views here.
@csrf_exempt
def caseApi(request, case_name=""):
    if request.method == 'GET':
        cases = Case.objects.all()
        cases_serializer = CaseSerializer(cases, many=True)
        return JsonResponse(cases_serializer.data, safe=False)

    elif request.method == 'POST':
        case_data = JSONParser().parse(request)
        department_serializer = CaseSerializer(data=case_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Addd.", safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Case.objects.get(internal_number=department_data['internal_number'])
        department_serializer = CaseSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        department = Case.objects.get(internal_number=case_name)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def exhibitsApi(request, bag_number=""):
    if request.method == 'GET':
        exhibits_value = Exhibits.objects.all()
        exhibits_serializer = ExhibitsSerializer(exhibits_value, many=True)
        return JsonResponse(exhibits_serializer.data, safe=False)
    elif request.method == 'POST':
        exhibits_data = JSONParser().parse(request)
        exhibits_data['exhibits_packaging'] = exhibits_data['exhibit_packaging']
        del exhibits_data['exhibit_packaging']
        exhibits_data['exhibits_mark'] = exhibits_data['exhibit_mark']
        del exhibits_data['exhibit_mark']
        department_serializer = ExhibitsSerializer(data=exhibits_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department_data['exhibits_packaging'] = department_data['exhibit_packaging']
        del department_data['exhibit_packaging']
        department_data['exhibits_mark'] = department_data['exhibit_mark']
        del department_data['exhibit_mark']
        department = Exhibits.objects.get(bag_number=department_data['bag_number'])
        department_serializer = ExhibitsSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        department = Exhibits.objects.get(CaseName=bag_number)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def downloadFile(request):
    if request.method == 'GET':
        docx_data = request.GET.dict()
        file = generate_docx(docx_data)  # create file binary stream
        resp = FileResponse(file, as_attachment=True, filename='temp.docx')  # create return resp with file
        return resp
    return Http404("Not Get Request")
