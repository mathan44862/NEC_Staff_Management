import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useTodoQuery, useTodochangestatusMutation } from '../../apis/userLogin';

interface Todostatus {
    task: String,
    taskdescription: String
    status: String,
    department: String,
    name: String,
    id: String
    _id: String
}

export default function Todosforstaff() {
    const { data, refetch } = useTodoQuery();
    console.log(data);
    const [todo, setTodo] = useState<Todostatus[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await refetch();
                console.log(data);
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '2%' }}>
            {todo.length > 0 ? todo.map((item, index) => (
                <Card key={index} sx={{ minWidth: 275, minHeight: 100, backgroundColor: '#ffffff', color: 'black', width: '30%', alignItems: "center", borderRadius: '1%', marginBottom: '20px', border: '2px solid #3a86ff' }}>
                    <CardContent>
                        <Typography variant='h4' component='h2'>{item.task}</Typography>
                        <br />
                        <Typography variant='h6' component='h2'>{item.taskdescription}</Typography><br />
                        <Button
                            variant="contained"
                            disabled={item.status === "finished"}
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
                            {
                                item.status === "not started" ? "Start" : item.status === "progess" ? "Finish" : "Finished"
                            }
                        </Button>
                    </CardContent>
                </Card>
            )) :
                <Typography variant="h4" component="h1">No tasks assigned</Typography>
            }
        </Box>
    );
}
