import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,

  template: `
    <header class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold">DevSnap</h1>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
