import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null',
  standalone: true,
})
export class NullPipe implements PipeTransform {
  transform<T>(value: T | undefined | null): T | string {
    if (value === undefined || value === null || value === '') {
      return '-';
    }
    if (typeof value === 'number' && isNaN(value)) {
      return '-';
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return '-';
    }
    return value;
  }
}
