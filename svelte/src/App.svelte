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

  function handleKeypress(event) {
    debugger;
    if (event.key === 'Enter') {
      addTodo();
    }
  }
</script>

<vstack modifiers="padding(20); height: 100vh;">
  <text modifiers="font(.largeTitle); fontWeight(.bold); padding(.bottom, 20);">Todo List</text>
  
  <hstack modifiers="padding(.bottom, 20);">
    <!-- <input bind:this={newTodoInput} placeholder="Add a new todo..." modifiers="flex(1); padding(8); border(1, .gray); cornerRadius(8);" /> -->
    <textfield bind:this={newTodoInput} placeholder="Add a new todo..." modifiers="flex(1); padding(8); border(1, .gray); cornerRadius(8);" onkeypress={handleKeypress}>Fill in the text field</textfield>
    <button onclick={addTodo} modifiers="buttonStyle(.borderedProminent)">Add</button>
  </hstack>

  <vstack modifiers="multilineTextAlignment(.leading); spacing(8);">
    {#each todos as todo (todo.id)}
      <hstack modifiers="padding(.horizontal,12); background(.gray.opacity(0.1)); cornerRadius(8);">
        <text modifiers="flex(1); multilineTextAlignment(.leading); {todo.completed ? 'strikethrough(true, .dash, .red);' : ''}">{todo.text}</text>
        <spacer/>
        <!-- {todo.text} -->
        <!-- <button onclick={() => toggleComplete(todo.id)} modifiers="padding(4, 8); background({todo.completed ? '.green' : '.orange'}); foregroundColor(.white); cornerRadius(4); marginTrailing(4);"> -->
        <button onclick={() => toggleComplete(todo.id)} modifiers="buttonStyle(.bordered);tint({todo.completed ? '.orange' : '.green'})">
          {todo.completed ? 'Undo' : 'Done'}
        </button>
        <button role=".destructive" onclick={() => removeTodo(todo.id)} modifiers="buttonStyle(.bordered);tint(.red)">Remove</button>
        <!-- <button role=".destructive" onclick={() => removeTodo(todo.id)} modifiers="background(.regularMaterial); clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))">Remove</button> -->
      </hstack>
    {/each}
  </vstack>

  <text modifiers="padding(.top, 20); foregroundColor(.secondary);">
    {remainingCount} of {totalCount} remaining
  </text>
</vstack>
