from django.db import models
class Case(models.Model):
     referenceType = models.CharField(max_length=100)
     eventType= models.CharField(max_length=100)
     district = models.CharField(max_length=100)
     area = models.CharField(max_length=100)
     station = models.CharField(max_length=100)
     InvestigatingUnit = models.CharField(max_length=100)
     internalNumber = models.CharField(max_length=100,primary_key=True)
     internalNumberyear = models.CharField(max_length=100)
     referenceNumber = models.CharField(max_length=100)
     eventDate = models.CharField(max_length=100)
     ReceivedDate = models.CharField(max_length=100)
     signDate = models.CharField(max_length=100)
     eventLocation = models.CharField(max_length=100)
     eventDescription = models.CharField(max_length=100)


