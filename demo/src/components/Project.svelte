<script>
    import {db,auth,storage} from "../firebase"
    import Header from "./HeaderHome/Header.svelte";
    import MenuFunction from "./ContentHome/MenuFunction.svelte";
    import Post from "./ui/Post.svelte";
    import CreatePost from "./ui/CreatePost.svelte"
    import { onMount } from "svelte";
    import { authState } from 'rxfire/auth';
    import Project from "./ProjectUser/Introduct.svelte";
    import Introduct from "./ProjectUser/Introduct.svelte";
    import IconText from "./ui/IconText.svelte"
    import Cookies from "js-cookie";
    import { window } from "rxjs";
    import { apiUrl } from "../config/config";
    let user;
    let avatar,fileinput
    let userData = {}
    let postsUser = []
    let check_send_avatar = true
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
    onMount(()=> {
        setInterval(()=>{
            fetch("http://localhost:4000/profile/post", {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + Cookies.get("token")
                }
            }).then((res) => res.json())
                .then((data) => {
                    postsUser = data
            });
        },1000)
    })
    console.log(postsUser)

    const onFileSelected =(e)=>{
        // let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
            avatar = e.target.result
        };
    }


    let fileUpload;
    const sendAvatar = (e) => {
        console.log(userData)
        e.preventDefault();
        const dataArray = new FormData();
        dataArray.append("files",fileUpload[0]);
        console.log("file uploadd",fileUpload[0])
        fetch(`http://localhost:4000/file`, {
        method: "POST",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: dataArray,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("file",data);

            // lấy tên file
            let filename = apiUrl+"/img/"+data.filename
            // Update vào profile người dùng
            fetch(`http://localhost:4000/profile/${userData._id}/avatar`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({filename: filename}),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    location.reload();
                });
                    
            })
    }

</script>
<div id="home-page">
    <!-- <h1> home </h1> -->
    <Header user="{userData}"/>
    <div id="content">
        <div id="uploadImage">
            {#if avatar && check_send_avatar}
                <div style="margin: auto;">
                    <img class="avatar" src="{avatar}" alt="d" style="border-radius:50%; margin: 10px auto;"/>    
                    <button id="bt1" on:click="{sendAvatar}" >Đăng</button>
                </div>     
            {:else}
                <div class="ava" on:click={()=>{fileinput.click()}}>
                <img style = "border-radius:50%;  margin: 10px auto;" src="{userData.avatar}" alt="ảnh đại diện">
                <input style="display:none" type="file" bind:files={fileUpload} accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />
                </div>
            {/if}
            
           
        </div>
        <div id="contentHome">
            <Introduct userData={userData}/>
            <div id = "posts">
                <CreatePost user="{userData}"/>
                {#each postsUser as post}
                    <Post post="{post}" user="{userData}"/>    
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    #home-page {
        background-color: #e9d8f4;  
        min-height: 100vh;      
    }
    #content #uploadImage{
        display: flex;
        width: 65vw;
        align-items: center;
        justify-content: top;
        margin: 10px auto;
        min-height: 30vh;
        background-color: rgba(185, 169, 169, 0.651);
        border: 2px solid rgba(179, 172, 164, 0.342);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    #content #uploadImage .ava{
        /* background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU'); */
        width: 12vw;
        min-height: 20vh;
        align-items: center;
        justify-content: top;
        margin: auto;
        border-radius:50%;
    }
    #contentHome {
        display: flex;
        width: 65vw;
        /* align-items: center; */
        justify-content: top ;
        margin: 10px auto;
    }

    #contentHome #posts {
        width: 42vw;
        display: flex;
        float: right;
        flex-direction: column;
    }
</style>