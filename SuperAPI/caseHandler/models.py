from django.db import models


class Cases(models.Model):
    CaseName = models.CharField(max_length=100)
    CaseId = models.IntegerField(primary_key=True)


class Exhibits(models.Model):
    exhibit_description = models.CharField(max_length=256)
    case_id = models.IntegerField(primary_key=True)
    bag_number = models.PositiveIntegerField()
    exhibits_packaging = models.CharField(max_length=256)
    exhibits_mark = models.CharField(max_length=256)
