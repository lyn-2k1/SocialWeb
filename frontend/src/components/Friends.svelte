<script>
    import {db,auth} from "../firebase"
    import Header from "./HeaderHome/Header.svelte";
    import MenuFunctionFriends from "./MyFriends/MenuFunctionFriends.svelte";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import Friend from "./MyFriends/Friend.svelte";
    // let user;
    let userData = {}
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
            });
    });

    onMount(() => {
        setInterval(()=>{
            fetch(`http://localhost:4000/friend`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
            .then((res)=> res.json())
            .then((data) => {
                friends = data
            })
        },1000)
    })

</script>
<div id="home-page">
    <!-- <h1> home </h1> -->
   
     <Header user="{userData}"/>
   
     <div id="contentHome">
         <MenuFunctionFriends/>
        <div id="friend-onl">
            {#each friends as friend}
                <Friend friend="{friend}" />
            {/each}
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
    #contentHome #friend-onl {
        width: 70vw;
        margin: 10px auto 0px;
        display: grid;
        grid-auto-flow: row dense;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
</style>
