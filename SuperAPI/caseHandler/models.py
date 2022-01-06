from django.db import models


class Case(models.Model):
    referenceType = models.CharField(max_length=100)
    eventType = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    station = models.CharField(max_length=100)
    InvestigatingUnit = models.CharField(max_length=100)
    internalNumber = models.CharField(max_length=100, primary_key=True)
    internalNumberyear = models.CharField(max_length=100)
    referenceNumber = models.CharField(max_length=100)
    eventDate = models.CharField(max_length=100)
    ReceivedDate = models.CharField(max_length=100)
    signDate = models.CharField(max_length=100)
    eventLocation = models.CharField(max_length=100)
    eventDescription = models.CharField(max_length=100)

class Exhibits(models.Model):
    exhibit_description = models.CharField(max_length=256)
    case_id = models.IntegerField()
    bag_number = models.PositiveIntegerField(primary_key=True)
    exhibits_packaging = models.CharField(max_length=256)
    exhibits_mark = models.CharField(max_length=256)