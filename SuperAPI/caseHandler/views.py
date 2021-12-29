from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.response import FileResponse
from django.http.response import HttpResponse
from django.http import Http404
import os

from caseHandler.models import Cases
from caseHandler.serializers import CaseSerializer

from docsCreate.docx_generator import generate_docx
from django.core.files.storage import default_storage


# Create your views here.
@csrf_exempt
def caseApi(request, case_name=""):
    if request.method == 'GET':
        cases = Cases.objects.all()
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
        department = Cases.objects.get(DepartmentId=department_data['DepartmentId'])
        department_serializer = CaseSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        department = Cases.objects.get(CaseName=case_name)
        department.delete()
        return JsonResponse("Deleted Succeffully!!", safe=False)


@csrf_exempt
def downloadFile(request):
    file_derectory = os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'docsCreate','\\'))  #get relative directory location and go into file storage directory
    if request.method == 'GET':
        img_data = JSONParser().parse(request)
        file = generate_docx(img_data, img_data['filename'])  # create file
        resp = FileResponse(file, as_attachment=True, filename=img_data['filename'] + '.docx')  # create return file
        return resp

    return Http404("Not Get Request")
