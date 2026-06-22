import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertaService {
  private _sub$ = new Subject<string>();
  sub$ = this._sub$.asObservable();

  ativarAlerta() {
    this._sub$.next('Esse botao foi clicado com sucesso!');
  }
}
