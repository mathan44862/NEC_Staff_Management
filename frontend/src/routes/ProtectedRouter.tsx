import { jwtDecode } from "jwt-decode";
import ShowLeaveDate from "../components/Attendance/pages/ShowLeaveDate";
import ShowStaff from "../components/Attendance/Profile/Admin/ShowUser";
import TodayLeave from "../components/Attendance/pages/TodayLeave";

const ProtectedRouter = () => {
  let hasToken = localStorage.getItem('accessToken');
  let user: {role:String} = hasToken ? jwtDecode(hasToken) : {role: ''};
  return (
    (user.role=="hod" || user.role=="staff") ?<ShowLeaveDate></ShowLeaveDate> : 
    (user.role == "admin") ? <ShowStaff></ShowStaff>:(user.role==="principal")?<TodayLeave></TodayLeave>:null
    )
}

export default ProtectedRouter;