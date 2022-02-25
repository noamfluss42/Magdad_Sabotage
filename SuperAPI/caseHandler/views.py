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


'''
    Returns JSON respone for case request query 

            Parameters:
                    request (HTTPRequest): User request
                    case_name (String): danme of case for DELETE function

            Returns:
                    response (JsonResponse): requested data in Json Packet format
    '''
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

'''
    Returns JSON respone for exhibit request query 

            Parameters:
                    request (HTTPRequest): User request
                    bag_number (String): danme of case for DELETE function

            Returns:
                    response (JsonResponse): requested data in Json Packet format
    '''
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

'''
    Returns File respone for file query

            Parameters:
                    request (HTTPRequest): User request

            Returns:
                    response (JsonResponse): requested data in Json Packet format
    '''
@csrf_exempt
def downloadFile(request):
    if request.method == 'GET':
        docx_data = request.GET.dict()
        file = generate_docx(docx_data, 'temp.docx')  # create file binary stream
        resp = FileResponse(file, as_attachment=True, filename='temp.docx')  # create return resp with file
        return resp
    return Http404("Not Get Request")
