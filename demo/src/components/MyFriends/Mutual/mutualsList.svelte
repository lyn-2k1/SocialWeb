<script>
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    export let friend_id
    let friendMutual = []
    onMount(() => {
            fetch(`http://localhost:4000/friend/${friend_id}/mutual`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
            .then((res)=> res.json())
            .then((data) => {
                friendMutual = data
                console.log(data)
            })
    })
</script>
<div class="length-fr">
    <div class="length">
        <span>{friendMutual.length} bạn chung</span>
    </div>
    <div class="mutual-fr">
        {#each friendMutual as friend}
            <div>
                <span>{friend.first_name+" "+friend.last_name}</span>
            </div>        
        {/each}
    </div>
</div>
<style>
.length-fr {
    display: inline-block;
    position: relative;
}
.length-fr .length {
    /* border-bottom: 1px dotted black; */
    font-size: smaller;
    color: #777779ab;
}
.length-fr .mutual-fr {
    visibility: hidden;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    font-size: small;
}
.length-fr:hover .mutual-fr {
    visibility: visible;
}

</style>