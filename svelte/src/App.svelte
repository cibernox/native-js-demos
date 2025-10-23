<script>
  let count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
</script>

  
<hstack>
  <button onclick={decrement}>Decrement</button>
  <text>{count}</text>
  <button onclick={increment}>Increment</button>
</hstack>
