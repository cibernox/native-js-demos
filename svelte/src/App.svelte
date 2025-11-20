<script>
  let newTodoInput = $state();
  let todos = $state([
    { id: 1, text: 'Learn Svelte', completed: false },
    { id: 2, text: 'Build iOS app', completed: false },
    { id: 3, text: 'Build iOS app using svelte', completed: false },
    { id: 4, text: 'Profit?', completed: false },
  ]);
  
  const nextId = $derived(todos.length + 1);
  const remainingCount = $derived(todos.filter(t => !t.completed).length);
  const totalCount = $derived(todos.length);

  function addTodo() {
    const newTodo = newTodoInput.value;
    if (newTodo.trim()) {
      todos.push({ id: nextId, text: newTodo.trim(), completed: false });
      newTodoInput.value = '';
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

<vstack style="padding(20); height: 100vh;">
  <text style="font(.largeTitle); fontWeight(.bold); padding(.bottom, 20);">Todo List</text>
  
  <hstack style="padding(.bottom, 20);">
    <!-- <input bind:this={newTodoInput} placeholder="Add a new todo..." style="flex(1); padding(8); border(1, .gray); cornerRadius(8);" /> -->
    <textfield bind:this={newTodoInput} placeholder="Add a new todo..." style="flex(1); padding(8); border(1, .gray); cornerRadius(8);">Fill in the text field</textfield>
    <!-- <textfield text="adsassdasd" style="flex(1); padding(8); border(1, .gray); cornerRadius(8);">Add a new todo...</textfield> -->
    <button onclick={addTodo} style="padding(8, 16); background(.blue); foregroundColor(.white); cornerRadius(8); marginLeading(8);">Add</button>
  </hstack>

  <vstack style="alignment(.leading); spacing(8);">
    {#each todos as todo (todo.id)}
      <hstack style="padding(12); background(.gray.opacity(0.1)); cornerRadius(8); alignment(.center);">
        <text style="flex(1); {todo.completed ? 'strikethrough(true, .red);' : ''}">{todo.text}</text>
        <button onclick={() => toggleComplete(todo.id)} style="padding(4, 8); background({todo.completed ? '.green' : '.orange'}); foregroundColor(.white); cornerRadius(4); marginTrailing(4);">
          {todo.completed ? 'Undo' : 'Done'}
        </button>
        <button onclick={() => removeTodo(todo.id)} style="padding(4, 8); background(.red); foregroundColor(.white); cornerRadius(4);">Remove</button>
      </hstack>
    {/each}
  </vstack>

  <text style="padding(.top, 20); foregroundColor(.secondary);">
    {remainingCount} of {totalCount} remaining
  </text>
</vstack>
