from rest_framework import serializers
from caseHandler.models import Case

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
