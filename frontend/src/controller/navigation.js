import { useNavigate } from "svelte-navigator"
const navigate = useNavigate();
export const handleNavigation =(path)=>{
    // e.preventDefault()
    // gọi api đăng nhập
    // kết quả lưu vào bộ nhớ trình duyệt
    navigate(path) // chuyển hướng vể trang chủ 
  }