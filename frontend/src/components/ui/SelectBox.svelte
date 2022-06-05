<script>
  import { bind } from "svelte/internal"

  export let start
  export let end
  export let value = start

  // $("#selecBox").change(() => { value = this.value })
  $: limitSelect = Array.from(Array(end-start+1).keys()).map(i=>i+start)
</script>

<select id="selecBox" bind:value={value}>
    {#each limitSelect as question}
      <option value={question} >
        {question}
      </option>
    {/each}
  </select>

<style>
    #selecBox {
      width: 100px;
      height: 30px;
      vertical-align: top;
      margin: 5px 15px;
      border: 2px solid rgba(177, 167, 167, 0.637);
      padding: 2px 5px;
      border-radius: 2rem;
      font-size: 15px;
    }
</style>