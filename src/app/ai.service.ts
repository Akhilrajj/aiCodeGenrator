import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'http://localhost:3000/api/generate';

  constructor(private http: HttpClient) { }

  generateSnippet(prompt: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      prompt: {
        text: prompt
      },
      max_output_tokens: 500,
      temperature: 0.5
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        // The backend now forwards the Gemini API response directly.
        // The response structure for text-bison-001 is { candidates: [ { output: '...' } ] }
        return response?.candidates?.[0]?.output || '';
      }),
      catchError(error => {
        console.error('Error calling backend API:', error);
        return of(`Error: ${error.message}`);
      })
    );
  }
}