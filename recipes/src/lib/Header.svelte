<script lang="ts">
  import { goto } from "$app/navigation";
</script>
<hstack>
  <text>Recipes App</text>
  <hstack>
    <text onclick={() => goto("/")}>Home</text>
    <text onclick={() => goto("/about")}>About!</text>
    <text>Link 3</text>
  </hstack>
</hstack>