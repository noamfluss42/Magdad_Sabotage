from caseHandler.serializers import *
from datetime import date
DEFAULT_VALUE = "default"

def create_default_values(data_dict, serializer, default_value=DEFAULT_VALUE):
    for field in serializer.Meta.fields:
        if field not in data_dict.keys():
            data_dict[field] = default_value
        elif data_dict[field] == "":
            data_dict[field] = default_value
        elif field == "pele_number" and data_dict[field] == "." + str(date.today().year):
            data_dict[field] = default_value
