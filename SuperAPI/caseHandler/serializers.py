from rest_framework import serializers
from caseHandler.models import Case
from caseHandler.models import Exhibits

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ( "referenceType",
                   "eventType",
                   "district",
                   "area",
                   "station",
                   "InvestigatingUnit",
                   "internalNumber",
                   "internalNumberyear",
                   "referenceNumber",
                   "eventDate",
                   "ReceivedDate",
                   "signDate",
                   "eventLocation",
                   "eventDescription")
class ExhibitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibits
        fields = ('exhibit_description', 'bag_number', 'exhibits_packaging', 'exhibits_mark', 'case_id')
