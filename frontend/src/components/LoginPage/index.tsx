import { Button, Paper, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../apis/userLogin";
import Logo from './NandhaLogo.png';
import validate from "./utils";

interface accessToken {
    accessToken: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [accountNotFound, setAccountNotFound] = useState(false);
    const [signIn] = useLoginUserMutation();

    const userSignIn = async () => {
        try {
            const response = await signIn(formik.values);
            if ('data' in response) {
                if ('error' in response.data) {
                    setAccountNotFound(true);
                } else if ('accessToken' in response.data) {
                    const accessKey: accessToken = response.data;
                    localStorage.setItem('accessToken', accessKey.accessToken);
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Unexpected error during sign-in:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            // Custom logic for form submission if needed
        },
    });

    return (
        <Stack
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Paper elevation={6} sx={{
                padding: 2,
                borderRadius: 2,
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%',
            }}>
                <img
                    src={Logo}
                    alt=""
                    style={{
                        width: '100%',  
                        maxWidth: '200px',  
                        height: 'auto',
                        margin: 'auto',
                    }}
                />
                <br />
                {accountNotFound && <span style={{ color: 'red' }}><br />Account Not Found</span>}
                <form>
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        sx={{ width: '100%' }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && <span style={{ color: 'red' }}><br />{formik.errors.email}</span>}
                    <br /><br />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        sx={{ width: '100%' }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && <span style={{ color: 'red' }}><br />{formik.errors.password}</span>}
                    <br />
                    <br />
                    <Button variant="contained" sx={{ width: '100%' }} disabled={!(formik.isValid && formik.dirty)} onClick={userSignIn}>Sign In</Button><br /><br />
                </form>
            </Paper>
        </Stack>
    );
}

export default LoginPage;
