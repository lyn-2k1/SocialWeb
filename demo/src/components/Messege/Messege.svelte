<script>
    import { beforeUpdate, onMount } from "svelte";
    import Cookies from "js-cookie";
    import Header from "../HeaderHome/Header.svelte"
    import FrChat from "./FrChat.svelte"
    import ContentChatFr from "./ContentChatFr.svelte"
    var url_string =window.location.href
    var url = new URL(url_string);
    var messegeId = url.searchParams.get("messegeId")
    let userData
    let idfirst 
    let friends = []
    onMount(() => {
            fetch(`http://localhost:4000/profile`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("user",data)
                userData = {...data}
                // idfirst = userData._id
            });
    });
    onMount(async () => {
            await fetch(`http://localhost:4000/friend`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
            .then((res)=> res.json())
            .then((data) => {
                friends = data
                console.log(friends)
                idfirst = friends[0]._id
                console.log("idfirst",idfirst)
                if(!messegeId) window.location.href= "http://localhost:3000/messege" +"?messegeId="+ idfirst
            })
    })
    
</script>
<div class="khung">
    <Header user = "{userData}"/>
    <div id="mes">
        <div id="list_fr_chat">
            <h3>Chat</h3>
            <div id="list">
                {#each friends as friend}
                    <FrChat friend={friend}/>
                {/each}
            </div>
        </div>

        <div id="content_chat">
            <ContentChatFr idUser={idfirst}/>        
        </div>
    </div>
    
</div>
<style>
    .khung{
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        overflow: hidden;

    }
    #mes {
        display: flex;
        flex: 1 1 0%;
        height: 0;
        min-height: 100%;
    }
    #list_fr_chat {
        width: 30%;
        background-color: #d4c8db69;
        min-height: 100vh;
        border-right: 1px solid slategrey;
        border-radius: 2px;
    }
    #list_fr_chat h3 {
        padding: 20px;
        border-bottom: 1px solid slategrey;
    }
    #list {
        overflow-y: scroll;
    }
    #content_chat {
        width: 70%;
        display: flex;
        flex: 1 1 0%;
        background: #ffff;
        padding-bottom: 50px;
        
        
    }

</style>