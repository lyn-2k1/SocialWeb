<script>
    import { db, storage,auth } from "../../firebase";
    import IconFunctionPost from "../ui/IconFunctionPost.svelte";
    import Input from "../ui/Input.svelte"
    let check_click_button = false
    let check_send = true
    const click_button = () => {
        check_click_button = true
        check_send= true
    }

    export let userID
    export let data
    export let talk
    export let icon
    export let text
    
    $: {console.log("userID",userID)}
    function setBirth(e) {
        e.preventDefault()
        db.collection('user').doc(userID).update({
            birthday: data
        })
        .then(() => {
            alert("Thay đổi ngày sinh thành công")
            data=""
            check_send = false
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        })
    }
    function sendProject(e) {
        e.preventDefault();
        db.collection('user').doc(userID).collection('project').add({
            text: data
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert("Thêm thông tin thành công")
            data = ""
            check_send= false
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

</script>

<div id="btn_text">
    {#if talk=="Ngày sinh nhật"}
        {#if check_click_button && check_send}
            <form action="" on:submit="{setBirth}">
                <Input type="text" bind:value={data} placeholder="{talk}"/>
                <button hidden type="submit">Submit</button>
            </form>
        {:else}
            <IconFunctionPost icon="{icon}" text="{text}" handle="{click_button}"/>
        {/if}
    {:else}
        {#if check_click_button && check_send}
            <form action="" on:submit="{sendProject}">
                <Input type="text" bind:value={data} placeholder="{talk}"/>
                <button hidden type="submit">Submit</button>
            </form>
        {:else}
            <IconFunctionPost icon="{icon}" text="{text}" handle="{click_button}"/>
        {/if}  
    {/if}
    
</div>



