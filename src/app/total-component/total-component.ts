import { Component, inject } from '@angular/core';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-total-component',
  imports: [],
  templateUrl: './total-component.html',
  styleUrl: './total-component.css',
})
export class TotalComponent {
  notaService = inject(NotaService);
}
