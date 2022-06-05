<script>
    import IconFunctionPost from "../ui/IconFunctionPost.svelte";
    import PersonalInformation from "./PersonalInformation.svelte";
    import ButtonText from "./ButtonText.svelte";
    import {db} from "../../firebase"
    export let userData

    let list_project = []


    // db.collection('user').doc(userData.gmail).collection('project').onSnapshot(snapshot => {
    //     let pros = []
    //     snapshot.docs.map(doc=>{
    //         pros.push({...doc.data(),id: doc.id})     
    //     })
    //     list_project = [...pros]
    //     console.log("list project", list_project)
    // })

    
   

</script>


<div id="project">
    <div id="introduce">
        <h4 style="margin-left: 5px;">Giới thiệu</h4>
        <div style="margin-left: 5px; margin-bottom: 5px">            
            <div style="display: flex;">
                {#if userData.birthday} 
                    <span style="margin: auto 0;">
                        Ngày sinh nhật: {new Date (Date.parse(userData.birthday)).toLocaleString().split(",")[1]}
                    </span>
                    <ButtonText data="" icon="iconFix.svg" userID="{userData.gmail}" text="" talk="Ngày sinh nhật"/>
                    
                    <!-- <button>chỉnh sửa</button> -->
                {:else}
                    <span style="margin: auto 0;">
                        Ngày sinh nhật: 
                    </span>
                    <ButtonText data="" icon="iconPlus.svg" userID="{userData.gmail}" text="" talk="Ngày sinh nhật"/>
                {/if} 
            </div>
            <div>
                <div id="list_proj">
                    <h5>Thông tin cá nhân</h5>
                    {#each list_project as proj}
                        <PersonalInformation proj = "{proj}" userID = "{userData.gmail}"/>
                    {/each}
                </div>
                <ButtonText data="" icon="iconPlus.svg" userID="{userData.gmail}" text="Thêm thông tin" talk="Nhập thông tin cá nhân"/>
            </div>      
        </div>
    </div>
    <div id="imageUser">
        
    </div>
 </div>
<style>
   #project {
    width: 23vw;
    /* background-color: rgba(248, 241, 246, 0.918);
    border: 2px solid rgba(179, 172, 164, 0.342);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 1rem; */
    margin-right: 10px;
    }
    #project #introduce {
        width: 100%;
        background-color: rgba(248, 241, 246, 0.918);
        border: 2px solid rgba(179, 172, 164, 0.342);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border-radius: 1rem;
        
    } 
</style>
  