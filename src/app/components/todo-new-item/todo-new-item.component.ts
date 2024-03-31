import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { numberValidator } from './number.validator'; // Import custom validator if needed

@Component({
  selector: 'app-todo-new',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-new-item.component.html',
  styleUrls: ['./todo-new-item.component.css'],
})
export class TodoNewItemComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  // Define form group with form controls and their initial values and validators
  newTodoForm = this.fb.group({
    Name: ['', Validators.required], // Name field is required
    Description: [''], // Description field is optional
    Expenses: [undefined, numberValidator], // Expenses field is optional but must be a number if provided
  });

  // Function to handle form submission
  onSubmit() {
    // Log the form value to see the form data in the console when the form is submitted
    console.log('New Todo:', this.newTodoForm.value);
    // Reset the form fields
    this.newTodoForm.reset();
    // Navigate back to the todo list
    this.navigateToTodoList();
  }

  // Function to navigate back to the todo list
  navigateToTodoList(): void {
    this.router.navigate(['/todos']);
  }
}
