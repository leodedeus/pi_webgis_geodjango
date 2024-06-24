# Generated by Django 4.2.13 on 2024-06-17 00:44

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pi_webgis', '0005_hidrografia_lagoslagoas_sistemaferroviario_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SolicitacaoPopulacao',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('geom', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=31983)),
                ('nomeSolicitante', models.CharField(max_length=200)),
                ('emailSolicitante', models.CharField(max_length=100)),
                ('foneSolicitante', models.CharField(max_length=11)),
            ],
            options={
                'db_table': '"camadas"."feature_point_solicitacao_populacao"',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TipoSolicitacao',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('numSolicitacao', models.IntegerField()),
                ('tipoSolicitacao', models.CharField(max_length=100)),
            ],
            options={
                'db_table': '"dominios"."dom_tipo_solicitacao"',
                'managed': False,
            },
        ),
    ]
