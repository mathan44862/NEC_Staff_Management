import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTodoQuery, useTodochangestatusMutation } from '../../apis/userLogin';

interface Todostatus {
    task: String,
    date:number,
    month:number,
    year:number,
    taskdescription: String
    status: String,
    department: String,
    name: String,
    id: String,
    _id: String,
    taskby:String
}

export default function Todosforstaff() {
    const { data, refetch } = useTodoQuery();
    const [todo, setTodo] = useState<Todostatus[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await refetch();
                if (data && Array.isArray(data)) {
                    setTodo(data);
                }
            } catch (error) {
                console.error('Error fetching leave data:', error);
            }
        };
        fetchData();
    }, [data, refetch]);

    const [changeStatusMutation] = useTodochangestatusMutation(); 

    const handleStatus = (_id: String) => async () => {
        try {
            const response = await changeStatusMutation({ _id });
            if('data' in response){
                refetch();
            }
        } catch (error) {
            console.error('Error changing status:', error);
        }
    }

    // Filter todo items based on status
    const notStartedTodos = todo.filter(item => item.status === "not started");
    const inProgressTodos = todo.filter(item => item.status === "progress");
    const finishedTodos = todo.filter(item => item.status === "finished");

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '2%' }}>
            {notStartedTodos.length > 0 && notStartedTodos.map((item, index) => (
                <Card key={index} sx={{ minWidth: 275, minHeight: 100, backgroundColor: '#ffffff', color: 'black', width: '30%', alignItems: "center", borderRadius: '1%', marginBottom: '20px', border: '2px solid #3a86ff' }}>
                    <CardContent>
                        <Typography variant='h4' component='h2'>{item.task}</Typography>
                        <br />
                        <Typography variant='h6' component='h2'>{item.taskdescription}</Typography><br />
                        <Typography variant='h6' component='h2'>{"Target Date : "+item.date + "/"+item.month+"/"+item.year}</Typography><br />
                        <Typography variant='h6' component='h2'>{"Assigned by : "+item.taskby}</Typography><br />
                        <Button
                            variant="contained"
                            onClick={handleStatus(item._id)}
                            sx={{
                                color: '#ffffff',
                                backgroundColor: '#3a86ff',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    borderColor: '#a3b18a',
                                    color: '#3a86ff',
                                }
                            }}
                        >
                            Start
                        </Button>
                    </CardContent>
                </Card>
            ))}
            {inProgressTodos.length > 0 && inProgressTodos.map((item, index) => (
                <Card key={index} sx={{ minWidth: 275, minHeight: 100, backgroundColor: '#ffffff', color: 'black', width: '30%', alignItems: "center", borderRadius: '1%', marginBottom: '20px', border: '2px solid #3a86ff' }}>
                    <CardContent>
                        <Typography variant='h4' component='h2'>{item.task}</Typography>
                        <br />
                        <Typography variant='h6' component='h2'>{item.taskdescription}</Typography><br />
                        <Typography variant='h6' component='h2'>{"Dead Line : "+item.date + "/"+item.month+"/"+item.year}</Typography><br />
                        <Typography variant='h6' component='h2'>{"Assigned by : "+item.taskby}</Typography><br />
                        <Button
                            variant="contained"
                            onClick={handleStatus(item._id)}
                            sx={{
                                color: '#ffffff',
                                backgroundColor: '#3a86ff',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    borderColor: '#a3b18a',
                                    color: '#3a86ff',
                                }
                            }}
                        >
                            Finish
                        </Button>
                    </CardContent>
                </Card>
            ))}
            {finishedTodos.length > 0 && finishedTodos.map((item, index) => (
                <Card key={index} sx={{ minWidth: 275, minHeight: 100, backgroundColor: '#ffffff', color: 'black', width: '30%', alignItems: "center", borderRadius: '1%', marginBottom: '20px', border: '2px solid #3a86ff' }}>
                    <CardContent>
                        <Typography variant='h4' component='h2'>{item.task}</Typography>
                        <br />
                        <Typography variant='h6' component='h2'>{item.taskdescription}</Typography><br />
                        <Typography variant='h6' component='h2'>{"Assigned by : "+item.taskby}</Typography><br />       
                        <Button
                            variant="contained"
                            disabled
                            sx={{
                                color: '#ffffff',
                                backgroundColor: '#3a86ff',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    borderColor: '#a3b18a',
                                    color: '#3a86ff',
                                }
                            }}
                        >
                            Finished
                        </Button>
                    </CardContent>
                </Card>
            ))}
            {notStartedTodos.length === 0 && inProgressTodos.length === 0 && finishedTodos.length === 0 &&
                <Typography variant="h4" component="h1">No tasks assigned</Typography>
            }
        </Box>
    );
}

