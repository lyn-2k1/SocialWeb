<script>
    import firebase from "firebase/app";
    import { async } from "rxjs";
    import { db, storage,auth} from "../../firebase";
    import IconText from "./IconText.svelte";
    import Input from "./Input.svelte";
    import Cookies from "js-cookie";
    import { apiUrl } from "../../config/config";
    import { onMount } from "svelte";
    let userEmail = Cookies.get("email");
    export let user
    let post = {
        content: "",
        image: "",
        likes: 0,
        comment: []
    } 

    let  postImage, fileinput;
    let fileUpload;
    const resetInput = ()=>{
        post.content = "";
        postImage = null;
        fileUpload=null;
    }
    const sendPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/profile/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.text()).then(body => {
          console.log("body", body)
        try {
            return JSON.parse(body);
        } catch {
            throw Error(body);
        }
    })
      .then((data) => {
        console.log(data);
        // .push(data);
        if(fileUpload[0]){
            sendAvatar(data._id)
        }
        else{
           
        }    
        // location.reload();
      }).catch(console.error);;
        post.content="";
    }

    
    function sendAvatar(id) {
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
            // Update 
            fetch(`http://localhost:4000/profile/post/${id}/image`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({filename: filename}),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    resetInput()
                });
        })
    }



    // const sendPost = async (e) => {
    //     e.preventDefault();
    //     const userServer = auth.currentUser;
    //     post.gmail = userServer.email
       
    //     db.collection('user').doc(userServer.email).collection('posts').add(post) // => image = ""
    //     .then(doc => {
    //         if(postImage) {
    //             // tạo task upload
    //             const uploadTask = storage
    //                                 .ref(`posts/${doc.id}`)
    //                                 .putString(postImage, "data_url");
    //             uploadTask.on(
    //                 "state_change",
    //                 null,
    //                 (error) => console.error(error),
    //                 () => {
    //                 //when upload complete
    //                  resetInput()
    //                 storage
    //                     .ref("posts")
    //                     .child(doc.id)
    //                     .getDownloadURL()
    //                     .then((url) => {
    //                         // Update image url
    //                         console.log("dataaaaa",url)
    //                         db.collection('user').doc(userServer.email).collection('posts').doc(doc.id).set(
    //                         {
    //                             image: url,
    //                         },
    //                         { merge: true }
    //                     );                      
    //                     });
    //                 }
    //             );
    //         }
    //         else{
    //             post.content = ""
    //         }
    //     })
    // }

	
	const onFileSelected =(e)=>{
        // let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
            postImage = e.target.result
        };
    }

</script>
<div id="create-post">
    <form  id = "input-text">
        <img width="40px" height="40px" style="border-radius: 2rem; margin:auto;" src="{user?.avatar}" alt="ảnh đại diện">
        <Input type='text' placeholder="{user?.first_name} ơi, bạn đang nghĩ gì thế?" bind:value={post.content}/>
        <button hidden type="submit" on:click={sendPost}>Submit</button>
    </form> 
    <hr  width="100%" />
    <!-- Xem truoc anh -->
    <div >
        {#if postImage}
            <img class="avatar" src="{postImage}" alt="d" />
        <!-- {:else}
        <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" />  -->
        {/if}
    </div>


    <!-- Footer -->
    <div id="input-img" >
        <div id="p-text" on:click={()=>{fileinput.click()}}  style = "width: 30vw">
            <IconText icon="iconImage.svg" text="ảnh/video"></IconText>
            <input style="display:none" type="file" bind:files={fileUpload} accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />
        </div>
        <div id="sub">
            <button id="bt1" on:click={sendPost}>Đăng</button>
        </div>
    </div>
    
</div>
<style>
    #input-text {
        display: flex;
        width: 99%;
        margin-top: 5px;
        margin-left: 5px;
        margin-bottom: -5px;
        
    }
    #create-post {
        background-color: rgba(248, 241, 246, 0.918);
        width: 42vw;
        border: 2px solid rgba(179, 172, 164, 0.342);
        border-radius: 1rem;
        display:table-row;
        display:table-cell;
        margin-bottom: 10px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    #input-img {
        display: flex;
        margin: 2px auto;
    }
    #input-img #sub #bt1 {
        height: 50px;
        align-items: center;
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        max-width: 250px;  
        font-size: 20px;
        color: rgba(44, 34, 34, 1); 
        background-color: #e4e6e9;
    }
</style>