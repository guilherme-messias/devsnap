import { Component, inject } from '@angular/core';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-nota-component',
  imports: [],
  templateUrl: './nota-component.html',
  styleUrl: './nota-component.css',
})
export class NotaComponent {
  protected notaService = inject(NotaService);
}
