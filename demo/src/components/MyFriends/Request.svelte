<script>
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import MutualsList from "./Mutual/mutualsList.svelte";
    export let friend
    export let id
    function clickRequest() {
        fetch(`http://localhost:4000/friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, friend: friend._id}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                addmyfriend();
            });
    }
    function addmyfriend() {
        fetch(`http://localhost:4000/myfriend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, friend: friend._id}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    }

    function clickdelfriend() {
        let idea = confirm("Bạn có chắc chắn muốn xóa?")
        if(idea){
            fetch(`http://localhost:4000/friend/request/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, friend: friend._id}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
        }
        
    }
</script>

<div class="fr">
    <div class="ava-fr">
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
        <div class="confirm"  on:click="{clickRequest}">
            <span>Xác nhận</span>
        </div>
        <div class="del" on:click="{clickdelfriend}">
            <span >Xóa</span>
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
        margin: 10px 10px 0px;
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
        margin: 5px 0px 0px 3px;
        text-align: center;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        font-size: 15px;
        font-weight: bold;
    }
    .btn-fr .confirm{
        color: whitesmoke;
        background-color: #1B74E4;
    }
    .btn-fr .confirm:hover {
        background-color: #3889ecc9;
        color: black;
    }
    .btn-fr .del {
        background-color: #E4E6EB;
    }
    .btn-fr .del:hover {
        background-color: #7a7b7ee7;
        color: whitesmoke;
    }
</style>