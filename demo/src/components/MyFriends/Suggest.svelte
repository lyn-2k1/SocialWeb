<script>
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import MutualsList from "./Mutual/mutualsList.svelte";
    export let friend
    export let id
    function clickRequests() {
        fetch(`http://localhost:4000/friend/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, friend: friend._id}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                addsuggest();
            });
    }

    function addsuggest() {
        fetch(`http://localhost:4000/friend/suggest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, friend: friend._id}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log("thành công")
            });
    }

</script>

<div class="fr">
    <div class="ava-fr" on:click="{clickRequests}">
        <img src="{friend.avatar}" alt="ảnh">
    </div>
    <div class="nam-fr">
        <div class="link-fr">
            <div>
                <a href="/">
                    {friend.first_name+" "+friend.last_name}
                </a>
            </div>        
            <MutualsList friend_id="{friend._id}"/>
        </div>
        
        
    </div>
    <div class="btn-fr">
        <div class="confirm" on:click="{clickRequests}">
            <span>Thêm bạn bè</span>
        </div>
        <div class="del">
            <span >Xóa, gỡ bỏ</span>
        </div>
    </div>
</div>

<style>
    .fr {
        flex-direction: column;
        width: 205px;
        height: 350px;
        border: 1px solid rgba(107, 106, 106, 0.39); 
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        background: rgba(245, 242, 242, 0.918);
        border-radius: 8px;
        margin: 10px 0px 0px 10px;
    }
    .ava-fr {
        width: 205px;
        height: 150px;
    }
    .ava-fr img{
        width: 204px;
        height: 200px;
        /* margin: 23px 15px; */
        border-radius: 8px;
    }
    /* .nam-fr {
        width: 198px;
        height: 50px;
        
    } */
    .nam-fr .link-fr {
        height: 50px;
        width: 204px;
        margin-top: 55px;
        text-align: center;
    }
    /* .nam-fr .link-fr span {
        font-size: smaller;
        color: #777779ab;
    } */
    .btn-fr {
        width: 204px;
        height: 100px;
    }

    .btn-fr div {
        width: 190px;
        height: 40px;
        border: 1px solid rgba(90, 89, 89, 0.377);
        border-radius: 8px;
        margin: 5px 0px 0px 6px;
        text-align: center;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        font-size: 15px;
        font-weight: bold;
    }
    .btn-fr .confirm{
        color: rgba(63, 164, 223, 0.938);
        background-color: #c6ced8de;
    }
    .btn-fr .confirm:hover {
        background-color: #7a7b7ee7;
    }
    .btn-fr .del {
        background-color: #E4E6EB;
    }
    .btn-fr .del:hover {
        background-color: #7a7b7ee7;
    }
</style>