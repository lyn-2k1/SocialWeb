<script>
    import { db } from "../../firebase";
    import firebase from "firebase/app";
    import Input from "./Input.svelte";
    import { onMount } from "svelte";
    import Post from "./Post.svelte";
    import Cookies from "js-cookie";
    // export let user 
    export let idPost 
    let user
    let content = ""
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
                user = {...data}
            });
    });
    let list_comment = []
    onMount(() => {
        setInterval(()=>{
        fetch(`http://localhost:4000/post/${idPost}/comment`)
        .then((res) => res.json())
        .then((data) => {
            list_comment = data
            console.log(list_comment)
        });
        },2000)
    });
    function sendCommentPost(e) {
        e.preventDefault();
        fetch(`http://localhost:4000/post/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            post: idPost,
            user: user._id,
            content: content
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            content = ""
            // .push(data);
        });
    }
</script>

<hr width="100%">
<div id="comment">
    <form id="create_comment">
        <div id="ava">
            <img src="{user?.avatar}" alt="avatar" width="40px" height="40px" style="border-radius: 2rem;">
        </div>
        <div id="text">
            <Input type="text" bind:value={content} placeholder="Viết bình luận..."/>
        </div>
        <button hidden type="submit" on:click={sendCommentPost}>Submit</button>
    </form>
    <div id="list_comment">
        {#each list_comment as cmt}
            <div id="cmt">
                <div id="ava_cmt">
                    <img src="{cmt.user.avatar}" alt="avatar" width="40px" height="40px" style="border-radius: 2rem;">
                </div>
                <div id="content_cmt">
                    <h6 style="padding: 0 5px ;">{cmt.user.first_name+" "+cmt.user.last_name}</h6>
                    <span style="padding: 0 5px ;">{cmt.content}</span>
                </div>
            </div>
	    {/each}
    </div>
</div>


<style>
    #list_comment {
        display: flex;
        flex-direction: column;
        max-height: 300px;
        overflow-y: scroll;
    }
    #create_comment {
        display: flex;
        margin-bottom: 1rem;
        margin-left: 2px;
    }
    #create_comment #text {
        margin-left: 5px;
        width: 100%;
    }
    #cmt {
        display: flex;
        margin-left: 2px;
        margin-bottom: 1rem;
    }
    #list_comment #cmt #content_cmt {
        background-color: #e9d8f4;
        margin-left: 5px;
        border-radius: 0.75rem;
        width: 25vw;
        
    }


</style>