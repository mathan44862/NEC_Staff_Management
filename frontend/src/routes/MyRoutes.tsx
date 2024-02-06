import { useRoutes } from 'react-router-dom';
import HomePage from '../components/LoginPage';

import { ShowRequestPage } from '../components/ShowRequestPage';
import ProtectedRouter from './ProtectedRouter';
import ShowLeaveDate from '../components/ShowLeaveDate';
import Header from '../components/HomePage/Header';
import RequestLeave from '../components/RequestLeave';
import Profile from '../components/Profile';
import AddUser from '../components/Admin/AddUser';
import UpdateUser from '../components/Admin/UpdateUser';

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
      path: '/showrequest',
      element: (
         <Header>
           <ShowRequestPage></ShowRequestPage>
         </Header>
      ),
    }, 
    {
      path: '/LeaveRequest',
      element: (
       <Header>
        <RequestLeave></RequestLeave>
       </Header>
      ),
    }, 
    {
      path: '/Profile',
      element: (
       <Header>
        <Profile></Profile>
       </Header>
      ),
    },  
    {
      path: '/AddUser',
      element: (
       <Header>
        <AddUser></AddUser>
       </Header>
      ),
    }, 
  ]);
  return element;
};

export default MyRoutes;