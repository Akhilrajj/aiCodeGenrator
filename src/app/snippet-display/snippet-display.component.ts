import { Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var Prism: any;

@Component({
  selector: 'app-snippet-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snippet-display.component.html',
  styleUrls: ['./snippet-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnippetDisplayComponent implements AfterViewInit {
  @Input() snippet: string = '';
  @Output() snippetSaved = new EventEmitter<void>();

  ngAfterViewInit() {
    Prism.highlightAll();
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.snippet);
  }

  saveSnippet() {
    this.snippetSaved.emit();
  }
}