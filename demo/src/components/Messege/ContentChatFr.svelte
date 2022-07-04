<script>
    import { async } from "rxjs";
    import { afterUpdate, onMount, tick } from "svelte";
    import Input from "../ui/Input.svelte"
    import Chat from "./Chat/Chat.svelte"
    import Cookies from "js-cookie"
    export let idUser
    var url_string =window.location.href
    var url = new URL(url_string);
    var messegeId = url.searchParams.get("messegeId")
  
    // console.log({idUser})
    let friend = {}
    onMount(async()=> {
        if(!messegeId) return;
        await fetch(`http://localhost:4000/profile/${messegeId}`,{
            method: "GET",
            headers: {
                    "Content-Type": "application/json",
                },
        }).then((res) => res.json())
        .then((data) => {
            friend = data
            console.log({friend})
        })
    })
    let messeges = [] 
    onMount( async()=> {
        setInterval(async()=>{
            if(!messegeId) return;
            await fetch(`http://localhost:4000/messeges/${messegeId}`,{
                method: "GET",
                headers: {
                        "Content-Type": "application/json",
                    },
            }).then((res) => res.json())
            .then((data) => {
                messeges = data.messeges
                console.log(messeges)
            })
        },1000)
    })
    let message
    function sendMessege (e) {
        e.preventDefault();
        fetch("http://localhost:4000/messeges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("token")
            },
            body: JSON.stringify({
                friend: messegeId, // id bạn
                user: idUser, // Id mình
                content: message // message
            })
        }).then((res)=> res.json())
        .then(data => {
            message = ""
            console.log(data)
        })      
    }
</script>
    <div id="chat_fr">
        <div id="fr">
            <img src="{friend.avatar}" alt="avatar">
            <div id="nam">
                <h5>{friend.first_name+" "+friend.last_name}</h5>
            </div>
        </div>
        <div id="cnt_list">
            {#each messeges as mess}
                {#if mess.user._id == friend._id}
                    <!-- Trái -->
                    <Chat user= "" friend= {mess}/> 
                {:else}
                <!-- Phải -->
                    <Chat user= {mess} friend= ""/>
                {/if}
            {/each}
        </div>
        <div id="send_mess">
            <div id="input">
                <Input type="text" placeholder="Aa" bind:value={message}/>
            </div>
            <div id="iconSend" on:click="{sendMessege}">
                <img src="../../../public/iconSendMessage.png" alt="iconSend">
            </div>
            
            
        </div>
        

    </div>
<style>
    #chat_fr {
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;        
        position: relative;
        padding-bottom: 48px;
        
    }
    #fr {
        display: flex;
        height: 80px;
        /* border-bottom: 1px solid slategrey; */
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    #fr img {
        width: 50px;
        height: 50px;
        margin: 15px 18px;
        border-radius: 100%;
    }
    #fr #nam {
        margin: auto 0px;
    }
    #cnt_list {
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        height: 0px;
        min-height: 100%;
        margin-top: 10px;
        overflow-y: scroll;
        margin-bottom: 100px;
        padding-bottom: 100px;
    }
    #send_mess {
        display: flex;
        position: absolute;
        bottom: 0px;
        right: 0px;
        left: 0px;
        background-color: white;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
        
        
       
        float:left;
        
    }
    #input {
       
        height: 5%;
        flex-grow: 1;
    }
    #input:hover {
        padding: 2px;  
    }
    #iconSend {
        width: 5%;
    }
    #iconSend img {
        
        border-radius: 50%;
    }
    #iconSend img:hover {
        width: 90%;
    }


</style>