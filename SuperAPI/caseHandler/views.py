from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.response import FileResponse
from django.db.models import Value
from django.http.response import HttpResponse
from django.http import Http404
from django.db.models import Max
from django.utils.translation import ugettext
from io import BytesIO
import xlsxwriter
from datetime import datetime

from django.db.models import Value

from caseHandler.models import Case
from caseHandler.serializers import CaseSerializer
from caseHandler.serializers import CaseSerializerI

from caseHandler.models import Exhibits
from caseHandler.serializers import ExhibitsSerializer
from caseHandler.serializers import ExhibitsSerializerI

from caseHandler.models import Samples
from caseHandler.serializers import SamplesSerializer

from docsCreate.docx_generator import generate_docx
from django.core.files.storage import default_storage


def filterDate(case_list,query_data):
    if "" != query_data['min_date']:
        min_date = datetime.strptime(query_data['min_date'], '%Y-%m-%dT%H:%M:%S.%f%z')
    else:
        min_date = datetime.min
    if "" != query_data['max_date']:
        max_date = datetime.strptime(query_data['max_date'], '%Y-%m-%dT%H:%M:%S.%f%z')
    else:
        max_date = datetime.max

    for case in Case.objects.values():
        #create datetime objects from given dates
        case_date = datetime.strptime(case['event_date'], '%Y-%m-%dT%H:%M:%S.%f%z')
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
        cases = filterDate(cases,query_data)
    if "" != query_data['internal_number']: 
        cases = cases.filter(internal_number=query_data['internal_number'])
    if "" != query_data['received_or_go']:
        cases = cases.filter(received_or_go=query_data['received_or_go'])
    if "" != query_data['lab_name']:
        cases = cases.filter(lab_name=query_data['lab_name'])
    if "" != query_data['event_characteristic']:
        cases = cases.filter(event_characteristic=query_data['event_characteristic'])
    if "" != query_data['event_date']:
        cases = cases.filter(event_date=query_data['event_date'])
    if "" != query_data['received_date']:
        cases = cases.filter(received_date=query_data['received_date'])
    if "" != query_data['event_type']:
        cases = cases.filter(event_type=query_data['event_type'])
    if "" != query_data['pele_number']:
        cases = cases.filter(pele_number=query_data['pele_number'])
    if "" != query_data['district']:
        cases = cases.filter(district=query_data['district'])
    if "" != query_data['investigating_unit']:
        cases = cases.filter(investigating_unit=query_data['investigating_unit'])
    if "" != query_data['explosion_or_disarm']:
        cases = cases.filter(explosion_or_disarm=query_data['explosion_or_disarm'])
    if "" != query_data['reference_number']:
        cases = cases.filter(reference_number=query_data['reference_number'])
    if "" != query_data['status']:
        cases = cases.filter(status=query_data['status'])
    if "" != query_data['event_location']:
        cases = cases.filter(event_location=query_data['event_location'])
    if "" != query_data['event_description']:
        cases = cases.filter(event_description=query_data['event_description'])
    if "" != query_data['sender_name']:
        cases = cases.filter(sender_name=query_data['sender_name'])

    if "" != query_data['weapon_name']:
        cases = cases.filter(weapon_name=query_data['weapon_name'])
    if "" != query_data['explosive_device_material']:
        cases = cases.filter(explosive_device_material=query_data['explosive_device_material'])
    if "" != query_data['explosive_device_means']:
        cases = cases.filter(explosive_device_means=query_data['explosive_device_means'])
    if "" != query_data['weapon_options']:
        cases = cases.filter(weapon_options=query_data['weapon_options'])
    if "" != query_data['explosive_device_operating_system']:
        cases = cases.filter(explosive_device_operating_system=query_data['explosive_device_operating_system'])
    if "" != query_data['weapon_mark']:
        cases = cases.filter(weapon_mark=query_data['weapon_mark'])
    if "" != query_data['explosive_device_spray']:
        cases = cases.filter(explosive_device_spray=query_data['explosive_device_spray'])
    if "" != query_data['weapon_color']:
        cases = cases.filter(weapon_color=query_data['weapon_color'])
    if "" != query_data['explosive_device_camouflage']:
        cases = cases.filter(explosive_device_camouflage=query_data['explosive_device_camouflage'])
    if "" != query_data['weapon_additional_characteristics']:
        cases = cases.filter(weapon_additional_characteristics=query_data['weapon_additional_characteristics'])
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
        print("\n\ncase post")
        case_data = JSONParser().parse(request)
        print("case_data",case_data)
        department_serializer = CaseSerializer(data=case_data)
        print("department_serializer",type(department_serializer))
        if department_serializer.is_valid():
            print("is valid")
            department_serializer.save()
            print("Added Successfully")
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Addd.", safe=False)

    elif request.method == 'PUT':
        print("case put")
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


def WriteToExcel(exhibit_data):
    output = BytesIO()
    workbook = xlsxwriter.Workbook(output)
    worksheet_s = workbook.add_worksheet("Exhibits")
    header = workbook.add_format({
        'bg_color': '#F7F7F7',
        'color': 'black',
        'align': 'center',
        'valign': 'top',
        'border': 1
    })
    #create collum names
    worksheet_s.write(0, 0, ugettext("internal_number"), header)
    worksheet_s.write(0, 1, ugettext("exhibit_number"), header)
    worksheet_s.write(0, 2, ugettext("location"), header)
    worksheet_s.write(0, 3, ugettext("description"), header)
    worksheet_s.write(0, 4, ugettext("amount"), header)
    worksheet_s.write(0, 5, ugettext("destination"), header)
    worksheet_s.write(0, 6, ugettext("explosive"), header)
    worksheet_s.write(0, 7, ugettext("explosive_weight"), header)
    worksheet_s.write(0, 8, ugettext("tnt_equivalent"), header)
    worksheet_s.write(0, 9, ugettext("received_date"), header)
    worksheet_s.write(0, 10, ugettext("handle_date"), header)
    worksheet_s.write(0, 11, ugettext("investigator_name"), header)
    worksheet_s.write(0, 12, ugettext("lab_name"), header)
    worksheet_s.write(0, 13, ugettext("result"), header)

    #put data in table
    for idx, data in enumerate(exhibit_data):
        row = 1 + idx
        worksheet_s.write_string(row, 0, data['internal_number'])
        worksheet_s.write_string(row, 1, data['exhibit_number'])
        worksheet_s.write_string(row, 2, data['location'])
        worksheet_s.write_string(row, 3, data['description'])
        worksheet_s.write_string(row, 4, data['amount'])
        worksheet_s.write_string(row, 5, data['destination'])
        worksheet_s.write_string(row, 6, data['explosive'])
        worksheet_s.write_string(row, 7, data['explosive_weight'])
        worksheet_s.write_string(row, 8, data['tnt_equivalent'])
        worksheet_s.write_string(row, 9, data['received_date'])
        worksheet_s.write_string(row, 10, data['handle_date'])
        worksheet_s.write_string(row, 11, data['investigator_name'])
        worksheet_s.write_string(row, 12, data['lab_name'])
        worksheet_s.write_string(row, 13, data['result'])
    workbook.close()
    xlsx_data = output.getvalue()
    # xlsx_data contains the Excel file
    return xlsx_data

@csrf_exempt
def exhibitDwnld(request):
    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename=Report.xlsx'
    xlsx_data = WriteToExcel(Exhibits.objects.values())
    response.write(xlsx_data)
    return response

#given a case internal number, returns all exhibits related to it
#internal number should be sent as a Json param 'internal_number' : <value>
@csrf_exempt
def exhibitQuery(request):
    query_data = JSONParser().parse(request)
    exhibits = Exhibits.objects.all()
    exhibits.filter(internal_number=query_data['internal_number'])
    exhibits_serializer = ExhibitsSerializer(exhibits, many=True)
    return JsonResponse(exhibits_serializer.data, safe=False)
@csrf_exempt
def exhibitsApi(request, exhibit_number = ""):
    if request.method == 'GET':
        exhibit = Exhibits.objects.all()
        exhibit.annotate(index = Value(''))
        for row_num, exh in enumerate(exhibit):
            exh.index = row_num
        exhibits_serializer = ExhibitsSerializerI(exhibit, many=True)
        return JsonResponse(exhibits_serializer.data, safe=False)

    elif request.method == 'POST':
        exhibit_data = JSONParser().parse(request)
        exhibits_serializer = ExhibitsSerializer(data=exhibit_data)
        if exhibits_serializer.is_valid():
            exhibits_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        exhibit_data = JSONParser().parse(request)
        exhibit = Exhibits.objects.get(internal_number = exhibit_data["internal_number"] ,exhibit_number=exhibit_data['exhibit_number'])
        exhibits_serializer = ExhibitsSerializer(exhibit, data=exhibit_data)
        if exhibits_serializer.is_valid():
            exhibits_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        department = Case.objects.get(exhibit_number=exhibit_number)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)

@csrf_exempt
def idApi(request,type=""):
    if request.method == 'GET':
        if type == "case":
            id = Case.objects.all().aggregate(Max('internal_number'))
            if id['internal_number'] is None:
                id = "1"
            else:
                id = str(int(id['internal_number'])+1)
            return JsonResponse(id, safe=False)
        elif type == "exhibit":
            id = Exhibits.objects.all().aggregate(Max('exhibit_number'))
            if id['exhibit_number'] is None:
                id = "1"
            else:
                id = str(int(id['exhibit_number'])+1)
            return JsonResponse(id, safe=False)
        elif type == "sample":
            id = Samples.objects.all().aggregate(Max('sample_id'))
            if id['sample_id'] is None:
                id = "1"
            else:
                id = str(int(id['sample_id'])+1)
            return JsonResponse(id, safe=False)
        else:
            return JsonResponse("Invalid Type", safe=False)


@csrf_exempt
def sampleQuery(request):
    query_data = JSONParser().parse(request)
    samples = Samples.objects.all()
    samples.filter(exhibit_id=query_data['exhibit_id'])
    samples_serializer = SamplesSerializer(samples, many=True)
    return JsonResponse(samples_serializer.data, safe=False)

@csrf_exempt
def samplesApi(request, sample_id=""):
    if request.method == 'GET':
        samples_value = Samples.objects.all()
        samples_serializer = SamplesSerializer(samples_value, many=True)
        return JsonResponse(samples_serializer.data, safe=False)
    elif request.method == 'POST':
            samples_data = JSONParser().parse(request)
            department_serializer = SamplesSerializer(data=samples_data)
            if department_serializer.is_valid():
                department_serializer.save()
                return JsonResponse("Added Successfully!!", safe=False)
            return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Samples.objects.get(sample_id=department_data['sample_id'],exhibit_id=department_data['exhibit_id'],case_id=department_data['case_id'],transferred_to_lab=department_data['transferred_to_lab'])
        department_serializer = SamplesSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        department = Samples.objects.get(SampleName=sample_id)
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

def last_id(model):
    max_rated_entry = model.objects.latest()
    if max_rated_entry == None:
        return str(1)
    else:
        return str(max_rated_entry.details + 1)