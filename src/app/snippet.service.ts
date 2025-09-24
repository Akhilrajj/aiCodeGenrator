import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Snippet } from './snippet';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private supabase: SupabaseClient;
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  saveSnippet(snippet: Omit<Snippet, 'id' | 'createdAt'>): Observable<Snippet> {
    return from(this.supabase.from('snippets').insert(snippet).select()).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data[0];
      })
    );
  }

  getHistory(): Observable<Snippet[]> {
    return from(this.supabase.from('snippets').select('*')).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      })
    );
  }

  deleteSnippet(id: number): Observable<void> {
    return from(this.supabase.from('snippets').delete().match({ id })).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
      })
    );
  }
}