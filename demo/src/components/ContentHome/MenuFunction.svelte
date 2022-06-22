<script>
    import { useNavigate } from "svelte-navigator"
    import IconText from "../ui/IconText.svelte"
    
    const navigate = useNavigate();
</script>

<div id="content-Menu">
    <div on:click="{() => navigate('/project')}">
        <IconText icon="iconAccount.svg" text="Tài khoản"/>
    </div> 
    <div  on:click="{() => navigate('/friend')}">
        <IconText icon="iconFriend.svg" text="Bạn bè"/>
    </div>   
    <IconText icon="iconGroup.svg" text="Nhóm"/>
    <IconText icon="iconYoutube.svg" text="Watch"/>
    <IconText icon="iconGame.svg" text="Chơi Game"/>
    <IconText icon="iconMessege.svg" text="Messege"/>
    <IconText icon="iconWeather.svg" text="Thời tiết"/>
</div>

<style>
    #content-Menu {
        background-color: #e9d8f4;
        padding: 20px;
        display: flex;
        flex-direction: column;
        width: 20vw;
        height: 88vh;
        /* overflow-y:hidden; */
        position: sticky;
        top: 65px;
    }
    #content-Menu:hover {
        overflow-y : scroll;
    }
</style>