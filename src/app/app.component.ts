import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { SnippetDisplayComponent } from './snippet-display/snippet-display.component';
import { HistoryPanelComponent } from './history-panel/history-panel.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserInputComponent, SnippetDisplayComponent, HistoryPanelComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aiPoweredCodeSnippetHelper';
  snippetHistory: string[] = [
    `function helloWorld() {\n  console.log("Hello, world!");\n}`,
    `const a = 1;\nconst b = 2;\nconsole.log(a + b);`,
    `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`
  ];
  selectedSnippet: string = this.snippetHistory[0];
  isLoading: boolean = true;

  onSnippetSelected(snippet: string) {
    this.selectedSnippet = snippet;
  }
}
