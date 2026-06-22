import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertaService } from '../services/alerta.service';

@Component({
  selector: 'app-barra-component',
  imports: [],
  templateUrl: './barra-component.html',
  styleUrl: './barra-component.css',
})
export class BarraComponent {
  mensagem = '';
  private alerta!: Subscription;

  constructor(private alertaService: AlertaService) {}

  ngOnInit() {
    this.alerta = this.alertaService.sub$.subscribe((mensagem) => {
      this.mensagem = mensagem;
    });
  }

  ngOnDestroy() {
    this.alerta.unsubscribe();
  }
}
