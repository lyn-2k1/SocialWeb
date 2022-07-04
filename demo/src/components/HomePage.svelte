<script>
    import {db,auth} from "../firebase"
    import Header from "./HeaderHome/Header.svelte";
    import MenuFunction from "./ContentHome/MenuFunction.svelte";
    import Post from "./ui/Post.svelte";
    import CreatePost from "./ui/CreatePost.svelte"
    import { onMount } from "svelte";
    // import { collectionData } from 'rxfire/firestore';
    // import { startWith } from 'rxjs/operators';
    import { authState } from 'rxfire/auth';
    import Cookies from "js-cookie";

    // let userEmail = Cookies.get("email");
    // let user;

    let userData = {}
    let postsUser = []

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
    // auth.onAuthStateChanged(u=>{
    //     if(u){
    //         user = u
    //         console.log(u,user)           
    //     }
    // })
    onMount(()=> {
        setInterval(()=>{
            fetch("http://localhost:4000/post", {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            }).then((res) => res.json())
                .then((data) => {
                    postsUser = data.reverse()
            });
        },1000)
    });

</script>
<div id="home-page">
    <!-- <h1> home </h1> -->
   
     <Header user="{userData}"/>
     <div id="contentHome">
         <MenuFunction/>
         <div id = "posts">
             <CreatePost user="{userData}"/>
             {#each postsUser as post}
                 <Post post="{post}"/>    
             {/each}
         </div>
        <div id="friend-onl">

         </div>
     </div>
</div>

<style>
    #home-page {
        background-color: #e9d8f4;        
    }
    #contentHome {
        display: flex;
    }
    #contentHome #posts {
        width: 60vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top ;
        margin: 10px auto;
        
    }
    #contentHome #friend-onl {
        width: 20vw;
    }
</style>
