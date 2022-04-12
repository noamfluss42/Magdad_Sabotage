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
    internal_number = models.CharField(max_length=32)
    exhibit_number = models.CharField(max_length=32)
    location = models.CharField(max_length=128)
    description = models.CharField(max_length=256)
    amount = models.CharField(max_length=32)
    destination = models.CharField(max_length=128)
    explosive = models.CharField(max_length=32)
    explosive_weight = models.CharField(max_length=32)
    tnt_equivalent = models.CharField(max_length=32)
    received_date = models.CharField(max_length=32)
    handle_date = models.CharField(max_length=32)
    investigator_name = models.CharField(max_length=128)
    lab_name = models.CharField(max_length=128)
    result = models.CharField(max_length=128)