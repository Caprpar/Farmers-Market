<script lang="ts">
  import { onMount } from "svelte";
  import {
    getAuthHeaders,
    getPlayerData,
    patchPlayer,
  } from "../hooks/playerHooks";
  import type { betButton, PlayerRow } from "../types";

  const buttons = $state<betButton[]>([
    { value: 20, isPressed: false, isDisabled: false },
    { value: 50, isPressed: false, isDisabled: false },
    { value: 80, isPressed: false, isDisabled: false },
  ]);

  let player: PlayerRow | null = $state(null);
  let display_error = $state({});
  let currentBet: number = $state(0);

  function toggle(index: number) {
    currentBet = 0;
    buttons[index]!.isPressed = !buttons[index]!.isPressed;

    for (const betButton of buttons) {
      if (betButton.isPressed) {
        const calculateBet = player?.current_balance! * betButton.value;
        currentBet += Math.round(calculateBet / 100);
      }
      buttons.forEach((btn) => {
        const willExeed =
          currentBet + (btn.value / 100) * player?.current_balance! >
          player?.current_balance!;
        console.log({
          willExeed,
          pressed: btn.isPressed,
        });
        btn.isDisabled = !btn.isPressed && willExeed ? true : false;
      });
    }
  }

  function applyFiftyFiftyBet(current_balance: number, bet: number): number {
    current_balance += Math.random() < 0.5 ? bet : bet * -1;
    return current_balance < 0 ? 0 : current_balance;
  }

  function resetButtons() {
    currentBet = 0;
    buttons.forEach((btn) => {
      btn.isPressed = false;
      btn.isDisabled = false;
    });
  }

  async function handlePlay() {
    const new_balance: number = Math.round(
      applyFiftyFiftyBet(player?.current_balance!, currentBet),
    );

    await patchPlayer({ current_balance: new_balance });
    const { data, error } = await getPlayerData();
    if (error) {
      display_error = error;
    }
    player = data;
    resetButtons();
  }

  onMount(async () => {
    const { data, error } = await getPlayerData();
    console.log({ data, error });
    if (error) {
      display_error = error;
    }
    player = data;
  });
</script>

<div class="w-full bg-stone-900 p-5 rounded-lg" id="main" data-cy="bet-board">
  {#if player}
    <div class="flex flex-col">
      <div class="w-full flex flex-row justify-between border-b">
        <p id="current_balance">Balance:</p>
        <p id="current_balance">{player?.current_balance}</p>
      </div>
      <p
        class="w-full rounded-full flex justify-center items-center bg-stone-800 py-5 my-2"
        id="current_bet"
      >
        {currentBet}
      </p>
      <span class="flex w-full justify-center mb-2 text-xs text-stone-400"
        >Place precentage of current balance</span
      >
      <div class="flex justify-around pb-5">
        {#each buttons as item, index}
          <button
            data-cy={`${item.value}-btn`}
            disabled={item.isDisabled}
            class:isPressed={item.isPressed}
            onclick={() => toggle(index)}>{item.value}</button
          >
        {/each}
      </div>
      <button data-cy="play-btn" class="w-full" onclick={handlePlay}
        >play</button
      >
    </div>
  {:else}
    <h1 data-cy="login-information">Please login to play</h1>
  {/if}
</div>

<style>
  #current_balance {
    font-size: 1em;
  }
  #current_bet {
    font-size: 4em;
  }
  button {
    padding: 0.5em 1em;
    border: solid 1px hsl(0 0 30);
    background-color: hsl(0 0 30);
    font-weight: 600;
    border-radius: 1em;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    background-color: hsl(0 0 40);
  }
  button:disabled {
    opacity: 0.5;
  }
  button:disabled:hover {
    background-color: hsl(0 0 30);
    cursor: default;
  }
  .isPressed {
    scale: 1.3;
  }
  #main {
    min-width: 15em;
  }
</style>
