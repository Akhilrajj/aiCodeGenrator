import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal('light');

  constructor() { }

  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
    if (this.theme() === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}