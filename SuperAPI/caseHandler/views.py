from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.response import FileResponse
from django.http.response import HttpResponse
from django.http import Http404
import os

from caseHandler.models import Case
from caseHandler.serializers import CaseSerializer

from caseHandler.models import Exhibits
from caseHandler.serializers import ExhibitsSerializer

from docsCreate.docx_generator import generate_docx
from django.core.files.storage import default_storage


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
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Case.objects.get(internalNumber=department_data['internalNumber'])
        department_serializer = CaseSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        department = Case.objects.get(internalNumber=case_name)
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
        department_serializer = ExhibitsSerializer(data=exhibits_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Exhibits.objects.get(DepartmentId=department_data['DepartmentId'])
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
        file = generate_docx(docx_data, 'temp.docx')  # create file binary stream
        print('into the unkown')
        resp = FileResponse(file, as_attachment=True, filename='temp.docx')  # create return resp with file
        return resp
    return Http404("Not Get Request")
@csrf_exempt
def downloadFileParam(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            exhibit = Exhibits.objects.get(bag_number=data['bagNumber'])
            exhibit_data = ExhibitsSerializer(exhibit).data
            print("exhibit data :",exhibit_data)
            data["exhibitDescription"] = exhibit_data['exhibit_description']
            data["exhibitsPackaging"] = exhibit_data['exhibits_packaging']
            data["exhibitsMark"] = exhibit_data['exhibits_mark']
            data["bagNumber"] = exhibit_data['bag_number']

            case_fields = ["eventDescription","referenceNumber"]
            case = Case.objects.get(internalNumber=exhibit_data['case_id'])
            case_data = CaseSerializer(case).data
            case_data = {key: case_data[key] for key in case_fields}#get only essential fields
            print("case data :", dict(case_data))
            data.update(case_data)
            print("Data",data)
        except Exception as e:
            print("ERROR",e)
            return JsonResponse("case id not found", safe=False)
        print("DATAAAAAAA\n",data)
        for key in data:
            data[key] = str(data[key])
        file = generate_docx(data, str(exhibit_data['case_id'])+'-'+data['bagNumber'])  # create file binary stream
        resp = FileResponse(file, as_attachment=True, filename= str(exhibit_data['case_id'])+'-'+data['bagNumber'] + '.docx')  # create return resp with file
        return resp
    return JsonResponse("Not POST Request", safe=False)

# { this function takes a json with these parameters
#   "labName": "",
#   "dateCreated": "",
#   "phoneNumber": "",
# 	"recipient": "",
#   "urgency": "",
#  	"hazards": ,
#   "exhibits": "",
#   "unit": "",
#   "referenceType": "",
# 	"bagNumber": "",
# 	"testingEssense": "",
#   "notes": "",
#   "senderName": "",
#   "senderRank": "",
#   "senderSerialNumber": "" ,
# 	"internalNumber": ""
#     }