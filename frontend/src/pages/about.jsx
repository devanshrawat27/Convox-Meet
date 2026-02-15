import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography, Avatar, IconButton, Grid, Tooltip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import '../pages/about.css';

const skills = [
  { name: "React", level: "90%" },
  { name: "Node.js", level: "85%" },
  { name: "WebRTC", level: "80%" },
  { name: "Socket.io", level: "88%" },
  { name: "MongoDB", level: "82%" },
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

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, pt: { xs: 10, md: 14 }, pb: 8 }}>
        
        {/* --- MAIN PROFILE CARD --- */}
        <Box className="main-profile-card">
          <Stack alignItems="center" spacing={3}>
            
            {/* Pulsing Avatar */}
            <Box className="avatar-container">
              <Avatar 
                src="/devansh.jpg" 
                alt="Devansh Rawat" 
                sx={{ width: 140, height: 140, border: '4px solid rgba(255,255,255,0.1)' }} 
              />
              <div className="pulse-ring"></div>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-1.5px', mb: 1 }}>
                Devansh Rawat
              </Typography>
              <Typography variant="h6" sx={{ color: '#a78bfa', fontWeight: 600, mb: 2 }}>
                Full Stack Architect & Visionary
              </Typography>
              
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}>
                I craft high-performance real-time systems. Currently pushing the boundaries of WebRTC with Convox Meet. Building the future of digital connectivity, one line of code at a time.
              </Typography>
            </Box>

            {/* Social Dock */}
            <Stack direction="row" spacing={2} className="social-dock">
              <Tooltip title="Github"><IconButton href="#" className="dock-icon"><GitHubIcon /></IconButton></Tooltip>
              <Tooltip title="LinkedIn"><IconButton href="#" className="dock-icon"><LinkedInIcon /></IconButton></Tooltip>
              <Tooltip title="Twitter"><IconButton href="#" className="dock-icon"><TwitterIcon /></IconButton></Tooltip>
              <Tooltip title="Instagram"><IconButton href="#" className="dock-icon"><InstagramIcon /></IconButton></Tooltip>
            </Stack>
          </Stack>
        </Box>

        {/* --- SKILLS SECTION --- */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, textAlign: 'center', opacity: 0.8 }}>
            Tech Stack Expertise
          </Typography>
          
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid item xs={6} sm={4} key={skill.name}>
                <Box className="skill-pill">
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{skill.name}</Typography>
                  <Box className="progress-bar-bg">
                    <Box className="progress-bar-fill" sx={{ width: skill.level }} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.4 }}>
          <Typography variant="caption">© 2026 Convox Meet | Designed with ❤️ by Devansh</Typography>
        </Box>

      </Container>
    </Box>
  );
}