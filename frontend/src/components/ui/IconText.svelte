 <script>
   export let icon 
   export let text
   export let icon1 = ""
 </script>
<div class="block">
    <div id="ic">
        <img class="icon" src={icon} alt="Icon">
        <span class="text">{text}</span>
    </div>
    {#if icon1 != ""}
        <div id="icon1">
            <img src="{icon1}" alt="" width="24px" height="24px">
        </div>   
    {/if}
</div>
<style>
    .block {
        display: flex;
        height: 50px;
        align-items: center;
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        max-width: 250px;        
    }
    #ic {
        display: flex;
        width: 85%;
    }
    .icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
    .text {
      font-weight: 600;
    }
    /* #icon1 {
       
    } */
    .block:hover {
        background-color: #e4e6e9;
    }

</style>
        