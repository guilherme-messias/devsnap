import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'relativeDate', standalone: true })
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;

    const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

    if (Math.abs(diffMs) < day) return 'hoje';
    if (Math.abs(diffMs) < week) return rtf.format(Math.round(diffMs / day), 'day');
    return rtf.format(Math.round(diffMs / week), 'week');
  }
}
