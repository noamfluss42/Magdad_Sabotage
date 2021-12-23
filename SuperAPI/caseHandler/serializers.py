from rest_framework import serializers
from caseHandler.models import Cases

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = ('CaseName',
                  'CaseId')