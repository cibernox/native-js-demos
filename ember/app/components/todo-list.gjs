import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export default class TodoListComponent extends Component {
  @tracked newTodoTitleInput = '';
  @tracked newTodoDescriptionInput = '';
  @tracked todos = [
    { id: 1, title: 'Re-learn Ember.js', description: null, completed: false },
    { id: 2, title: 'Build iOS app', description: null, completed: false },
    { id: 3, title: 'Build iOS app using Ember', description: 'Cool, uh?', completed: false },
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

  <template>
    <navigationstack>
      <list modifiers=".navigationTitle(&quot;Todo List in ember&quot;).safeAreaInset(edge: .bottom, content: todo_form)">
        <section>
          {{#each this.todos as |todo|}}
            <hstack id={{todo.id}} modifiers="swipeActions(edge: .trailing, allowsFullSwipe: true, content: trailingActions);">
              <button template="trailingActions" role="destructive" {{on "click" (fn this.removeTodo todo.id)}}>
                <image systemName="trash" />
              </button>
              <label>
                <hstack template="title">
                  <button {{on "click" (fn this.toggleComplete todo.id)}}>
                    <image
                      systemName={{if todo.completed "checkmark.circle.fill" "circle"}}
                    />
                  </button>
                  <vstack
                    alignment="leading"
                    modifiers="frame(maxWidth: .infinity, alignment: .leading);{{if todo.completed 'strikethrough(true, .dash);' ''}}"
                  >
                    <text>{{todo.title}}</text>
                    {{#if todo.description}}
                      <text modifiers="foregroundStyle(.secondary); font(.caption);">{{todo.description}}</text>
                    {{/if}}
                  </vstack>
                </hstack>
              </label>
            </hstack>
          {{/each}}

          <text template="footer">
            {{this.remainingCount}} of {{this.totalCount}} remaining
          </text>
        </section>

        <vstack template="todo_form" modifiers="padding().glassEffect(in: .containerRelative).padding(.horizontal)">
          <vstack modifiers="padding()">
            <textfield
              placeholder="Add a new todo..."
              value={{this.newTodoTitleInput}}
              {{on "input" this.updateTitle}}
            >
              Todo title
            </textfield>
            <textfield
              placeholder="Add a new todo..."
              value={{this.newTodoDescriptionInput}}
              {{on "input" this.updateDescription}}
            >
              Todo description (optional)
            </textfield>
          </vstack>
          <button {{on "click" this.addTodo}} modifiers="buttonStyle(.borderedProminent)">
            <text modifiers="frame(maxWidth: 9999)">Add</text>
          </button>
        </vstack>
      </list>
    </navigationstack>
  </template>
}
