<script>
    export let user
    export let friend
</script>
{#if !user}
    <div id="chat_fr">
        <div id="ava">
            <img src={friend.user?.avatar} alt="ava">
        </div>
        <div class="mes">
            {friend.content}
        </div>
    </div>
{:else}
    <div id="chat_me">
        <div class="mes">
            {user.content}
        </div>
    </div>
    
{/if}


<style>
    #chat_fr {
        margin-bottom: 2px;
        margin-left: 10px;
        min-width: 75%;
        height: 36px;
        display: flex;
    }
    #chat_me {
        margin-top: 2px;
        margin-right: 10px;
        min-width: 75%;
        float: right;
    }
    #ava {
        width: 36px;
        height: 36px;
        margin-right: 10px;
    }
    #ava img {
        height: 36px;
        width: 36px;
        border-radius: 100%;
    }
    .mes {
        min-width: 25%;
        padding: 5px;
        border: 1px solid black;
        border-radius: 20px;
        background: rgba(230, 159, 226, 0.342);
        float: right;
    }

</style>