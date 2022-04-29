from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.response import FileResponse
from django.db.models import Value
from django.http.response import HttpResponse
from django.http import Http404

from datetime import datetime
from caseHandler.models import Case
from caseHandler.serializers import CaseSerializer
from caseHandler.serializers import CaseSerializerI

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
        cases.annotate(index=Value(''))
        for row_num, case in enumerate(cases):
            case.index = row_num
        cases_serializer = CaseSerializerI(cases, many=True)
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
