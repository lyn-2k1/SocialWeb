<script>
    export let icon;
    export let path;
    export let distance;
    export let name = "icon"

</script>
<li>
    <div class = "icon-fuc" style="margin: 0 {distance}rem;">
        {#if name=="avatar"}
            <a href= {path}>
                <img src= {icon} alt="icon page"width="40px" height="40px" style="border-radius: 2rem; margin:auto;">
            </a>
        {:else}
            <a href= {path}>
                <img src= {icon} alt="icon page" height="28px" width="25px">
            </a>
        {/if}
    </div>
</li>

<style>
    .icon-fuc {
        padding: 4px;
        box-sizing: border-box;
        
    }
    .icon-fuc:hover {       
        background-color: rgba(157, 177, 177, 0.856);
    }

    
</style>