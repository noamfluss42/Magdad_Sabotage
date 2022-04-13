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
        exhibits_serializer = ExhibitsSerializer(exhibit, many=True)
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
        exhibit = Exhibits.objects.get(exhibit_number=exhibit_data['exhibit_number'])
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
def downloadFile(request):
    if request.method == 'GET':
        docx_data = request.GET.dict()
        file = generate_docx(docx_data)  # create file binary stream
        resp = FileResponse(file, as_attachment=True, filename='temp.docx')  # create return resp with file
        return resp
    return Http404("Not Get Request")