from django.db import models
from django.contrib.gis.db import models

# Create your models here.

class Escolaspublicas(models.Model):
    id = models.AutoField(primary_key=True)
    geom = models.PointField(srid=31983, blank=True, null=True)
    cod_entidade = models.BigIntegerField(blank=True, null=True)
    nome_escola = models.CharField(max_length=254, blank=True, null=True)
    cod_ra = models.IntegerField(blank=True, null=True)
    cod_dre = models.IntegerField(blank=True, null=True)
    endereco = models.CharField(max_length=254, blank=True, null=True)
    cep = models.CharField(max_length=10, blank=True, null=True)
    telefone = models.CharField(max_length=13, blank=True, null=True)
    email = models.CharField(max_length=254, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_point_escola_publica"'

class Regiaoadministrativa(models.Model):
    id = models.AutoField(primary_key=True)
    geom = models.MultiPolygonField(srid=31983, blank=True, null=True)
    ra_cira = models.IntegerField(blank=True, null=True)
    ra_nome = models.CharField(max_length=50,blank=True, null=True)
    ra_codigo = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_polygon_regioes_administrativas"'

class Loteexistente(models.Model):
    id = models.AutoField(primary_key=True)
    geom = models.MultiPolygonField(srid=31983, blank=True, null=True)
    ct_ciu = models.CharField(max_length=12, blank=True, null=True)
    lt_enderec = models.CharField(max_length=115, blank=True, null=True)
    lt_cep = models.CharField(max_length=8, blank=True, null=True)
    lt_setor = models.CharField(max_length=70, blank=True, null=True)
    lt_quadra = models.CharField(max_length=50, blank=True, null=True)
    lt_conjunt = models.CharField(max_length=35, blank=True, null=True)
    lt_nome = models.CharField(max_length=80, blank=True, null=True)
    lt_ra = models.IntegerField(blank=True, null=True)
    ac_area_ct = models.FloatField(blank=True, null=True)
    ct_origem = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_polygon_lote_existente"'