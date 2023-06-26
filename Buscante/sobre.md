Ela consiste em dividir o conteúdo entre componentes de apresentação (mais simples, que não possuem comportamento) e componentes contêiner ou inteligentes (que detêm informações e as enviam para outros componentes). Em inglês, chamamos ambos os tipos de dumb components e smart components, respectivamente.

--o abre o navegador

A programação reativa pode ser considerada um paradigma de programação ou modelo de arquitetura que se refere basicamente à manipulação de um fluxo de dados (streams) ou eventos de forma assíncrona.

RxJS - https://rxjs-dev.firebaseapp.com/


Observable - coleçaõde valore ou evenotos fuutos 

observer - ouvir os valore entregues pelo Observable

subiscribe faz com que o observer se incerve ao observable paar ele passar os dados para ele

mais de uma instrução par ao subcribe

metodos dentro do subscribe 
Next - pode ser emitido varias vezes
error - opcional - se der erro - uma vez
complete - opcional - Quando termina - uma vez
O padrão observer é a base da programação orientada a eventos ou pub/sub publication / subscription

desinscrever de um Observable - Unsubscribe

Boa pratica após realizar um subscribe realizar um Unsubscribe par anão ocupar memoria 

Interfazes podem ser varias ou todas em um arquivo

operadores do RxJS 

Pipe- Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.

Tap - Operador de serviços públicos. Usado para debugging. Não modifica o observable.

Map - Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.


Transformando dados com pipe no HTML

Documentação tem uns propontos

para fazer transformações de dados, data, numero de letras e afins

criando um pipe - ng g pipe 

Quantos pipes eu quiser

Vai ir para o app.module

DatePipe: formata um valor de data de acordo com as regras de localidade.
UpperCasePipe: transforma o texto em letras maiúsculas.
LowerCasePipe: transforma o texto em letras minúsculas.
CurrencyPipe: transforma um número em uma string de moeda, formatada de acordo com as regras de localidade.
DecimalPipe: transforma um número em uma string com um ponto decimal, formatado de acordo com as regras de localidade.
PercentPipe: transforma um número em uma string de porcentagem, formatada de acordo com as regras de localidade.

Typeahead - completa oq eu to escrevendo

keyup - conforme eu escrevo vai apecendo as informações

async - angular se inscreve nessa observable e passa esse conteudo para uma variavel local e ele já faz o unsubscrive aytomaticamente


Filter - passa uma condição e se ela for vdd o fluco segue 

debonceTime - timer para nets da requisição

distinctUntilChanged - não permite que seja faita mais de uma fez a mesma requisiçaõ em senquiencia

Ex
  pesquisado mar, mas o usuario apagou e escrevu de novo. Em vez de gerar uama nova requisição ao servidro ele mantem as informações da requisição ja feita

---------------------------------------------------------------

witchMap - Operador de Transformação. Cancela requisições de observables anteriores, emitindo valores apenas do Observable projetado mais recentemente.

filter - Operador de filtragem. Filtra os itens emitidos pelo Observable de origem, permitindo apenas aqueles que satisfaçam uma condição especificada.

debounceTime - Operador de filtragem. Retorna um Observable que atrasa as emissões do Observable de origem pelo tempo especificado.

distinctUntilChanged - Operador de filtragem. Retorna um Observable que emite todos os valores enviados pelo observable de origem se forem distintos em comparação com o último valor emitido pelo observable de resultado.

catchError - Operador de Tratamento de Erros. Captura erros no observable manipulado retornando um novo observable ou lançando um erro.

throwError - Operador de Criação. Cria um observable que criará uma instância de erro e a enviará ao consumidor como um erro imediatamente após a assinatura.

EMPTY - Operador de Criação. Cria um Observable simples que não emite itens para o Observer e imediatamente emite uma notificação de complete.

of - Operador de Criação. Converte os argumentos em observable. Um Observable que emite os argumentos descritos e depois conclui.

livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    tap(() => {
      console.log('Fluxo inicial de dados');
    }),
    filter(
      (valorDigitado) => valorDigitado.length >= 3
    ),
    switchMap(
      (valorDigitado) => this.service.buscar(valorDigitado)
    ),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    tap(console.log),
    map(items => this.listaLivros =   this.livrosResultadoParaLivros(items)),
    catchError(erro =>
      { console.log(erro);
        return throwError(() =>
        new Error(this.mensagemErro = `Ops, ocorreu um erro! Recarregue a aplicação!`));
      })
  );

  <div 
class="resultados" 
*ngIf="livrosEncontrados$ | async ">
            {{ livrosResultado.totalItems}} resultados encontrados
</div>


import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado )
    return this.http.get<LivrosResultado>(this.API, { params })
  }
}
