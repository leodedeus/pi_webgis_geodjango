# Importe os modelos necessários
from .models import Escolaspublicas

def main():
    # Recuperar todas as escolas
    escolas = Escolaspublicas.objects.all()

    # Iterar sobre as escolas e imprimir seus nomes
    for escola in escolas:
        print(escola.nome_escola)

if __name__ == "__main__":
    main()
