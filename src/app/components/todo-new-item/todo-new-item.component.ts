import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { numberValidator } from './number.validator';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-new',
  standalone: true,
  imports: [
    // FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './todo-new-item.component.html',
  styleUrls: ['./todo-new-item.component.css']
})
export class TodoNewItemComponent {
  // Inject the FormBuilder service
  constructor(private fb: FormBuilder, private router: Router) {}

  // Create a new FormGroup with the FormBuilder
  newTodoForm = this.fb.group({
    Name: ['', Validators.required],
    Description: [''],
    Expenses: [undefined, numberValidator],
  });

  onSubmit() {
    // Here you can implement logic to save the new todo item, for now, let's just navigate back to the todo list
    // You can replace this with actual logic to save the new todo item to a service or backend
    console.log('New Todo:', this.newTodoForm.value);
    // Reset the form fields
    this.newTodoForm.reset();
    // Navigate back to the todo list
    this.router.navigate(['/todos']);
  }
  
  // newTodo: Todo = {
  //   Name: '',
  //   Description: '', 
  //   Expenses: undefined,
  // };

  // constructor(private router: Router) {}

  // onSubmit() {
  //   // Here you can implement logic to save the new todo item, for now, let's just navigate back to the todo list
  //   // You can replace this with actual logic to save the new todo item to a service or backend
  //   console.log('New Todo:', this.newTodo);
  //   // Reset the form fields
  //   this.newTodo = {
  //     Name: '',
  //     Description: '',
  //     Expenses: undefined,
  //   };
  //   // Navigate back to the todo list
  //   this.router.navigate(['/todos']);
  // }
}
