from django import forms
from pi_webgis.models import TipoSolicitacao

class SolicitacaoPopulacaoForm(forms.Form):
    tipoSolicitacao = forms.ModelChoiceField(TipoSolicitacao.objects.all())
    nomeSolicitante = forms.CharField(max_length=200)
    emailSolicitante = forms.CharField(max_length=100)
    foneSolicitante = forms.CharField(max_length=11)