import React, { useEffect } from 'react';
import { Box, Container, Stack, Typography, Button, Avatar, IconButton, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../pages/about.css';

const skills = ["React","Node.js","WebRTC","Socket.io","MongoDB","JavaScript","REST APIs"];

export default function AboutPage(){
  useEffect(()=>{
    let effect = null;
    if (window.VANTA && window.VANTA.NET) {
      effect = window.VANTA.NET({
        el: "#about-vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x6d28d9,
        backgroundColor: 0x030712,
        points: 12,
        spacing: 16,
      });
    }
    return ()=>{ if (effect) effect.destroy(); };
  },[]);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', bgcolor: '#030712', color: '#fff', overflowX: 'hidden' }}>
      <div id="about-vanta-bg" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 12, md: 16 }, pb: 10 }}>
        <Stack spacing={6} alignItems="center">
          <Box className="glass-hero" sx={{ width: '100%' }}>
            <Typography className="animated-gradient-heading">Meet The Developer</Typography>
            <Typography className="subheading">The Mind Behind Convox Meet</Typography>
          </Box>

          <Box className="glass-panel profile-panel">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box className="profile-glow">
                  <Avatar src="/devansh.jpg" alt="Devansh Rawat" sx={{ width: 160, height: 160 }} />
                </Box>
              </Box>

              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Devansh Rawat</Typography>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>Full Stack Developer | B.Tech Student</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 720, lineHeight: 1.6 }}>
                  Passionate about building real-time applications and scalable systems. Skilled in React, Node.js, WebRTC, Socket.io, and MongoDB. Focused on creating seamless digital communication experiences.
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                  <IconButton className="social-btn" component="a" href="#" aria-label="twitter"><TwitterIcon /></IconButton>
                  <IconButton className="social-btn" component="a" href="#" aria-label="linkedin"><LinkedInIcon /></IconButton>
                  <IconButton className="social-btn" component="a" href="#" aria-label="github"><GitHubIcon /></IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, background: 'linear-gradient(90deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</Typography>
            <Grid container spacing={3}>
              {skills.map((s, i)=> (
                <Grid item xs={12} sm={6} md={4} key={s}>
                  <Box className="skill-card">
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>{s}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{i % 2 === 0 ? 'Expert' : 'Proficient'}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className="glass-panel vision-panel">
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Why I Built Convox Meet</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 920, lineHeight: 1.6 }}>
              I wanted to create a smooth, secure and modern video communication platform that improves collaboration and connectivity. My aim is to build experiences that feel instant and reliable while keeping user privacy and performance front-and-center.
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button className="cta-button" onClick={()=>{ const el = document.getElementById('contact-links'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}>
              Connect With Me
            </Button>
          </Box>

          <Box id="contact-links" className="glass-panel" sx={{ width: '100%', textAlign: 'center', pt: 3, pb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: 800 }}>Let's Connect</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" href="#" className="link-btn">Twitter</Button>
              <Button variant="contained" href="#" className="link-btn">LinkedIn</Button>
              <Button variant="contained" href="#" className="link-btn">GitHub</Button>
            </Stack>
          </Box>

        </Stack>
      </Container>

    </Box>
  );
}
