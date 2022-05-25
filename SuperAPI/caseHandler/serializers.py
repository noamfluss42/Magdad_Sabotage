from rest_framework import serializers
from caseHandler.models import Samples
from caseHandler.models import Case
from caseHandler.models import CaseI
from caseHandler.models import Exhibits
from caseHandler.models import ExhibitsI


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = (
            "internal_number",
            "received_or_go",
            "lab_name",
            "event_characteristic",
            "event_date",
            "received_date",
            "event_type",
            "pele_number",
            "district",
            "investigating_unit",
            "explosion_or_disarm",
            "reference_number",
            "status",
            "sender_name",
            "event_location",
            "event_description",
            "weapon_name",
            "explosive_device_material",
            "explosive_device_means",
            "weapon_options",
            "explosive_device_operating_system",
            "weapon_mark",
            "explosive_device_spray",
            "weapon_color",
            "explosive_device_camouflage",
            "weapon_additional_characteristics")


class CaseSerializerI(serializers.ModelSerializer):
    class Meta:
        model = CaseI
        fields = ("internal_number",
                  "received_or_go",
                  "lab_name",
                  "event_characteristic",
                  "event_date",
                  "received_date",
                  "event_type",
                  "pele_number",
                  "district",
                  "investigating_unit",
                  "explosion_or_disarm",
                  "reference_number",
                  "status",
                  "sender_name",
                  "event_location",
                  "event_description",
                  "weapon_name",
                  "explosive_device_material",
                  "explosive_device_means",
                  "weapon_options",
                  "explosive_device_operating_system",
                  "weapon_mark",
                  "explosive_device_spray",
                  "weapon_color",
                  "explosive_device_camouflage",
                  "weapon_additional_characteristics",
                  "index")


class ExhibitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibits
        fields = (
            "internal_number",
            "exhibit_number",
            "location",
            "description",
            "amount",
            "destination",
            "explosive",
            "explosive_weight",
            "tnt_equivalent",
            "received_date",
            "handle_date",
            "investigator_name",
            "lab_name",
            "result"
        )


class ExhibitsSerializerI(serializers.ModelSerializer):
    class Meta:
        model = ExhibitsI
        fields = (
            "internal_number",
            "exhibit_number",
            "location",
            "description",
            "amount",
            "destination",
            "explosive",
            "explosive_weight",
            "tnt_equivalent",
            "received_date",
            "handle_date",
            "investigator_name",
            "lab_name",
            "result",
            "index"
        )
        
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
        'phone_num',
        'bag_num',)
