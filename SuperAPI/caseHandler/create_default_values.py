from caseHandler.serializers import *


def create_default_values(data_dict,serializer):
    for field in serializer.Meta.fields:
        if field not in data_dict.keys() or data_dict[field] == "":
            data_dict[field] = "default"