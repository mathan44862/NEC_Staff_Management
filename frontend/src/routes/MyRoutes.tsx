import { useRoutes } from 'react-router-dom';
import HomePage from '../components/LoginPage';

import { ShowRequestPage } from '../components/ShowRequestPage';
import ProtectedRouter from './ProtectedRouter';
import ShowLeaveDate from '../components/ShowLeaveDate';
import Header from '../components/HomePage/Header';
import RequestLeave from '../components/RequestLeave';
// import Profile from '../components/Profile';
import AddUser from '../components/Admin/AddUser';
import UpdateUser from '../components/Admin/UpdateUser';
import ShowLeaveDetails from '../components/ShowLeaveDetails';
import Todos from '../components/Todos';
import Todostatus from '../components/Todostatus';
import Todosforstaff from '../components/Todosforstaff';
import Profile from '../components/Profile';

const MyRoutes = () => {
  let element = useRoutes([
    {
      path: '/',
      element: (
        <ProtectedRouter></ProtectedRouter>
      ),
      children: [
        {
          path: 'messages',
          element: <HomePage />
        }
      ]
    },  
    {
      path: '/show request',
      element: (
           <ShowRequestPage></ShowRequestPage>
      ),
    }, 
    {
      path: '/Leave Request',
      element: (
        <RequestLeave></RequestLeave>
      ),
    },  
    {
      path: '/Add User',
      element: (
        <AddUser></AddUser>
      ),
    }, 
    {
      path: '/Leave Details',
      element: (
          <ShowLeaveDetails></ShowLeaveDetails>
      ),
    }, 
    {
      path: '/Todos',
      element: (
        <Todos></Todos>
      ),
    }, 
    {
      path: '/Todos Status',
      element: (
          <Todostatus></Todostatus>
      ),
    },
    {
      path: '/Todosforstaff',
      element: (
          <Todosforstaff></Todosforstaff>
      ),
    }, 
    {
      path: '/Task',
      element: (
          <Todosforstaff></Todosforstaff>
      ),
    }, 
    {
      path: '/Profile',
      element: (
          <Profile/>
      ),
    }, 
  ]);
  return element;
};

export default MyRoutes;