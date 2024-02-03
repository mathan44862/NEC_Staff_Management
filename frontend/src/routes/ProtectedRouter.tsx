import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";


const ProtectedRouter = () => {
  let hasToken = localStorage.getItem('accessToken');
  return (
    hasToken ?<HomePage></HomePage>  : <LoginPage/> 
  )
}

export default ProtectedRouter;
