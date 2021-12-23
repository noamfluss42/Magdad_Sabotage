from django.db import models
class Cases(models.Model):
    CaseName = models.CharField(max_length=100)
    CaseId= models.IntegerField(primary_key=True)

