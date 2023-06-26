import { Item, livrosResultado } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes?'

  constructor(private http: HttpClient) { }


  buscar(valorDigitado: string): Observable<livrosResultado>{
    const params = new HttpParams().append('q',valorDigitado)
    return this.http.get<livrosResultado>(this.API, { params })

    //.pipe(
      //tap(retornoAPI => console.log('Fluxo do tap',retornoAPI)),

      //

      // se não tiver corespondencia ele retorna vaziu
      //tap(resultado => console.log("Fluxo pós o map", esultado))    )

  }

  // isso não garente que a API vai retornar os dados da forma como eu preciso

  /*
    manipular fluxo de manupilações com os operadores
  pipe- agrupar outros operadores
  tap - forma de debug e não vai mudar o fluco do observable

  map - Aplicatr uma tranformação em RxJS existe o operador map(). Após o fechamento de tap()

  */
}
