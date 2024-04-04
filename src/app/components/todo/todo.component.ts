import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { numberValidator } from './number.validator'; // Import custom validator if needed
import { Todo } from '../../models/todo.model';

enum TodoState {
  LIST,
  DETAIL,
  NEW,
  LOADING,
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  TodoState: typeof TodoState = TodoState;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  // Define form group with form controls and their initial values and validators
  newTodoForm = this.fb.group({
    Name: ['', Validators.required], // Name field is required
    Description: [''], // Description field is optional
    Expenses: [undefined, numberValidator], // Expenses field is optional but must be a number if provided
  });

  todos$!: Observable<Todo[]>; // Observable to hold the todo list
  todo$: Observable<any> = new Observable<any>(); // Observable to hold the todo item
  selectedTodoId: number | null = null; // Variable to track the selected Todo item ID
  currentState: TodoState = TodoState.LIST;

  ngOnInit(): void {
    this.todos$ = this.fetchTodoList(); // Fetch todo list on component initialization
    this.todo$ = this.getSelectedTodo(); // Get the selected todo item
  }

  fetchTodoList(): Observable<any[]> {
    return this.httpClient
      .get<any[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .pipe(
        map((todoList) => {
          // Convert 'Created' timestamps to Date objects
          todoList.forEach((todo) => {
            if (typeof todo.Created === 'number') {
              todo.Created = new Date(todo.Created);
            }
          });
          return todoList;
        }),
      );
  }

  // Toggles the state of the component to show the detail view of a todo item
  showDetail(todoId: number) {
    this.selectedTodoId = todoId;
    this.currentState = TodoState.DETAIL;
  }

  // Toggles the state of the component to show the list view of todo items
  showList() {
    this.selectedTodoId = null;
    this.currentState = TodoState.LIST;
  }

  // Toggles the state of the component to show the new todo item form
  showNewForm() {
    this.currentState = TodoState.NEW;
  }

  // Function to handle form submission
  onSubmit() {
    // Log the form value to see the form data in the console when the form is submitted
    console.log('New Todo:', this.newTodoForm.value);
    // Reset the form fields
    this.newTodoForm.reset();
    // Navigate back to the todo list
    this.showList();
  }

  // Toggles the state of the component to show the loading state
  showLoading() {
    this.currentState = TodoState.LOADING;
  }

  // Check if a value is a valid Date object
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Calculate the age of the todo item in days
  getDaysOld(created: Date | undefined): number | string {
    if (!created || !this.isValidDate(created)) {
      return 'Age unknown';
    }
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - created.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Select a todo item from the list
  getSelectedTodo(): Observable<Todo | undefined> {
    return this.todos$.pipe(
      map((todos) => todos.find((todo) => todo.Id === this.selectedTodoId)),
    );
  }
}
