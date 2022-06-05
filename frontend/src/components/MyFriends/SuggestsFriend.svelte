<script>
    import Header from "../HeaderHome/Header.svelte";
    import MenuFunctionFriends from "./MenuFunctionFriends.svelte";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import Request from "./Request.svelte";
    import Suggest from "./Suggest.svelte";
import { idToken, user } from "rxfire/auth";
    // let user;
    let userData = {}
    let Suggestsfriend = []

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
            fetch(`http://localhost:4000/friend/suggest`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            })
            .then((res)=> res.json())
            .then((data) => {
                Suggestsfriend = data
            })
        },1000)
    })

    // auth.onAuthStateChanged(u=>{
    //     if(u){
    //         user = u
    //         console.log(u,user)           
    //     }
    // })
    
    // // auth.onAuthStateChanged(function(user) {
    // //     if (user) {
    // //             db.collection("user").doc(user.email).get()
    // //             .then((doc) => {
    // //                 if (doc.exists) {                       
    // //                     // console.log("Document data:", doc.data());
    // //                     setUserData(doc.data())

    // //                 } else {
    // //                     // doc.data() will be undefined in this case
    // //                     console.log("No such document!");
    // //                 }
    // //             })
    // //             .catch((error) => {
    // //                 console.log("Error getting document:", error);
    // //             });
    // //     } else {
    // //         // No user is signed in.
    // //     }
    // // });
    // // function setUserData(data){
    // //     userData = data
    // //     console.log("userData",userData)
    // // }
    

</script>
<div id="home-page">
    <!-- <h1> home </h1> -->
     <Header user="{userData}"/>
        <div id="contentHome">
         <MenuFunctionFriends/>
        <div id="friend-req">
            {#each Suggestsfriend as suggest}
            <Suggest friend="{suggest}" id="{userData._id}"/>
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
    #contentHome #friend-req {
        width: 80vw;
        display: grid;
        grid-auto-flow: row dense;
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
</style>