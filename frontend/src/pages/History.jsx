import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    Card, CardContent, Typography, IconButton, Box, 
    Container, Grid, Chip, Divider, Paper, Avatar, Stack 
} from '@mui/material';
import { 
    Home as HomeIcon, 
    VideoCall as VideoIcon, 
    CalendarMonth as CalendarIcon, 
    AccessTime as TimeIcon,
    Person as PersonIcon 
} from '@mui/icons-material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                console.error("History fetch error:", err);
            }
        }
        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#030712', py: 4 }}>
            <Container maxWidth="md">
                {/* Header Section */}
                <Paper elevation={0} sx={{ 
                    p: 3, mb: 4, display: 'flex', alignItems: 'center', 
                    bgcolor: 'rgba(99, 102, 241, 0.05)', borderRadius: 4,
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                    <IconButton 
                        onClick={() => routeTo("/home")} 
                        sx={{ bgcolor: '#6366f1', color: 'white', '&:hover': { bgcolor: '#4f46e5' } }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h4" sx={{ ml: 3, fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>
                        Meeting History
                    </Typography>
                </Paper>

                {meetings.length > 0 ? (
                    <Grid container spacing={3}>
                        {meetings.map((e, i) => (
                            <Grid item xs={12} key={i}>
                                <Card sx={{ 
                                    bgcolor: '#111827', borderRadius: 4, 
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))',
                                    '&:hover': { transform: 'translateY(-4px)', borderColor: '#6366f1', transition: '0.3s' }
                                }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar sx={{ bgcolor: '#6366f1', width: 45, height: 45 }}>
                                                    <PersonIcon />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700 }}>
                                                        Created By
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                                                        {e.user_id || "Unknown User"}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Chip label="Completed" size="small" sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', fontWeight: 700 }} />
                                        </Box>

                                        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.06)' }} />

                                        <Grid container alignItems="center">
                                            <Grid item xs={12} sm={4}>
                                                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', mb: 0.5 }}>Meeting Code</Typography>
                                                <Typography variant="h6" sx={{ color: '#818cf8', fontWeight: 800, fontFamily: 'monospace' }}>
                                                    {e.meeting_code}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', mt: { xs: 2, sm: 0 } }}>
                                                    <CalendarIcon sx={{ fontSize: 18, mr: 1, color: '#6366f1' }} />
                                                    <Typography variant="body2">{formatDate(e.date)}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', mt: { xs: 2, sm: 0 } }}>
                                                    <TimeIcon sx={{ fontSize: 18, mr: 1, color: '#6366f1' }} />
                                                    <Typography variant="body2">{formatTime(e.date)}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.2)' }} variant="h5">No history available</Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
}