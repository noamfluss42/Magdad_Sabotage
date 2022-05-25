from django.db import models


class Case(models.Model):
    # class Meta:
        # get_latest_by = 'internal_number'
    internal_number = models.CharField(max_length=100, primary_key=True)
    received_or_go = models.CharField(max_length=100)
    lab_name = models.CharField(max_length=256)
    event_characteristic = models.CharField(max_length=100)
    event_date = models.CharField(max_length=100)
    received_date = models.CharField(max_length=100)
    event_type = models.CharField(max_length=100)
    pele_number = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    investigating_unit = models.CharField(max_length=100)
    explosion_or_disarm = models.CharField(max_length=100)
    reference_number = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    event_location = models.CharField(max_length=100)
    event_description = models.CharField(max_length=256)
    sender_name = models.CharField(max_length=50)

    weapon_name = models.CharField(max_length=256)
    explosive_device_material = models.CharField(max_length=256)
    explosive_device_means = models.CharField(max_length=256)
    weapon_options = models.CharField(max_length=256)
    explosive_device_operating_system = models.CharField(max_length=256)
    weapon_mark = models.CharField(max_length=256)
    explosive_device_spray = models.CharField(max_length=256)
    weapon_color = models.CharField(max_length=256)
    explosive_device_camouflage = models.CharField(max_length=256)
    weapon_additional_characteristics = models.CharField(max_length=256)


class CaseI(models.Model):
    internal_number = models.CharField(max_length=100, primary_key=True)
    received_or_go = models.CharField(max_length=100)
    lab_name = models.CharField(max_length=256)
    event_characteristic = models.CharField(max_length=100)
    event_date = models.CharField(max_length=100)
    received_date = models.CharField(max_length=100)
    event_type = models.CharField(max_length=100)
    pele_number = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    investigating_unit = models.CharField(max_length=100)
    explosion_or_disarm = models.CharField(max_length=100)
    reference_number = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    event_location = models.CharField(max_length=100)
    event_description = models.CharField(max_length=256)
    sender_name = models.CharField(max_length=50)

    weapon_name = models.CharField(max_length=256)
    explosive_device_material = models.CharField(max_length=256)
    explosive_device_means = models.CharField(max_length=256)
    weapon_options = models.CharField(max_length=256)
    explosive_device_operating_system = models.CharField(max_length=256)
    weapon_mark = models.CharField(max_length=256)
    explosive_device_spray = models.CharField(max_length=256)
    weapon_color = models.CharField(max_length=256)
    explosive_device_camouflage = models.CharField(max_length=256)
    weapon_additional_characteristics = models.CharField(max_length=256)
    index = models.IntegerField()


class Exhibits(models.Model):
    class Meta:
        unique_together = (('internal_number', 'exhibit_number'),)
        # get_latest_by = 'exhibit_number'
    internal_number = models.CharField(max_length=32)
    exhibit_number = models.CharField(max_length=32)
    location = models.CharField(max_length=128)
    description = models.CharField(max_length=256)
    amount = models.CharField(max_length=128)
    destination = models.CharField(max_length=128)
    explosive = models.CharField(max_length=128)
    explosive_weight = models.CharField(max_length=128)
    tnt_equivalent = models.CharField(max_length=128)
    received_date = models.CharField(max_length=128)
    handle_date = models.CharField(max_length=128)
    investigator_name = models.CharField(max_length=128)
    lab_name = models.CharField(max_length=128)
    result = models.CharField(max_length=128)

class Samples(models.Model):

    # SOUTH = 'S'
    # TEL_AVIV = 'TLV'
    # NORTH = 'N'
    # MATE_ARTZI = 'MATAR'
    # LABRATORIES = [
    #     (SOUTH, 'דרום'),
    #     (TEL_AVIV, 'תל אביב'),
    #     (NORTH, 'צפון'),
    #     (MATE_ARTZI, 'מטא"ר'),
    # ]

    case_id = models.CharField(max_length=32)
    exhibit_id = models.CharField(max_length=32)
    sample_id = models.CharField(max_length=32)
    what_sampled = models.CharField(max_length=256)
    where_sampled = models.CharField(max_length=256)
    transferred_to_lab = models.CharField(max_length=256) #OPTION TO ADD "default=TLV,"
    sending_date = models.CharField(max_length=100)
    receiving_date = models.CharField(max_length=100)
    packaging = models.CharField(max_length=256)
    results = models.CharField(max_length=256)
    notes = models.CharField(max_length=256)
    date = models.CharField(max_length=100)
    unit_name = models.CharField(max_length=256) 
    reference = models.CharField(max_length=256)
    investigator_name = models.CharField(max_length=256)
    phone_num = models.CharField(max_length=256)
    bag_num = models.CharField(max_length=32)




class ExhibitsI(models.Model):
    class Meta:
        unique_together = (('internal_number', 'exhibit_number'),)
    internal_number = models.CharField(max_length=32)
    exhibit_number = models.CharField(max_length=32)
    location = models.CharField(max_length=128)
    description = models.CharField(max_length=256)
    amount = models.CharField(max_length=128)
    destination = models.CharField(max_length=128)
    explosive = models.CharField(max_length=128)
    explosive_weight = models.CharField(max_length=128)
    tnt_equivalent = models.CharField(max_length=128)
    received_date = models.CharField(max_length=128)
    handle_date = models.CharField(max_length=128)
    investigator_name = models.CharField(max_length=128)
    lab_name = models.CharField(max_length=128)
    result = models.CharField(max_length=128)
    index = models.IntegerField()

