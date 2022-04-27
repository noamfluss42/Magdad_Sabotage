from rest_framework import serializers
from caseHandler.models import Case
from caseHandler.models import Exhibits
from caseHandler.models import ExhibitsI
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
