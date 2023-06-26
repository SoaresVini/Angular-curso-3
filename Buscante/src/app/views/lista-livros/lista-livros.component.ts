import { FormControl } from '@angular/forms';
import { Livro, Item, livrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { EMPTY, catchError, debounce, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError,of } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const pausa = 300

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  //listaLivros: Livro[];
  campoBusca = new FormControl()
  mensagemErro = ''
  livrosResultado: livrosResultado

  //subcription: Subscription

  constructor(private service: LivroService) { }

  totalDeLivros$ = this.campoBusca.valueChanges
    .pipe(
        debounceTime(pausa),
        filter((valorDigitado) => valorDigitado.length >= 3),
        tap(() => console.log('Fluxo inicial')),
        switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
        map(resultado =>
          this.livrosResultado = resultado
        ),

        catchError(erro => {
            console.log(erro)
            return of()
        })
    )

  //Observable passar um $ no final
  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(pausa),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    map(resultado => resultado.items ?? []),
    map((items) => this.resultLivros(items)),
    catchError(error => {

      return throwError((erro) => {

        /*
        this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!!'

        return EMPTY
        */

        console.log(error)

        new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!!')

      })
    })

    //transformação só que ele vai cancelar todas as outras requisições anteriores, somente a ultima vai passar
  )

  // Cada vez que ter uma mudança ele avisa valueChanges

  /*
  Antes tava assim
  buscarlivros(){
    this.subcription = this.service.buscar(this.campoBusca.).subscribe({
      next: (items) => {
        console.log('Requisições ao servidor')
        this.listaLivros = this.resultLivros(items)
      },
      error: erro => console.error(erro),
    })
  }

  um evento eu uso o subscribe, essa forma de passar vai de base na versão v8 do Rx

  buscarlivros(){
    this.service.buscar(this.campoBusca).subscribe((retornoAPI) => console.log(retornoAPI), (error) => console.log(error))
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }

  */

  resultLivros(items: Item[]): LivroVolumeInfo[] {

    return items.map(item => {
      return new LivroVolumeInfo(item)
    })

  }


}



