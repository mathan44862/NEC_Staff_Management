import { jwtDecode } from "jwt-decode";
import Header from "../components/HomePage/Header";
import LoginPage from "../components/LoginPage";
import ShowLeaveDate from "../components/ShowLeaveDate";
import ShowStaff from "../components/Admin/ShowUser";

const ProtectedRouter = () => {
  let hasToken = localStorage.getItem('accessToken');
  let user: {role:String} = hasToken ? jwtDecode(hasToken) : {role: ''};
  return (
    (user.role=="hod" || user.role=="staff") ?<ShowLeaveDate></ShowLeaveDate> : 
    (user.role == "admin") ? <ShowStaff></ShowStaff>:null
  )
}

export default ProtectedRouter;