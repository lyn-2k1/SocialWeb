<script>
  import Cookies from "js-cookie";
  import Input from "./ui/Input.svelte"
  import Button from "./ui/ButtonLogin.svelte"
  import { useNavigate } from "svelte-navigator"
  import HomePage from "./HomePage.svelte";
  import { authState } from 'rxfire/auth';
  import { auth } from '../firebase';
  import users from "../db/user.json"
  const navigate = useNavigate();


    
  let email = ""; // var, let
  let password = ""; 
  let check = false
  let user
  
  const handleNavigationHome =()=>{
    if(email == ""){
      alert("Email chưa đúng định dạng")
    }
    else if(password == ""){
      alert("Chưa điền Password")
    }
    else{
      handleLogin()
    }
      // chuyển hướng vể trang chủ 
  }
  function handleLogin() {
    // e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())        
      .then((data) => {
        if(data?.status=="fail"){
          console.log(data?.message)
          alert(data?.message)
          email = ""
          password = ""
          return;
        }        
        console.log(data);
        Cookies.set("email", data?.user?.email);
        Cookies.set("token", data?.token);
        window.location.href= "/home"
      })
    // navigate("/home")
    
  };
</script>

<div class="wrap">
  <!-- sử dụng 1 div bao hết nội dung web lại -->

  <div id="header">
    <!-- phần header -->
  </div>

  <div class="main">
    <!-- bao phần nội dung chính -->
    <div class="nav">
      <h1>WELCOME TO FACETIME</h1>
      <img src = "facebook-3.svg" width="50%" height="50%" alt="ảnh đang load" />
    </div>
    <div class="content">
      <div class="login">
        <div class="emailx">
          <Input type='email' placeholder="Email" bind:value={email}/>
        </div>
        <div class="emailx">
          <Input type='password' placeholder="Password" bind:value={password}/>
        </div>
      </div>
      <div class="buttonx">
        <a id = "qmk" href="/forgotPassword">Quên mật khẩu</a>
        <div>
          <Button name = "Đăng nhập" onclick = {handleNavigationHome}/>
        </div>   
        <div class="taoTaiKhoan">
          <Button name = "Tạo tài khoản mới" onclick =  {()=> {navigate("/register")}}/>
        </div>
      </div>
    </div> 
  </div>
  <!-- kết thúc nội dung chính -->

  <div id="footer">
    <!-- phần header -->
    
  </div>
</div>
  
<style>
  .wrap {
    display: flex;
    flex-direction: column;
    width: 100vw; /* Kích thược rộng hết trình duyệt */
    height: 100vh; /* Cho chiều cao full màn hình */
    background-color: #e9d8f4;
  }
  .emailx{
    border: 1px solid rgba(179, 172, 164, 0.342) ;
    border-radius: 5rem;
    padding: 10px;  
    margin: 3px;
    width: 300px;
    background-color:  #f5f6f7;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); 
  }
  

  /* id="header" thì phải định nghĩa bằng dấu # và tên id (header) */
  #header {
    width: 100%; /* kích thước chiều rộng trang web */
    height: 100%;
/*     background-color: yellow; */ /* tạo màu để dễ nhìn */
    
  }

  .main {
    display: flex;
    flex-grow: 1;
    width: 100%; /* kích thước chiều rộng trang web */
    background-color: #e9d8f4;
  }
  #qmk {
      margin: 2rem;
      padding: 12px;
      height: 100%;
      width: 100%;
      color: rgb(235, 30, 30);
  }

  /* chiều rộng của 2 vùng div "nav" và "content" phải bằng tổng độ rộng của trang */
  /* chú ý padding, border, margin có thể ảnh hưởng đến độ rộng của trang web */
  .nav {
    width: 40%; /* kích thước chiều rộng của vùng thanh bên */
  }

  .content {
    width: 60%; /* kích thước chiều rộng của vùng nội dung */
    display:flex;
    width: 500px;
    height:500px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(179, 172, 164, 0.342);  
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); 
    border-radius: 50px;
    padding: 10px 10px;
    background-color: rgba(248, 241, 246, 0.918); /* tạo màu để dễ nhìn */
  }

  #footer {
    height: 100%;
    width: 100%;
    
  }
</style>
