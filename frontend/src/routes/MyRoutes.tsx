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
         <Header>
           <ShowRequestPage></ShowRequestPage>
         </Header>
      ),
    }, 
    {
      path: '/Leave Request',
      element: (
       <Header>
        <RequestLeave></RequestLeave>
       </Header>
      ),
    },  
    {
      path: '/Add User',
      element: (
       <Header>
        <AddUser></AddUser>
       </Header>
      ),
    }, 
    {
      path: '/Leave Details',
      element: (
       <Header>
          <ShowLeaveDetails></ShowLeaveDetails>
       </Header>
      ),
    }, 
    {
      path: '/Todos',
      element: (
       <Header>
          <Todos></Todos>
       </Header>
      ),
    }, 
    {
      path: '/Todos Status',
      element: (
       <Header>
          <Todostatus></Todostatus>
       </Header>
      ),
    },
    {
      path: '/Todosforstaff',
      element: (
       <Header>
          <Todosforstaff></Todosforstaff>
       </Header>
      ),
    }, 
    {
      path: '/Task',
      element: (
       <Header>
          <Todosforstaff></Todosforstaff>
       </Header>
      ),
    }, 
    {
      path: '/Profile',
      element: (
       <Header>
          <Profile/>
        </Header>
      ),
    }, 
  ]);
  return element;
};

export default MyRoutes;