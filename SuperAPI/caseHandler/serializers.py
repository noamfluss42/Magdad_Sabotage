from rest_framework import serializers
from caseHandler.models import Case
from caseHandler.models import Exhibits

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ( "reference_type",
                   "event_type",
                   "district",
                   "area",
                   "station",
                   "investigating_unit",
                   "internal_number",
                   "internal_number_year",
                   "reference_number",
                   "event_date",
                   "received_date",
                   "sign_date",
                   "event_location",
                   "event_description")
class ExhibitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibits
        fields = ('exhibit_description', 'bag_number', 'exhibits_packaging', 'exhibits_mark', 'case_id')

class SamplesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samples
        fields = ('case_id',
        'exhibit_id',
        'sample_id',
        'what_sampled',
        'where_sampled',
        'transferred_to_lab',
        'sending_date',
        'receiving_date',
        'packaging',
        'results',
        'notes',
        'date',
        'unit_name', 
        'reference',
        'investigator_name',
        'phone_num',)