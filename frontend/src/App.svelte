<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import Play from "./routes/Play.svelte";
  import Scoreboard from "./routes/Scoreboard.svelte";
  const routes = {
    "/": Home,
    "/play": Play,
    "/scoreboard": Scoreboard,
  };
</script>

<div class="absolute top-1 left-1">
  <ul class="flex gap-2">
    <ol><a href="#/">Login</a></ol>
    <ol><a href="#/play">Play</a></ol>
    <ol><a href="#/scoreboard">Scoreboard</a></ol>
  </ul>
</div>
<Router {routes} />
