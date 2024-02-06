import { Stack, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react";
import { useUserLeaveDetailsMutation } from "../../apis/userLogin";
import { useMediaQuery } from "@mui/material";


interface ApiResponse {
  data?: {
    Medical: number;
    Vacation: number;
    Casual : number,
    Official : number,
    Exam : number,
    Higherstudy : number,
    Others : number
  };
  error?: {
    // Adjust the properties based on your actual error structure
    message: string;
    code: number;
  };
}
interface ShowLeaveProps {
  year: number;
  month:number;
}
const ShowLeave: React.FC<ShowLeaveProps> = ({ year,month }) => {
  const [userLeaveDetailsMutation, { data, error, isLoading }] =
    useUserLeaveDetailsMutation();
  const [userLeaveInfo, setUserLeaveInfo] = useState<ApiResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userLeaveDetailsMutation({year,month});
        console.log(result)
        if (result) {
          setUserLeaveInfo(result as ApiResponse);
        }
      } catch (error) {
        console.error("Error fetching user leave details:", error);
      }
    };
    fetchData();
  }, [year,month]);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
    
  return (

    <Stack alignItems={"center"}  id="container"  marginTop={'5%'}     marginBottom={'2%'}
    direction={isSmallScreen ? 'column' : 'row'}
            gap={isSmallScreen ? '5%' : '10%'}
    >
      <br />
        <Card  sx={{ minWidth: 275 , minHeight:100,maxHeight:500 ,backgroundColor:'#3a86ff',color:'#ffffff' ,width:'30%',alignItems:"center",textAlign:"center",borderRadius:'4%'}} >
          <CardContent>
              <Typography variant="h6" component="h6" >Vacation  : {userLeaveInfo?.data?.Vacation}</Typography><br />
              <Typography variant="h6" component="h6" >Medical  : {userLeaveInfo?.data?.Medical}</Typography><br />
              <Typography variant="h6" component="h6" >Casual Leave  : {userLeaveInfo?.data?.Casual}</Typography><br />
          </CardContent>
        </Card><br /><br />
        <Card  sx={{ minWidth: 275 , minHeight:100,maxHeight:500 ,backgroundColor:'#3a86ff',color:'#ffffff' ,width:'30%',alignItems:"center",textAlign:"center",borderRadius:'4%'}} >
          <CardContent>
          <Typography variant="h6" component="h6" >Official On-Duty  : {userLeaveInfo?.data?.Official}</Typography><br />
          <Typography variant="h6" component="h6" >Exam On-Duty : {userLeaveInfo?.data?.Exam}</Typography><br />
          <Typography variant="h6" component="h6" >Higher Study On-Duty : {userLeaveInfo?.data?.Higherstudy}</Typography><br />
          <Typography variant="h6" component="h6" >Others :  {userLeaveInfo?.data?.Others}</Typography><br />
          </CardContent>
        </Card>
        <br /><br />
    </Stack>
  );
};

export default ShowLeave;
