
import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoNewItemComponent } from './components/todo-new-item/todo-new-item.component';

const routeConfig: Routes = [
    {
      path: '',
      redirectTo: '/todos',
      pathMatch: 'full'
    },
    {
      path: 'todos',
      component: TodoListComponent,
      title: 'Todo List'
    },
    {
      path: 'todo/new',
      component: TodoNewItemComponent,
      title: 'New Todo Item'
    },
    {
      path: 'todo/:id',
      component: TodoDetailComponent,
      title: 'Todo Detail'
    },
    {
      path: '**',
      redirectTo: '/todos'
    }
  ];
  
  export default routeConfig;