from django import forms
from pi_webgis.models import TipoSolicitacao, SolicitacaoPopulacao

'''
class SolicitacaoPopulacaoForm(forms.Form):
    tipoSolicitacao = forms.ModelChoiceField(TipoSolicitacao.objects.all())
    nomeSolicitante = forms.CharField(max_length=200)
    emailSolicitante = forms.CharField(max_length=100)
    foneSolicitante = forms.CharField(max_length=11)
'''
class SolicitacaoPopulacaoForm(forms.ModelForm):
    class Meta:
        model = SolicitacaoPopulacao
        fields = ['tiposolicitacao', 'nomesolicitante', 'emailsolicitante', 'fonesolicitante']