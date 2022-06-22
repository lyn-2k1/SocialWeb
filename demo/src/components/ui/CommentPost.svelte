<script>
    import { db } from "../../firebase";
    import firebase from "firebase/app";
    import Input from "./Input.svelte";
    import { onMount } from "svelte";
    export let userGmail 
    export let user 
    export let idPost 
    let commentPost = {
        user_name_comment: `${user.first_name} ${user.last_name}`,
        user_avatar_comment: user.avatar,
        comment: ""
    }
    // let commentPost = {
    //     user_name_comment: `${user?.first_name} ${user?.last_name}`|| "",
    //     user_avatar_comment: user?.avatar||"",
    //     comment: "",  
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // }

    let list_comment = []

    // db.collection('user').doc(user.gmail).collection('posts').doc(idPost).collection('comment').onSnapshot(snapshot => {
    //     let cmts = []
    //     snapshot.docs.map(doc=>{
    //         cmts.push({...doc.data(),id: doc.id})     
    //     })
    //     // console.log("cmtsUser",cmts)
    //     list_comment = [...cmts]
    //     console.log("list comment", list_comment)
    // })

    // function sendCommentPost(e) {
    //     e.preventDefault();
    //     console.log("gmail user",user.gmail)
    //     db.collection('user').doc(user.gmail).collection('posts').doc(idPost).collection('comment').add(commentPost)
    //     .then((docRef) => {
    //         console.log("Document written with ID: ", docRef.id);
    //         commentPost.comment = ""
    //     })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //     });
    // }
    onMount(() => {
        setInterval(()=>{
        fetch(`http://localhost:4000/post/${userGmail}/${idPost}/comment`)
        .then((res) => res.json())
        .then((data) => {
            list_comment = data
            console.log(list_comment)
        });
        },1000)
    });
    function sendCommentPost(e) {
        e.preventDefault();
        fetch(`http://localhost:4000/post/${userGmail}/${idPost}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: list_comment.length+1,...commentPost}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            commentPost.comment = ""
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
            <Input type="text" bind:value={commentPost.comment} placeholder="Viết bình luận..."/>
        </div>
        <button hidden type="submit" on:click={sendCommentPost}>Submit</button>
    </form>
    <div id="list_comment">
        {#each list_comment as cmt}
            <div id="cmt">
                <div id="ava_cmt">
                    <img src="{cmt.user_avatar_comment}" alt="avatar" width="40px" height="40px" style="border-radius: 2rem;">
                </div>
                <div id="content_cmt">
                    <h6 style="padding: 0 5px ;">{cmt.user_name_comment}</h6>
                    <span style="padding: 0 5px ;">{cmt.comment}</span>
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