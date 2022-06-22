<script>
    import IconFunctionPost from "../ui/IconFunctionPost.svelte";
    import Input from "../ui/Input.svelte";
    import {db} from "../../firebase"
    export let proj
    export let userID
    let data
    let check_ellipsis = false
    let num_ellipsis = 0
    let check_send = true
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
    const deleteProject = () => {
        let idea = confirm("Bạn có chắc chắn muốn xóa?")
        if(idea){
            db.collection('user').doc(userID).collection('project').doc(proj.id).delete()
            .then(() => {
            console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }        
    } 
    let fix = true
    const checkFix = () => {
        fix = false
        check_send = false
        data = proj.text
    } 
    function updateProject(e) {
        e.preventDefault()
        db.collection('user').doc(userID).collection('project').doc(proj.id).update({
            text: data
        })
        .then(() => {
            alert("Thay đổi thông tin thành công")
            data=""
            check_send = true
            fix = true
            check_ellipsis = false
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
    }
</script>



<div id="proj">
    {#if fix && check_send}
        <div id="txt">
            <h6>{proj.text}</h6>
        </div>
        <div id="ell" on:click="{click_ellipsis}">
            <img class = "ellipsis" src="iconEllipsis.svg" alt="Tùy chỉnh" width="25px" height="25px" style="margin:auto">
            {#if check_ellipsis}
                <div id="ellipsis_and_dellete_proj">
                    <IconFunctionPost icon = "iconFix.svg" text = "Chỉnh sửa thông tin" handle="{checkFix}"/>
                    <IconFunctionPost icon = "iconTrashCan.svg" text = "Xóa thông tin" handle={deleteProject}/>
                </div>
            {/if} 
        </div>
    {:else}
        <form action="" on:submit="{updateProject}">
            <Input type='text' placeholder="txtproj" bind:value={data}/>
            <button hidden type="submit">Submit</button>
        </form>
    {/if}
    
    
    <!-- <button on:click="{check}"></button> -->
</div>

<style>
    #proj {
        display: flex;
        width: 20vw;
        background-color: rgba(226, 212, 210, 0.904);
        margin-bottom: 2px;
        border: 2px solid rgba(179, 172, 164, 0.342);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border-radius: 1px;
    }

    #proj #txt {
        width: 17vw;
    }
    #proj #ell {
        width: 3vw;
        margin: auto;
        border-radius: 25%;
    }
    #proj #ell:hover {
        background-color: rgba(157, 177, 177, 0.856);
    }
    #ellipsis_and_dellete_proj {
        background-color: whitesmoke;
        position:absolute;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 2px solid rgba(179, 172, 164, 0.342);
    }

</style>