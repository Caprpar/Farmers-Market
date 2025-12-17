<script lang="ts">
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";
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
          const token: string | null = localStorage.getItem("auth_token");
          const headers = new Headers({ "Content-Type": "application/json" });
          if (token) headers.set("authorization", token);
          const res = await fetch(`http://localhost:3000/api/player/0`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ current_balance: 1000 }),
          });
        }}>Reset balance</button
      >
    </ol>
  </ul>
</div>
<Router {routes} />
