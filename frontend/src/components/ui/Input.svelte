<script>
  export let value;
  export let type;
  export let placeholder;
</script>

<div class='text-input'>
  {#if type === 'password'}
  <input class="text-input" bind:value type="password" placeholder={placeholder} />
  {:else if type === 'email'}
   <input class="text-input" bind:value type="email"  placeholder={placeholder} />
  {:else}
   <input class="text-input" bind:value type="text" placeholder={placeholder} />
  {/if}
</div>

<style>

.text-input{
  padding: 3px;
  background-color: #f5f6f7;
  border: 1px solid #f5f6f7;
  border-radius: 2rem;
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  width: 100%;
}

</style>