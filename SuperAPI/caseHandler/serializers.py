from rest_framework import serializers
from caseHandler.models import Cases
from caseHandler.models import Exhibits


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = ('CaseName',
                  'CaseId')


class ExhibitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibits
        fields = ('exhibit_description', 'bag_number', 'exhibits_packaging', 'exhibits_mark', 'case_id')
