<script lang="ts">
  type DataRow = {
    player: string;
    id: string;
    highscore: number;
  };
  let players: DataRow[] = $state();
  fetch("http://localhost:3000/api/scoreboard")
    .then((res) => res.json())
    .then((data) => {
      players = data;
      console.log(data);
    });
</script>

<div>
  <h1>Scoreboard</h1>
  <table class="" data-cy="scoreboard">
    <tbody>
      <tr>
        <th>Nr</th>
        <th>Player</th>
        <th>Highscore</th>
      </tr>
      {#each players as { player, highscore }, index}
        <tr>
          <td>{index + 1}</td>
          <td data-cy={`name-${index + 1}`}>{player}</td>
          <td data-cy={`score-${index + 1}`}>{highscore}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  table,
  th,
  td {
    border: 4px solid hsl(0 0 10);
    padding: 0.5em 1em;
  }
  h1 {
    font-size: 2em;
  }
</style>
