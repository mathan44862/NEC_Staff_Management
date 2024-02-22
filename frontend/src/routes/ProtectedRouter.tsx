import { jwtDecode } from "jwt-decode";
import Header from "../components/HomePage/Header";
import LoginPage from "../components/LoginPage";
import ShowLeaveDate from "../components/ShowLeaveDate";
import ShowStaff from "../components/Admin/ShowUser";
import TodayLeave from "../components/TodayLeave";

const ProtectedRouter = () => {
  let hasToken = localStorage.getItem('accessToken');
  let user: {role:String} = hasToken ? jwtDecode(hasToken) : {role: ''};
  return (
    (user.role=="hod" || user.role=="staff") ?<ShowLeaveDate></ShowLeaveDate> : 
    (user.role == "admin") ? <ShowStaff></ShowStaff>:(user.role==="principal")?<TodayLeave></TodayLeave>:null
    )
}

export default ProtectedRouter;