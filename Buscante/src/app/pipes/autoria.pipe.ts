import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  transform(autoria: string[]): string {
    if(autoria){
      if(autoria[1]){
        return autoria[0]
      }else{
        return `${autoria[0]}...`
      }

    }
    return ''
  }

}
