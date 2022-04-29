from rest_framework import serializers
from caseHandler.models import Case
from caseHandler.models import CaseI
from caseHandler.models import Exhibits


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ("event_type",
                  "district",
                  "investigating_unit",
                  "internal_number",
                  "reference_number",
                  "event_date",
                  "received_date",
                  "event_location",
                  "event_description",
                  "sender_name",
                  "received_or_go",
                  "event_characteristic",
                  "pele_number",
                  "explosion_or_disarm",
                  "lab_name",
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
        fields = ("event_type",
                  "district",
                  "investigating_unit",
                  "internal_number",
                  "reference_number",
                  "event_date",
                  "received_date",
                  "event_location",
                  "event_description",
                  "sender_name",
                  "received_or_go",
                  "event_characteristic",
                  "pele_number",
                  "explosion_or_disarm",
                  "lab_name",
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
        fields = ('exhibit_description', 'bag_number',
                  'exhibits_packaging', 'exhibits_mark', 'case_id')
