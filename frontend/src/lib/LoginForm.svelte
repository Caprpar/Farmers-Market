<script lang="ts">
  type PlayerRow = {
    id: string;
    name: string;
    password_hash: string;
    current_balance: number;
    highest_score: number;
  };
  import { getAuthHeaders } from "../hooks/playerHooks.ts";
  import { push } from "svelte-spa-router";
  let username: string = $state("");
  let password: string = $state("");
  let confirmPassword: string = $state("");
  let error: { error: string } = $state({ error: "" });
  let { signUpForm } = $props();
  let loginRedirect: "Loggin in..." | null = $state(null);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (signUpForm) {
      // signUpForm
      fetch("http://localhost:3000/api/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password, confirmPassword }),
      })
        .then((res) => res.json())
        .then((data) => {
          error = { error: data.error };
        });
    } else {
      // logIn form
      const headers = getAuthHeaders();
      fetch("http://localhost:3000/api/player/auth", {
        method: "POST",
        headers,
        body: JSON.stringify({ name: username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.ok) {
            throw new Error("Authentication failed");
          }
          localStorage.setItem("auth_token", data.data.token);

          const headers = getAuthHeaders();
          fetch(`http://localhost:3000/api/player/${data.data.id}`, {
            headers,
          })
            .then((res) => res.json())
            .then((data) => {
              error = { error: data.error };
              console.log();
              if (!error.error) {
                console.log("Start waiting...");
                loginRedirect = "Loggin in...";

                setTimeout(() => {
                  console.log("Waited 2 seconds!");
                  push("/play");
                }, 2000); // Waits for 3000 milliseconds (3 seconds)
              }
            });

          error = { error: data.error };
        });
    }
  }
</script>

<div class="flex flex-col">
  <h1>{signUpForm ? "Sign up" : "Log in"}</h1>
  <form onsubmit={handleSubmit} class="flex flex-col gap-3">
    <input
      data-cy="username-input"
      bind:value={username}
      placeholder="Username"
      required
    />
    <input
      data-cy="password-input"
      bind:value={password}
      placeholder="Password"
      type="password"
      required
    />
    {#if signUpForm}
      <input
        data-cy="confirm-password-input"
        bind:value={confirmPassword}
        placeholder="Repeat password"
        type="password"
        required
      />
    {/if}
    {#if error.error}
      <p data-cy="login-error" class="text-wrap text-red-500 text-sm">
        {error.error}
      </p>
    {/if}
    {#if loginRedirect}
      <p data-cy="login-redirect" class="text-wrap text-green-500 text-sm">
        {loginRedirect}
      </p>
    {/if}
    <div class="flex justify-between">
      <button data-cy="confirm-btn" type="submit" class="w-fit"
        >{signUpForm ? "Sign up" : "Log in"}</button
      >
      <button
        data-cy="toggle-btn"
        type="button"
        onclick={() => {
          signUpForm = !signUpForm;
        }}
        class="w-fit link text-amber-600"
        >{signUpForm ? "Log in" : "Sign up"}</button
      >
    </div>
  </form>
</div>

<style>
  input {
    background-color: hsl(0 0 10);
    border-radius: 0.5em;
    padding: 0.6em 1em;
  }

  h1 {
    font-size: 2.2em;
    line-height: 1.1;
    padding-bottom: 0.5em;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.5em 1em;
    font-size: 1em;
    font-family: inherit;
    cursor: pointer;
    background-color: hsl(0 0 10);
    transition: border-color 0.25s;
  }

  button:hover {
    background-color: hsl(0 0 8);
  }

  .link {
    background-color: transparent;
  }
  .link:hover {
    background-color: transparent;
    text-decoration: underline;
  }
</style>
