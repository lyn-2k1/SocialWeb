<script>
    import { useNavigate } from "svelte-navigator"
    import IconText from "../ui/IconText.svelte"
    const navigate = useNavigate();
</script>

<div id="content-Menu">
    <h3>Bạn bè</h3>
    <div on:click="{() => navigate('/friend')}">
        <IconText icon="./Friend/friends.png" text="Tất cả bạn bè"/>
    </div> 
    <div on:click="{() => navigate('/requestsFriend')}">
        <IconText icon="./Friend/add-friend.png" text="Lời mời kết bạn" icon1="iconArrowRight.svg"/>
    </div> 
    <div  on:click="{() => navigate('/suggestsFriend')}">
        <IconText icon="./Friend/notification.png" text="Gợi ý" icon1="iconArrowRight.svg"/>
    </div>   
    <div  on:click="{() => navigate('/friend')}">
        <IconText icon="./Friend/birthday-cake.png" text="Sinh nhật" icon1="iconArrowRight.svg"/>
    </div>   
</div>

<style>
    #content-Menu {
        background-color: #fdfafff3;
        padding: 20px;
        display: flex;
        flex-direction: column;
        width: 20vw;
        height: 88vh;
        /* overflow-y:hidden; */
        position: sticky;
        top: 65px;
    }

</style>