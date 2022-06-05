<script>
  import Input from './ui/Input.svelte'
  import Button from './ui/ButtonLogin.svelte'
  import { useNavigate } from "svelte-navigator"
  import SelectBox from './ui/SelectBox.svelte'
  const navigate = useNavigate()

  let user = {
    email: "",
    password: "",
    profile: 
    {
      first_name: "",
      last_name: "",
      gmail: "",
      birthday: "",
      gender: "",
      avatar: "facebook-3.svg"
    },
    posts: []
  }
  let day
  let mouth
  let year
  $: {
        function getBirth(day,mouth,year) {
        return `${day}/${mouth}/${year}`
        } 
        user.profile.birthday = getBirth(day,mouth,year)
        console.log(user.profile.birthday)
      }
  let pass2 = ""
  let errorMesss =" "
  function handleClick() {    
    if(user.password != pass2){
      errorMesss = "Mat khau khong khop"
      console.log("this pas",user.password,user.profile.last_name,user.email)
      alert(errorMesss)
    }
    else{
      singUp()
      
    }
  }
  function singUp() {
    // e.preventDefault();
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate('/login')
      });
  }
  let check_enter_pass = false
  const enter_pass = () => {
      check_enter_pass = true    
  }

  
</script>

<div class = "full">  
  <div class="content_dk">
    <div class="dk">
      <h1>Đăng ký</h1>
    </div>
    <div id="text_dk">
      <div class="ct1">
        <Input type="text" bind:value={user.profile.last_name} placeholder="Họ"/>
        <Input type="text" bind:value={user.profile.first_name} placeholder="Tên"/>
      </div>
      <div class="ct">
          <Input type="email" bind:value={user.email} placeholder="Email"/>
      </div>
      <div class="ct" on:click="{enter_pass}">
        <Input type="password" bind:value={user.password} placeholder="Password"/>
      </div>
      {#if check_enter_pass}
        <div class="ct">      
          <Input type="password" bind:value={pass2} placeholder="Password2"/>
        </div>  
      {/if}
      
      <div id = "birth">
        <div id="date">
          <SelectBox start = {1} end = {31} bind:value={day}/>
        </div>
        <div >
          <SelectBox start = {1} end = {12} bind:value={mouth}/>
        </div>
        <div>
          <SelectBox start = {1905} end = {2022} bind:value={year}/>
        </div>
      </div>  
      <div class ="gender">
        <label id = "gender-x">
          <input type=radio bind:group={user.profile.gender} name="scoops" value="Nữ">
          Nữ
        </label>     
        <label id = "gender-x">
          <input type=radio bind:group={user.profile.gender} name="scoops" value="Nam">
          Nam
        </label>
        <label id = "gender-x">
          <input type=radio bind:group={user.profile.gender} name="scoops" value="Tùy chỉnh">
          Tùy chọn
        </label>
      </div>
    </div>
    <div style="margin-bottom: 1rem;">
      <Button name = "Đăng ký" onclick= {handleClick}/>
    </div>
  </div>
</div>
<style>
  .full {
    display: flex;
    flex-direction: column;
    width: 100vw; /* Kích thược rộng hết trình duyệt */
    height: 100vh; /* Cho chiều cao full màn hình */
    background-color: #e9d8f4;
    
  }
  .content_dk {
    width: 50%; /* kích thước chiều rộng của vùng nội dung */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display:flex;
    border-radius: 50px;
    padding: auto;
    background-color: rgba(248, 241, 246, 0.918);
    margin: 50px auto; 
    border: 2px solid rgba(179, 172, 164, 0.342);  
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); 
  }
  .dk {
    color: rgb(243, 12, 12);
    font-size: 25px;
    line-height: 30px;
    margin-top: 1rem;
    margin-bottom: 2rem;
    height: 20px;
  }
  #text_dk {
    border-radius: 50px;
    background-color: white;
    width: 90%;
    border-radius: 2rem;
    margin: auto 20px;
    border: 2px solid rgba(179, 172, 164, 0.342);  
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); 
  }
  .ct{
    border: 1px;
    border-radius: 5rem;
    padding: 10px;
    background: #fff;    
  }
  .ct1 {
    border: 1px;
    border-radius: 5rem;
    padding: 10px;
    background: #fff;  
    display: flex;
  }
  #birth {
    display: flex;
  }

  .gender {
    display: flex;
  }

  .gender #gender-x {
    /* width: 100%; */
    width: 100px;
    height: 30px;
    vertical-align: top;
    margin: 5px 15px;
    border: 2px solid rgba(177, 167, 167, 0.637);
    padding: 2px 5px;
    border-radius: 2rem;
    font-size: 15px;
  }
</style>
