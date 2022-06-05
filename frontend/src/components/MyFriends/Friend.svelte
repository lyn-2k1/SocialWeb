<script>
    export let friend
    
    import MutualsList from "./Mutual/mutualsList.svelte";
    
</script>

<div class="fr">
    <div class="ava-fr">
        <img src="{friend.avatar}" alt="ảnh">
    </div>
    <div class="nam-fr">
        <div class="link-fr">
            <div>
                <a href="/">
                    {friend.first_name+" "+ friend.last_name}
                 </a>
            </div>
            <MutualsList friend_id="{friend._id}"/>
        </div>
    </div>
    <div class="cus-fr">
        <div>
            <img class = "ellipsis" src="iconEllipsis.svg" alt="Tùy chỉnh" width="30px" height="30px">
        </div>
    </div>
</div>

<style>
    .fr {
        /* flex-direction: column; */
        display: flex;
        width: 450px;
        height: 151px;
        border: 1px solid rgba(107, 106, 106, 0.39); 
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        background: rgba(245, 242, 242, 0.918);
        border-radius: 8px;
        margin: 10px 10px 0px;
    }
    .ava-fr {
        width: 130px;
        height: 150px;
    }
    .ava-fr img{
        width: 100px;
        height: 100px;
        margin: 23px 15px;
        border-radius: 8px;
    }
    .nam-fr {
        width: 260px;
        height: 150px;
    }
    .nam-fr .link-fr {
        height: 50px;
        width: 240px;
        margin-top: 55px;
    }
    /* .nam-fr .link-fr .tooltip {
        position: relative;
    }
    .nam-fr .link-fr span {
        font-size: smaller;
        color: #777779ab;
    } */
    .cus-fr {
        width: 60px;
        height: 150px;
    }
    .cus-fr div {
        margin-top: 55px;
        margin-left: 15px;
    }

    .cus-fr div img:hover {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border-radius: 10px;
    }

</style>