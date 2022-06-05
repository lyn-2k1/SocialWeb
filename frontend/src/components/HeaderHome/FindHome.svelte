<script>
    import Input from '../ui/Input.svelte';
    let sreachInformation = ""
</script>
<div class = "search">     
    <img class="ic" src="iconFindInformation.svg" alt="icon find information" width="25px" height="25px">
    <input type="find" placeholder= "Tìm kiếm trên facebook" bind:value= {sreachInformation} />    
</div>
<style>
    .search {
        display: flex;
        width: 100%;
        max-width: 250px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding-left: 5px;
        padding-right: 5px;
        height: 50px;
        font-size: 14px;
        color: #333;
        background-color: #f5f5f5;

    }
    .search input {
        width: 100%;
        height: 30px;
        border: none;
        background-color: transparent;
        margin-left: 10px;   
    }


</style>