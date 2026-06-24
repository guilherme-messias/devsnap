import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-code-snippet',
  imports: [MarkdownComponent],
  standalone: true,
  template: `
    <div class="bg-gray-800 text-white p-4 rounded-lg">
      <markdown [data]="code" ngPreserveWhitespaces> </markdown>
    </div>
  `,
})
export class CodeSnippetComponent {
  @Input() code = '';
}
