import { jwtDecode } from 'jwt-decode';
import { useRoutes } from 'react-router-dom';
import HomePage from '../components/Attendance/HomePage';
import { ShowRequestPage } from '../components/Attendance/pages/ShowRequestPage';
import RestrictionRouter from './RestrictionRouter';
import RequestLeave from '../components/Attendance/pages/RequestLeave';
import AddUser from '../components/Attendance/Profile/Admin/AddUser';
import ShowLeaveDetails from '../components/Attendance/pages/ShowLeaveDetails';
import Todos from '../components/Tasks/Todos';
import Todostatus from '../components/Tasks/Todostatus';
import Todosforstaff from '../components/Tasks/Todosforstaff';
import Profile from '../components/Attendance/Profile';
import TodayLeave from '../components/Attendance/pages/TodayLeave';
import ShowUser from '../components/Attendance/Profile/Admin/ShowUser';


const MyRoutes = () => {
  let hasToken = localStorage.getItem('accessToken');
  let user: {role:String} = hasToken ? jwtDecode(hasToken) : {role: ''};
  let element = useRoutes([
    {
      path: '/',
      element: (<Profile/>),
    }, 
    {
      path: '/Leave',
      element: (
        user.role==="staff" || user.role==="hod" ? <RequestLeave></RequestLeave> :<RestrictionRouter></RestrictionRouter>
      ),
    },  
    {
      path: '/Add User',
      element: (
        user.role==="admin" ? <AddUser></AddUser>:<RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/User',
      element: (
        user.role==="admin" ? <ShowUser/> :<RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Leave Details',
      element: (
          user.role!=="principal" ? <ShowLeaveDetails></ShowLeaveDetails> : <RestrictionRouter></RestrictionRouter>
      ),
    },
    {
      path: '/Leaverequest',
      element: (
          user.role!=="principal" || user.role === "hod" ? <ShowRequestPage/>: <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Assign Task',
      element: (
        user.role === "hod" || user.role ==="principal" ?<Todos></Todos> : <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Tasks status',
      element: (
        user.role === "hod" || user.role ==="principal"  ? <Todostatus></Todostatus> : <RestrictionRouter></RestrictionRouter>
      ),
    },
    {
      path: '/Tasks',
      element: (
        user.role === "staff" || user.role==="hod" ? <Todosforstaff></Todosforstaff> : <RestrictionRouter></RestrictionRouter>
      ),
    },
    {
      path: '/Today Leave',
      element: (
        user.role === "staff" || user.role==="hod" ? <TodayLeave/> : <RestrictionRouter></RestrictionRouter>
      ),
    }, 
    {
      path: '/Profile',
      element: (
          <Profile/>
      ),
    }
  ]);
  return element;
};

export default MyRoutes;