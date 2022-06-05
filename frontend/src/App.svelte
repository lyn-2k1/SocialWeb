<script>
  import './assets/main.css' 
  import LoginPage from "./components/LoginPage.svelte"
  import RegisterPage from "./components/RegisterPage.svelte"
  import HomePage from "./components/HomePage.svelte"
  import ForgotPassword from './components/ForgotPassword.svelte';
  import { Router, Link, Route } from "svelte-navigator";
  import Project from './components/Project.svelte';
  import Friends from './components/Friends.svelte';
  import RequestsFriend from './components/MyFriends/RequestsFriend.svelte';
  import SuggestsFriend from './components/MyFriends/SuggestsFriend.svelte';
</script>


<Router>
<!-- <nav>
  <Link to="/">Home</Link> 
  <Link to="login">Login</Link>
  <Link to="register">Taotaikhoan</Link>  
</nav> -->
<div>
  <Route path="/">
    <!-- Nếu chưa đăng nhập thì hiên login -->
    <LoginPage/>          
    <!-- Nếu đăng nhập rồi hiện app -->
  </Route>
  <Route path="login">
    <!-- Nếu chưa đăng nhập thì hiên login -->
    <LoginPage/>          
    <!-- Nếu đăng nhập rồi hiện app -->   
  </Route>
  <Route path = "register">
    <RegisterPage/>
  </Route>
  <Route path = "home" >
    <HomePage/>
  </Route>
  <Route path = "project" >
    <Project/>
  </Route>
  <Route path = "forgotPasword">
    <ForgotPassword/>
  </Route>
  <Route path = "friend">
    <Friends/>
  </Route>
  <Route path = "requestsFriend">
    <RequestsFriend/>
  </Route>
  <Route path = "suggestsFriend">
    <SuggestsFriend/>
  </Route>
  
</div>
</Router>