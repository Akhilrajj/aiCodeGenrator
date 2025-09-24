import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AiService } from '../ai.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  @Output() querySubmitted = new EventEmitter<string>();
  queryForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private aiService: AiService) {
    this.queryForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.queryForm.valid) {
      const query = this.queryForm.value.query;
      this.loading = true;

      // Call AIService and subscribe to get the snippet
      this.aiService.generateSnippet(query).subscribe({
        next: (snippet: string) => {
          this.querySubmitted.emit(snippet); // Emit AI-generated snippet
          this.loading = false;
        },
        error: (err) => {
          console.error('Error generating snippet:', err);
          this.loading = false;
        }
      });
    }
  }
}
