import { Component } from '@angular/core';
import { BarraComponent } from '../barra-component/barra-component';
import { AlertaService } from '../services/alerta.service';

@Component({
  selector: 'app-painel-component',
  imports: [BarraComponent],
  templateUrl: './painel-component.html',
  styleUrl: './painel-component.css',
})
export class PainelComponent {
  constructor(private alertaService: AlertaService) {}

  botaoClicado() {
    this.alertaService.ativarAlerta();
  }
}
