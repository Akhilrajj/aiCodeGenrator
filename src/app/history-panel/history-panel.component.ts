import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history-panel.component.html',
  styleUrls: ['./history-panel.component.scss']
})
export class HistoryPanelComponent implements OnChanges {
  @Input() snippets: string[] = [];
  @Output() snippetSelected = new EventEmitter<string>();

  searchTerm: string = '';
  filteredSnippets: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['snippets']) {
      this.filterSnippets();
    }
  }

  filterSnippets() {
    this.filteredSnippets = this.snippets.filter(snippet =>
      snippet.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectSnippet(snippet: string) {
    this.snippetSelected.emit(snippet);
  }
}