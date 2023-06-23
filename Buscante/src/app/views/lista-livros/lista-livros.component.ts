import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: [];
  campoBusca: string = ''
  subcription: Subscription

  constructor(private service: LivroService) { }

  buscarlivros(){
    this.subcription = this.service.buscar(this.campoBusca).subscribe({
      next: retornoApi => console.log(retornoApi),
      error: erro => console.error(erro),
      complete: () => console.log('Acabou')
    })
  }

  /* um evento eu uso o subscribe, essa forma de passar vai de base na versão v8 do Rx

  buscarlivros(){
    this.service.buscar(this.campoBusca).subscribe((retornoAPI) => console.log(retornoAPI), (error) => console.log(error))
  }

  */
  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }


}



