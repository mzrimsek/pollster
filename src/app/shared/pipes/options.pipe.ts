import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'options'
})
export class OptionsPipe implements PipeTransform {

  transform(options: string[]): string {
    if (options.length === 1) {
      return options[0];
    }
    return options.join(', ');
  }

}
