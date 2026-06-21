import { Component, inject } from '@angular/core';
import { NotaService } from '../services/nota.service';
import { TotalComponent } from "../total-component/total-component";

@Component({
  selector: 'app-nota-component',
  imports: [TotalComponent],
  templateUrl: './nota-component.html',
  styleUrl: './nota-component.css',
})
export class NotaComponent {
  notaService = inject(NotaService);
}
