<script>
    import IconFunctionPost from "./IconFunctionPost.svelte";
    import CommentPost from "./CommentPost.svelte";
    import {db} from "../../firebase"
    import Cookies from "js-cookie";
    import { onMount } from "svelte";
    let userEmail = Cookies.get("email");
    export let post
    export let user = post.user
    let like = 0
    let sluongLike = []
    let userData
    // get data user 
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
            });
    });
    // onMount(()=> {
    //     if(!post) return;
    //     setInterval(()=>{
    //         fetch(`http://localhost:4000/post/${post._id}/like`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }).then((res) => res.json())
    //             .then((data) => {
    //                 sluongLike = data
    //         });
    //     },1000)
    // });
    const incrementCount = () => {
        let isLike = post?.like.includes(user?._id)
        if(!isLike) {
            likePost(post,userData)
        }
        else {
            disLikePost(post,userData)
        }
    }
    function disLikePost (post, user) {
        fetch(`http://localhost:4000/post/dislike`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            post: post._id,
            user: user._id
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
    }
    function likePost (post, user) {
        // e.preventDefault();
        fetch(`http://localhost:4000/post/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            post: post._id,
            user: user._id
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
    }
    let check_click_comment = 0
    let comment_click = false
    const click_cmt = () => {
        if(check_click_comment%2==0){
            comment_click = true
            check_click_comment += 1
        }
        else{
            comment_click = false
            check_click_comment += 1
        }
        
    }
    $:{ console.log(comment_click)}
    let check_ellipsis = false
    let num_ellipsis = 0
    function click_ellipsis() {
        if(num_ellipsis%2==0){
            check_ellipsis = true
            num_ellipsis += 1
        }
        else{
            check_ellipsis = false
            num_ellipsis += 1
        }
    }
    $:{ console.log(check_ellipsis)}
  
    const deletePost = ()=> {
        let idea = confirm("Bạn có chắc chắn muốn xóa?")
        if(idea){
            fetch(`http://localhost:4000/delete/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: post._id}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                location.reload();
            });
        }
    }
    $: {console.log("thiss posst",post)}
</script>

<div id="post">
    <div id = "header-post">
        <div id="ava">
            <img src="{user?.avatar}" alt="avatar" width="40px" height="40px" style="border-radius: 2rem;">
        </div>
        <div id="nam">
            <h4>{user?.first_name} {user?.last_name}</h4>
            <p style="font-size: 10px; margin: -5px 2px">{new Date (Date.parse(post.createdAt)).toLocaleString()}</p>
        </div>
        <div id="ell" on:click="{click_ellipsis}">
            <img class = "ellipsis" src="iconEllipsis.svg" alt="Tùy chỉnh" width="30px" height="30px">
            {#if check_ellipsis}
                <div id="ellipsis_and_dellete_post">
                    <IconFunctionPost icon = "iconFix.svg" text = "Chỉnh sửa bài viết" handle=""/>
                    <IconFunctionPost icon = "iconTrashCan.svg" text = "Xóa bài viết" handle={deletePost}/>
                </div>
            {/if} 
        </div>
    </div>
    <hr  width="100%" />
    <div id="content-post">
        <div id="p-text">
            <span>{post?.content}</span>
        </div>
        <div id = "p-image">
            {#if post.image}
            <img src="{post.image}" alt="ảnh minh họa" style="width:100%;  height: 100%; object-fit: cover;">
            {/if}
        </div>
    </div>
    {#if post?.like.length > 0}
        <div id="number_of_people_likes" style="margin: 10px 0 -5px; display: flex;">
            <img src="iconHeart.svg" alt="" style="border-radius: 2rem; margin: 0 5px 0 0" width="25px" height="25px">
            <span>{post?.like.length}</span>
        </div>
    {/if} 
    <hr  width="100%"/>
    <div id="footer-post">
        <IconFunctionPost icon = "iconLike.svg" text = "Thích" handle={incrementCount}/>
        <IconFunctionPost icon = "iconComment.svg" text = "Bình luận" handle={click_cmt}/>
        <IconFunctionPost icon = "iconShare.svg" text = "Chia sẻ" handle = ""/>
    </div>
    {#if comment_click}
        <CommentPost idPost ={post._id}/>
    {/if}
</div>

<style>
    #header-post {
        display: flex;
        height: 45px;
        width: 42vw;
        margin-top: 5px;
        margin-left: 5px;
        margin-bottom: -5px;
        
    }
    #ava {
        width: 4vw;
    }
    #nam {
        width: 36vw;
    }
    #ell {
        width: 3vw;
        margin-right: 5px;
        
    }
    #ell .ellipsis:hover{
        background-color: rgba(157, 177, 177, 0.856);

    }
    #post {
        background-color: rgba(248, 241, 246, 0.918);
        width: 42vw;
        border: 2px solid rgba(179, 172, 164, 0.342);
        border-radius: 1rem;
        display:table-row;
        display:table-cell;
        margin-bottom: 10px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    #content-post {
        /* height: 38vh; */
        display: flex;
        flex-direction: column;
    }
    #footer-post {
        display: flex;
        margin-top: -11px;
    }

    #ellipsis_and_dellete_post {
        background-color: whitesmoke;
        position:absolute;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 2px solid rgba(179, 172, 164, 0.342);
    }
</style>