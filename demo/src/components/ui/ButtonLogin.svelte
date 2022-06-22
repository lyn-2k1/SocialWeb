<script>
    export let name;
    export let onclick;
</script>
<div>
    <button class="btn" on:click={onclick}>{name}</button>
</div>
<style>
    .btn{
        margin-top: 1rem;
        background: rgb(226, 155, 167);
        border-radius: 2rem;
        padding: 12px;
        height: 100%;
        width: 100%;
    }
</style>