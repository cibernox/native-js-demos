<script lang="ts">
  import { currentPage } from "./stores/current-page";
  function navigateTo(path: string) {
    window.location.hash = path;
  }
</script>

<nav>
  <p>Recipes App</p>
  <ul>
    <li><button on:click={() => $currentPage = 'home'}>Home</button></li>
    <li><button on:click={() => $currentPage = 'about'}>About!</button></li>
  </ul>
</nav>