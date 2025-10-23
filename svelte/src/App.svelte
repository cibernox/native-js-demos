<script>
  let count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
</script>

  
<vstack spacing="4" align="center" justify="center" style="height: 100vh;">
  <text>Vite + Svelte native IOS</text>
  <hstack>
    <button onclick={decrement}>Decrement</button>
    <text>{count}</text>
    <button onclick={increment}>Increment</button>
  </hstack>
</vstack>
