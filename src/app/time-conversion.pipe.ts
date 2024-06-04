import { ParseSpan } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConversion',
  standalone: true
})
export class TimeConversionPipe implements PipeTransform {

  transform(value: number): unknown {
    const hour= Math.floor(value/60);
    const minits=value%60;
    if (hour==null)
      return minits
    else
       return hour+":"+minits 
  }

}