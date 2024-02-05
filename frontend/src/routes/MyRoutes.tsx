import { useRoutes } from 'react-router-dom';
import HomePage from '../components/LoginPage';

import { ShowRequestPage } from '../components/ShowRequestPage';
import ProtectedRouter from './ProtectedRouter';

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
          <ShowRequestPage></ShowRequestPage>
      ),
      children: [
        {
          path: 'messages',
          element: <HomePage />
        }
      ]
    }, 
  ]);
  return element;
};

export default MyRoutes;
