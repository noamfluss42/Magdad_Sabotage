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
