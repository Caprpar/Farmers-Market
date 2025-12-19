<script lang="ts">
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import Play from "./routes/Play.svelte";
  import Scoreboard from "./routes/Scoreboard.svelte";
  import { patchPlayer } from "./hooks/playerHooks";
  const routes = {
    "/": Home,
    "/play": Play,
    "/scoreboard": Scoreboard,
  };
</script>

<div class="absolute top-1 left-1">
  <ul class="flex gap-3">
    <ol><a href="#/">Login</a></ol>
    <ol>
      <button
        class="text-amber-700 font-bold cursor-pointer hover:text-amber-800"
        onclick={() => {
          localStorage.removeItem("auth_token");
          push("/");
        }}>LogOut</button
      >
    </ol>
    <ol><a href="#/play">Play</a></ol>
    <ol><a href="#/scoreboard">Scoreboard</a></ol>
    <ol>
      <button
        class="text-amber-700 font-bold cursor-pointer hover:text-amber-800"
        onclick={async () => {
          await patchPlayer({ current_balance: 1000 });
        }}>Reset balance</button
      >
    </ol>
  </ul>
</div>
<Router {routes} />
