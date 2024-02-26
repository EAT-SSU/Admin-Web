// Login.js
import React, { useState } from 'react';
import { sendHttpRequest } from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Grid, TextField, Box } from '@mui/material';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await sendHttpRequest('POST', '/login', { password });
            if (response.isSuccess) {
                const tokens = response.result;
                login(tokens);
                navigate('/manage');
            }
            else setError('Login failed');
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError(error.message);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <div className='centered-container'>
            <Container maxWidth="xs">
                <Grid container direction="column" justifyContent="center" alignItems="center" wrap="nowrap">
                    <Grid item>
                        <img src={`${process.env.PUBLIC_URL}/images/cutlery.png`} alt="Logo" className="logo" />
                    </Grid>
                    <Grid item>
                        <h1 className="text-logo">
                            EAT SSU
                        </h1>
                        <p variant="body1" className="catchphrase">
                            숭실대에서 먹자
                        </p>
                    </Grid>
                    {/* Text */}
                    <Grid item>
                        <p className="text">
                            EAT-SSU 관리자 페이지
                        </p>
                    </Grid>
                    {/* Password Input */}
                    <Grid item maxWidth="xs" className="password-input">
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <TextField
                                required
                                fullWidth
                                variant="filled"
                                name="password"
                                label="비밀번호를 입력해주세요"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Box>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default Login;
