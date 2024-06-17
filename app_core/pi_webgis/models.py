from django.db import models
from django.contrib.gis.db import models

# Create your models here.

class Escolaspublicas(models.Model):
    #id = models.AutoField(primary_key=True)
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
    #id = models.AutoField(primary_key=True)
    geom = models.MultiPolygonField(srid=31983, blank=True, null=True)
    ra_cira = models.IntegerField(blank=True, null=True)
    ra_nome = models.CharField(max_length=50,blank=True, null=True)
    ra_codigo = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_polygon_regioes_administrativas"'

class Loteexistente(models.Model):
    #id = models.AutoField(primary_key=True)
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

class Hidrografia(models.Model):
    geom = models.MultiLineStringField(srid=31983, blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_line_hidrografia"'

class Lagoslagoas(models.Model):
    geom = models.MultiPolygonField(srid=31983, blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_polygon_lagos_lagoas"'

class Sistemaviario(models.Model):
    geom = models.MultiLineStringField(srid=31983, blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    ref = models.CharField(max_length=20, blank=True, null=True)
    oneway = models.CharField(max_length=1, blank=True, null=True)
    maxspeed = models.IntegerField(blank=True, null=True)
    layer = models.BigIntegerField(blank=True, null=True)
    bridge = models.CharField(max_length=1, blank=True, null=True)
    tunnel = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_line_sistema_viario"'

class Sistemaferroviario(models.Model):
    geom = models.MultiLineStringField(srid=31983, blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    layer = models.BigIntegerField(blank=True, null=True)
    bridge = models.CharField(max_length=1, blank=True, null=True)
    tunnel = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_line_sistema_ferroviario"'

class TipoSolicitacao(models.Model):
    #id = models.AutoField(primary_key=True)
    numsolicitacao = models.IntegerField()
    tiposolicitacao = models.CharField(max_length=100)

    class Meta:
        managed = False # True para que o django gerencie esta tabela, ou seja, o django crie esta tabela
        db_table = '"dominios"."dom_tipo_solicitacao"'

    def __str__(self):
        return self.tiposolicitacao

class SolicitacaoPopulacao(models.Model):
    #id = models.AutoField(primary_key=True)
    geom = models.PointField(srid=31983, blank=True, null=True)
    tiposolicitacao = models.ForeignKey(TipoSolicitacao, on_delete=models.PROTECT, related_name="tipo_solicitacao",  db_column='tiposolicitacao')
    nomesolicitante = models.CharField(max_length=200)
    emailsolicitante = models.CharField(max_length=100)
    fonesolicitante = models.CharField(max_length=11)

    class Meta:
        managed = False
        db_table = '"camadas"."feature_point_solicitacao_populacao"'
