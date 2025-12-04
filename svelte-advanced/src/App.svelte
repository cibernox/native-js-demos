<script>
  let newTodoTitleInput = $state();
  let newTodoDescriptionInput = $state();
  let todos = $state([
    { id: 1, title: 'Learn Svelte', description: null, completed: false },
    { id: 2, title: 'Build iOS app', description: null, completed: false },
    { id: 3, title: 'Build iOS app using svelte', description: 'Cool, uh?', completed: false },
    { id: 4, title: 'Profit?', description: null, completed: false },
  ]);
  
  const nextId = $derived(todos.length + 1);
  const remainingCount = $derived(todos.filter(t => !t.completed).length);
  const totalCount = $derived(todos.length);

  function addTodo() {
    const title = newTodoTitleInput.value;
    const description = newTodoDescriptionInput.value;
    if (title.trim()) {
      todos.push({ id: nextId, title: title.trim(), description: description.trim(), completed: false });
      newTodoTitleInput.value = '';
      newTodoDescriptionInput.value = '';
    }
  }

  function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  function removeTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
  }
</script>

<vstack modifiers="padding(20);">
  <text modifiers="font(.largeTitle.bold()); padding(.bottom, 20);">Todo List</text>
  
  <hstack modifiers="padding(.bottom, 20);">
    <vstack>
      <textfield 
        bind:this={newTodoTitleInput} placeholder="Add a new todo..." 
        modifiers="flex(1); padding(8); border(1, .gray); cornerRadius(8);">
        Todo title
      </textfield>
      <textfield 
        bind:this={newTodoDescriptionInput} placeholder="Add a new todo..." 
        modifiers="flex(1); padding(8); border(1, .gray); cornerRadius(8);">
        Todo description (optional)
      </textfield>
    </vstack>
    <button onclick={addTodo} modifiers="buttonStyle(.borderedProminent)">Add</button>
  </hstack> 

  <list modifiers="safeAreaInset(edge: .top, spacing: 0)">
    {#each todos as todo (todo.id)}
      <hstack id={todo.id} modifiers="swipeActions(edge: .trailing, allowsFullSwipe: true, content: trailingActions);">
        <button template="trailingActions" role="destructive" onclick={() => removeTodo(todo.id)}>
          <image systemName="trash" />
        </button>
        <label>
          <hstack template="title">
            <button onclick={() => toggleComplete(todo.id)}>
              <image
                systemName={todo.completed ? "checkmark.circle.fill" : "circle"}
                modifiers="imageScale(.large)"
              /> 
            </button>
            <vstack
              alignment="leading"
              modifiers="frame(maxWidth: .infinity, alignment: .leading);{todo.completed ? 'strikethrough(true, .dash);' : ''}"
            >
              <text>{todo.title}</text>
              {#if todo.description}
                <text modifiers="foregroundStyle(.secondary); font(.caption);">{todo.description}</text>
              {/if}
            </vstack>
          </hstack>
        </label>
      </hstack> 
    {/each}
  </list>

  <text modifiers="padding(.top, 20); foregroundColor(.secondary);">
    {remainingCount} of {totalCount} remaining
  </text>
</vstack>
