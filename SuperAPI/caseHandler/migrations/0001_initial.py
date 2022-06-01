# Generated by Django 3.2 on 2022-05-30 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Case',
            fields=[
                ('internal_number', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('received_or_go', models.CharField(max_length=100)),
                ('lab_name', models.CharField(max_length=256)),
                ('event_characteristic', models.CharField(max_length=100)),
                ('event_date', models.CharField(max_length=100)),
                ('received_date', models.CharField(max_length=100)),
                ('event_type', models.CharField(max_length=100)),
                ('pele_number', models.CharField(max_length=100)),
                ('district', models.CharField(max_length=100)),
                ('investigating_unit', models.CharField(max_length=100)),
                ('explosion_or_disarm', models.CharField(max_length=100)),
                ('reference_number', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
                ('event_location', models.CharField(max_length=100)),
                ('event_description', models.CharField(max_length=256)),
                ('sender_name', models.CharField(max_length=50)),
                ('weapon_name', models.CharField(max_length=256)),
                ('explosive_device_material', models.CharField(max_length=256)),
                ('explosive_device_means', models.CharField(max_length=256)),
                ('weapon_options', models.CharField(max_length=256)),
                ('explosive_device_operating_system', models.CharField(max_length=256)),
                ('weapon_mark', models.CharField(max_length=256)),
                ('explosive_device_spray', models.CharField(max_length=256)),
                ('weapon_color', models.CharField(max_length=256)),
                ('explosive_device_camouflage', models.CharField(max_length=256)),
                ('weapon_additional_characteristics', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='CaseI',
            fields=[
                ('internal_number', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('received_or_go', models.CharField(max_length=100)),
                ('lab_name', models.CharField(max_length=256)),
                ('event_characteristic', models.CharField(max_length=100)),
                ('event_date', models.CharField(max_length=100)),
                ('received_date', models.CharField(max_length=100)),
                ('event_type', models.CharField(max_length=100)),
                ('pele_number', models.CharField(max_length=100)),
                ('district', models.CharField(max_length=100)),
                ('investigating_unit', models.CharField(max_length=100)),
                ('explosion_or_disarm', models.CharField(max_length=100)),
                ('reference_number', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
                ('event_location', models.CharField(max_length=100)),
                ('event_description', models.CharField(max_length=256)),
                ('sender_name', models.CharField(max_length=50)),
                ('weapon_name', models.CharField(max_length=256)),
                ('explosive_device_material', models.CharField(max_length=256)),
                ('explosive_device_means', models.CharField(max_length=256)),
                ('weapon_options', models.CharField(max_length=256)),
                ('explosive_device_operating_system', models.CharField(max_length=256)),
                ('weapon_mark', models.CharField(max_length=256)),
                ('explosive_device_spray', models.CharField(max_length=256)),
                ('weapon_color', models.CharField(max_length=256)),
                ('explosive_device_camouflage', models.CharField(max_length=256)),
                ('weapon_additional_characteristics', models.CharField(max_length=256)),
                ('index', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Samples',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('case_id', models.CharField(max_length=32)),
                ('exhibit_id', models.CharField(max_length=32)),
                ('sample_id', models.CharField(max_length=32)),
                ('what_sampled', models.CharField(max_length=256)),
                ('where_sampled', models.CharField(max_length=256)),
                ('transferred_to_lab', models.CharField(max_length=256)),
                ('sending_date', models.CharField(max_length=100)),
                ('receiving_date', models.CharField(max_length=100)),
                ('packaging', models.CharField(max_length=256)),
                ('results', models.CharField(max_length=256)),
                ('notes', models.CharField(max_length=256)),
                ('date', models.CharField(max_length=100)),
                ('unit_name', models.CharField(max_length=256)),
                ('reference', models.CharField(max_length=256)),
                ('investigator_name', models.CharField(max_length=256)),
                ('phone_num', models.CharField(max_length=256)),
                ('bag_num', models.CharField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='ExhibitsI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('internal_number', models.CharField(max_length=32)),
                ('exhibit_number', models.CharField(max_length=32)),
                ('location', models.CharField(max_length=128)),
                ('description', models.CharField(max_length=256)),
                ('amount', models.CharField(max_length=128)),
                ('destination', models.CharField(max_length=128)),
                ('explosive', models.CharField(max_length=128)),
                ('explosive_weight', models.CharField(max_length=128)),
                ('tnt_equivalent', models.CharField(max_length=128)),
                ('received_date', models.CharField(max_length=128)),
                ('handle_date', models.CharField(max_length=128)),
                ('investigator_name', models.CharField(max_length=128)),
                ('lab_name', models.CharField(max_length=128)),
                ('result', models.CharField(max_length=128)),
                ('index', models.IntegerField()),
            ],
            options={
                'unique_together': {('internal_number', 'exhibit_number')},
            },
        ),
        migrations.CreateModel(
            name='Exhibits',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('internal_number', models.CharField(max_length=32)),
                ('exhibit_number', models.CharField(max_length=32)),
                ('location', models.CharField(max_length=128)),
                ('description', models.CharField(max_length=256)),
                ('amount', models.CharField(max_length=128)),
                ('destination', models.CharField(max_length=128)),
                ('explosive', models.CharField(max_length=128)),
                ('explosive_weight', models.CharField(max_length=128)),
                ('tnt_equivalent', models.CharField(max_length=128)),
                ('received_date', models.CharField(max_length=128)),
                ('handle_date', models.CharField(max_length=128)),
                ('investigator_name', models.CharField(max_length=128)),
                ('lab_name', models.CharField(max_length=128)),
                ('result', models.CharField(max_length=128)),
            ],
            options={
                'unique_together': {('internal_number', 'exhibit_number')},
            },
        ),
    ]
