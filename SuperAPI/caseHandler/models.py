from django.db import models


class Case(models.Model):
    reference_type = models.CharField(max_length=100)
    event_type = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    station = models.CharField(max_length=100)
    investigating_unit = models.CharField(max_length=100)
    internal_number = models.CharField(max_length=100, primary_key=True)
    internal_number_year = models.CharField(max_length=100)
    reference_number = models.CharField(max_length=100)
    event_date = models.CharField(max_length=100)
    received_date = models.CharField(max_length=100)
    sign_date = models.CharField(max_length=100)
    event_location = models.CharField(max_length=100)
    event_description = models.CharField(max_length=100)

class Exhibits(models.Model):
    exhibit_description = models.CharField(max_length=256)
    case_id = models.IntegerField()
    bag_number = models.PositiveIntegerField(primary_key=True)
    exhibits_packaging = models.CharField(max_length=256)
    exhibits_mark = models.CharField(max_length=256)

class Samples(models.model):

    SOUTH = 'S'
    TEL_AVIV = 'TLV'
    NORTH = 'N'
    MATE_ARTZI = 'MATAR'
    LABRATORIES = [
        (SOUTH, 'דרום'),
        (TEL_AVIV, 'תל אביב'),
        (NORTH, 'צפון'),
        (MATE_ARTZI, 'מטא"ר'),
    ]

    case_id = models.IntegerField(Required=True)
    exhibit_id = models.IntegerField(Required=True)
    sample_id = models.IntegerField(primary_key=True, Required=True)
    what_sampled = models.CharField(max_length=256)
    where_sampled = models.CharField(max_length=256)
    transferred_to_lab = models.CharField(max_length=5,choices=LABRATORIES,) #OPTION TO ADD "default=TLV,"
    sending_date = models.CharField(max_length=16)
    receiving_date = models.CharField(max_length=16)
    packaging = models.CharField(max_length=64)
    results = models.CharField(max_length=512)
    notes = models.CharField(max_length=512)
    date = models.CharField(max_length=16)
    unit_name = models.CharField(max_length=32) 
    reference = models.CharField(max_length=256)
    investigator_name = models.CharField(max_length=32)
    phone_num = models.CharField(max_length=32)
