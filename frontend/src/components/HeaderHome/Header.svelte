<script>
    import FindHome from "./FindHome.svelte";
    import IconFunction from "./IconFunction.svelte";
    import { useNavigate } from "svelte-navigator"
    import Cookies from "js-cookie";
import { apiUrl } from "../../config/config";
    export let user
    const navigate = useNavigate();

    const directionalProject = () => navigate('/project')  

</script>
<div id = "header">

    <!-- Header left -->
    <div class="header-left">
            <img class="ic" src="facebook-3.svg" alt="icon facebook" width="40px" height="40px" style="margin-right: 5px;">      
            <FindHome/>
    </div>

    <!-- Header center -->
    <div>
        <div id = "list-icon">
            <IconFunction path="home" icon = "iconHome.svg" distance=2/>
            <IconFunction path="friend" icon = "iconFriend.svg" distance=2/>
            <IconFunction path="group" icon = "iconGroup.svg" distance=2/>
            <IconFunction path="game" icon = "iconGame.svg" distance=2/>
        </div>
    </div>

    <!-- Header right -->
    <div>
        <div id = "setting-end-control">
            <div id="account" on:click="{directionalProject}">
                <IconFunction path="project" icon = "{user?.avatar}" distance=0.2 name="avatar"/>
                <p style="margin:auto">{user?.first_name}</p>
            </div>      
            <IconFunction path="messege" icon = "iconMessege.svg" distance=0.2/>
            <IconFunction path="notification" icon = "iconNotification.svg" distance=0.2/>
            <div on:click="{()=> Cookies.remove("token")}">
                <IconFunction path="/" icon = "iconLogout.svg" distance=0.2/>
            </div>           
        </div>
    </div>
</div>     
<style>
    #header {
        background-color: white;
        color: #58257b;
        text-align: center;
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 60px;
        width: 100vw;
        /* box-shadow: 10px 10px 8px #888888; */
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        /* sticky */
        position: sticky;
        top: 0;
    }
    .header-left{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 20vw;
    }
    #list-icon {
        display: flex;
        width: 60vw;
        list-style-type: none;
        align-items: center;
        justify-content: center;
    }
    #setting-end-control {
        display: flex;
        width: 20vw;
        list-style-type: none;
        align-items: center;
        justify-content: center;
    }
    #account{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #account:hover {
        background-color: rgba(157, 177, 177, 0.856);
    }
    
</style>