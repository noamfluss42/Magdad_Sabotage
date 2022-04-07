from rest_framework import serializers
from caseHandler.models import Case
from caseHandler.models import Exhibits


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ("reference_type",
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


class ExhibitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibits
        fields = ('exhibit_description', 'bag_number',
                  'exhibits_packaging', 'exhibits_mark', 'case_id')
