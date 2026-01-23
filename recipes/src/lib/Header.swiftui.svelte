<script lang="ts">
  import { currentPage } from "./stores/current-page";
</script>

<hstack>
  <text>Recipes App</text>
  <hstack spacing="20px">
    <button onclick={() => $currentPage = 'home'}>Home</button>
    <button onclick={() => $currentPage = 'about'}>About!</button>
  </hstack>
</hstack>