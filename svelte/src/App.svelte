<script>
  let count = 0;

  function increment() {
    console.log('### Incrementing count');
    count += 1;
  }

  function decrement() {
    console.log('### Decrementing count');
    count -= 1;
  }
</script>

  
<hstack>
  <button onclick={decrement}>Decrement</button>
  <text>{count}!!!</text>
  <button onclick={increment}>Increment</button>
</hstack>
