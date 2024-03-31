import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoNewItemComponent } from './components/todo-new-item/todo-new-item.component';

const routeConfig: Routes = [
  // Redirect to the todo list if the path is empty
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  },
  // Route to the todo list
  {
    path: 'todos',
    component: TodoListComponent,
    title: 'Todo List',
  },
  // Route to the new todo item form
  {
    path: 'todo/new',
    component: TodoNewItemComponent,
    title: 'New Todo Item',
  },
  // Route to the todo detail view
  {
    path: 'todo/:id',
    component: TodoDetailComponent,
    title: 'Todo Detail',
  },
  // Redirect to the todo list if the path is not found - should technically be a 404 page, but this is a simple example
  {
    path: '**',
    redirectTo: '/todos',
  },
];

export default routeConfig;
