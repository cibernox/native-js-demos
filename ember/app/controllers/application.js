import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked newTodoTitleInput = '';
  @tracked newTodoDescriptionInput = '';
  @tracked todos = [
    { id: 1, title: 'Learn Svelte', description: null, completed: false },
    { id: 2, title: 'Build iOS app', description: null, completed: false },
    { id: 3, title: 'Build iOS app using svelte', description: 'Cool, uh?', completed: false },
    { id: 4, title: 'Profit?', description: null, completed: false },
  ];

  get nextId() {
    return this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
  }

  get remainingCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  get totalCount() {
    return this.todos.length;
  }

  @action
  addTodo() {
    const title = this.newTodoTitleInput.trim();
    const description = (this.newTodoDescriptionInput || '').trim();

    if (title !== '') {
      const todo = { id: this.nextId, title: title, description: null, completed: false };
      if (description !== '') {
        todo.description = description;
      }
      this.todos = [...this.todos, todo];
      this.newTodoTitleInput = '';
      this.newTodoDescriptionInput = '';
    }
  }

  @action
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todos = [...this.todos];
    }
  }

  @action
  removeTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  @action
  updateTitle(event) {
    this.newTodoTitleInput = event.target.value;
  }

  @action
  updateDescription(event) {
    this.newTodoDescriptionInput = event.target.value;
  }
}
