import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import '../pages/about.css';

export default function AboutPage() {
  useEffect(() => {
    let effect = null;
    if (window.VANTA && window.VANTA.NET) {
      effect = window.VANTA.NET({
        el: "#about-vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x6366f1, // Simple Indigo color
        backgroundColor: 0x030712,
        points: 10,
        maxDistance: 20,
        spacing: 18,
      });
    }
    return () => { if (effect) effect.destroy(); };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', bgcolor: '#030712', color: '#fff', display: 'flex', alignItems: 'center' }}>
      {/* Vanta Background */}
      <div id="about-vanta-bg" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        
        <Box className="profile-card-minimal">
          <Stack alignItems="center" spacing={4}>
            
            {/* Larger & Clearer Image */}
            <Box className="image-frame">
              <Avatar 
                src="/devansh.jpg" 
                alt="Devansh Rawat" 
                sx={{ width: 200, height: 200, border: '2px solid rgba(255,255,255,0.2)' }} 
              />
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-1px' }}>
                Devansh Rawat
              </Typography>
              <Typography variant="h6" sx={{ color: '#818cf8', fontWeight: 500, mb: 3 }}>
                Full Stack Developer
              </Typography>
              
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '1rem' }}>
                Hey! I'm a B.Tech student who loves building real-time web apps. 
                Currently working on **Convox Meet** using WebRTC and Socket.io to make 
                video calls simple and fast.
              </Typography>
            </Box>

            {/* Simple & Clean Social Links */}
            <Stack direction="row" spacing={3}>
              <Tooltip title="GitHub">
                <IconButton component="a" href="https://github.com/devanshrawat27" target="_blank" className="social-icon-btn">
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton component="a" href="https://www.linkedin.com/in/devansh-rawat-170649268/" target="_blank" className="social-icon-btn">
                  <LinkedInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="X">
                <IconButton component="a" href="https://x.com/Devanshrawat49" target="_blank" className="social-icon-btn">
                  <XIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton component="a" href="#" target="_blank" className="social-icon-btn">
                  <InstagramIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>

      </Container>
    </Box>
  );
}