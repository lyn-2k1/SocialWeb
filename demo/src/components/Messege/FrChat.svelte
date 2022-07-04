<script>
    export let friend
    let messegeUrl = "http://localhost:3000/messege"
    const chatFriendWant=(e)=>{
        window.location.href = messegeUrl +"?messegeId="+friend._id
        console.log(window.location.href)
    }
</script>
<div id="fr_c" on:click= {chatFriendWant}>
    <div id="ava_fr">
        <img src="{friend.avatar}" alt="avatar">
    </div>
    <div id="cnt_fr">
        <div id="nam_fr">
            {friend.first_name+" "+friend.last_name}
        </div>
        <div id="mes_new">
            <!-- mes -->
        </div>
    </div>
</div>

<style>
    #fr_c {
        width: 90%;
        /* background: rgba(249, 249, 252, 0.849); */
        margin: auto;
        min-height: 100px;
        display: flex;
    }
    #ava_fr {
        width: 30%;
    }
    #ava_fr img {
        width: 70px;
        height: 70px;
        margin: 19px 18px;
        border-radius: 100%;
    }
    #cnt_fr {
        width: 70%;
    }
    #nam_fr {
        margin: 30px 0px 5px;
        height: 20%;
        color: rgba(0, 0, 0, 0.904);
    }
    #mes_new {
        height: 40%;
    }
    #fr_c:hover {
        background: rgba(164, 146, 187, 0.13);
        border-radius: 5px;
    }
</style>