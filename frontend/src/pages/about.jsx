import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography, Avatar, IconButton, Grid, Tooltip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X'; // Twitter/X Icon
import InstagramIcon from '@mui/icons-material/Instagram';
import '../pages/about.css';

const skills = [
  { name: "React", level: "92%" },
  { name: "Node.js", level: "88%" },
  { name: "WebRTC", level: "85%" },
  { name: "Socket.io", level: "90%" },
  { name: "MongoDB", level: "84%" },
  { name: "Material UI", level: "95%" }
];

export default function AboutPage() {
  useEffect(() => {
    let effect = null;
    if (window.VANTA && window.VANTA.NET) {
      effect = window.VANTA.NET({
        el: "#about-vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x6d28d9,
        backgroundColor: 0x020617,
        points: 15,
        maxDistance: 22,
        spacing: 16,
      });
    }
    return () => { if (effect) effect.destroy(); };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', bgcolor: '#020617', color: '#fff', overflowX: 'hidden' }}>
      <div id="about-vanta-bg" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 12 }, pb: 8 }}>
        
        {/* --- MAIN PROFILE CARD --- */}
        <Box className="main-profile-card">
          <Stack alignItems="center" spacing={3}>
            
            {/* Pulsing Avatar */}
            <Box className="avatar-container">
              <Avatar 
                src="/devansh.jpg" 
                alt="Devansh Rawat" 
                sx={{ width: 150, height: 150, border: '4px solid rgba(255,255,255,0.1)' }} 
              />
              <div className="pulse-ring"></div>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-1.5px', mb: 1, fontFamily: 'Syne' }}>
                Devansh Rawat
              </Typography>
              <Typography variant="h6" sx={{ color: '#a78bfa', fontWeight: 600, mb: 2 }}>
                Full Stack Developer & Real-Time Specialist
              </Typography>
              
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 620, mx: 'auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
                I am a B.Tech student passionate about building scalable real-time applications. 
                Currently, I'm focusing on **Convox Meet**, a high-performance video conferencing solution 
                leveraging WebRTC and Socket.io.
              </Typography>
            </Box>

            {/* Social Dock - All Links Added */}
            <Stack direction="row" spacing={2} className="social-dock">
              <Tooltip title="GitHub">
                <IconButton component="a" href="https://github.com/devanshrawat27" target="_blank" className="dock-icon"><GitHubIcon /></IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton component="a" href="https://www.linkedin.com/in/devansh-rawat-170649268/" target="_blank" className="dock-icon"><LinkedInIcon /></IconButton>
              </Tooltip>
              <Tooltip title="X (Twitter)">
                <IconButton component="a" href="https://x.com/Devanshrawat49" target="_blank" className="dock-icon"><XIcon /></IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton component="a" href="#" className="dock-icon"><InstagramIcon /></IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>

        {/* --- SKILLS SECTION --- */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h5" sx={{ mb: 5, fontWeight: 800, textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9 }}>
            Tech Stack & Expertise
          </Typography>
          
          <Grid container spacing={4}>
            {skills.map((skill) => (
              <Grid item xs={12} sm={4} key={skill.name}>
                <Box className="skill-pill">
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{skill.name}</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#a78bfa' }}>{skill.level}</Typography>
                  </Stack>
                  <Box className="progress-bar-bg">
                    <Box className="progress-bar-fill" sx={{ width: skill.level }} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* --- FOOTER --- */}
        <Box sx={{ textAlign: 'center', mt: 12, opacity: 0.5 }}>
          <Typography variant="body2">
            Built with React & Passion. © 2026 Devansh Rawat.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}