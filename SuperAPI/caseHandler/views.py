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