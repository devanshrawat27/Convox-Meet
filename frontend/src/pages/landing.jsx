import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  Box, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  Container, 
  Stack 
} from "@mui/material";
import { ArrowForward, VideoCall, Security, Speed } from "@mui/icons-material";

export default function Landing() {
  const navigate = useNavigate();
  const { userData, handleLogout } = useAuth();
  const isLoggedIn = userData || localStorage.getItem("token");

  /* VANTA Logic - Fixed & Safe */
  useEffect(() => {
    let effect = null;
    if (window.VANTA && window.VANTA.NET) {
        effect = window.VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            color: 0x6366f1, 
            backgroundColor: 0x030712, 
            points: 12,
            spacing: 15,
        });
    }

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", color: "white", position: "relative", overflowX: "hidden", bgcolor: "#030712" }}>
      {/* Vanta Background */}
      <div id="vanta-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />

      {/* Navbar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          background: "rgba(3, 7, 18, 0.7)", 
          backdropFilter: "blur(15px)", 
          boxShadow: "none",
          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
          zIndex: 10
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <VideoCall sx={{ color: "#818cf8", fontSize: 32 }} />
              <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.5px" }}>
                Convox Meet
              </Typography>
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Typography 
                variant="body2" 
                sx={{ cursor: "pointer", color: "rgba(255,255,255,0.6)", '&:hover': { color: "#fff" } }} 
                onClick={() => navigate('/about')}
              >
                About
              </Typography>
              {isLoggedIn ? (
                <>
                  <Typography 
                    variant="body2" 
                    sx={{ cursor: "pointer", color: "rgba(255,255,255,0.6)", '&:hover': { color: "#fff" }, display: { xs: 'none', sm: 'block' } }} 
                    onClick={() => navigate('/home')}
                  >
                    Go to Home
                  </Typography>
                  <Button 
                    onClick={() => {
                      handleLogout();
                    }}
                    variant="contained" 
                    sx={{ 
                      borderRadius: "10px", 
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      px: 3,
                      textTransform: "none",
                      "&:hover": { background: "rgba(255, 255, 255, 0.1)" }
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Typography 
                    variant="body2" 
                    sx={{ cursor: "pointer", color: "rgba(255,255,255,0.6)", '&:hover': { color: "#fff" }, display: { xs: 'none', sm: 'block' } }} 
                    onClick={() => navigate('/guest')}
                  >
                    Join as Guest
                  </Typography>
                  <Link to="/auth" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", '&:hover': { color: "#fff" } }}>
                      Register
                    </Typography>
                  </Link>
                  <Button 
                    onClick={() => navigate('/auth')}
                    variant="contained" 
                    sx={{ 
                      borderRadius: "10px", 
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      px: 3,
                      textTransform: "none",
                      "&:hover": { background: "rgba(255, 255, 255, 0.1)" }
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pt: { xs: 20, md: 25 } }}>
        
        {/* --- HERO SECTION --- */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={8} alignItems="center">
          <Box flex={1.2}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: "3rem", md: "4.5rem" }, lineHeight: 1, mb: 3, letterSpacing: "-2px" }}>
              Connect with <br /> 
              <span style={{ 
                background: "linear-gradient(90deg, #6366f1, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Seamless Clarity.</span>
            </Typography>
            
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)", mb: 5, fontWeight: 300, lineHeight: 1.6, maxWidth: "550px" }}>
              The ultimate video conferencing solution built for high-performance teams. 
              Crystal clear communication, anywhere in the world.
            </Typography>

            <Button
              onClick={() => navigate('/auth')}
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                py: 2, px: 5, borderRadius: "12px", fontSize: "1rem", fontWeight: 700, textTransform: "none",
                background: "linear-gradient(90deg, #6366f1, #a855f7)",
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
                "&:hover": { transform: "translateY(-3px)" },
                transition: "all 0.3s"
              }}
            >
              Get Started
            </Button>
          </Box>

          <Box flex={1} sx={{ display: "flex", justifyContent: "center", animation: "float 6s ease-in-out infinite" }}>
            <Box
              component="img"
              src="/mobile.png"
              alt="landing-illustration"
              sx={{
                width: { xs: "90%", md: "100%" },
                maxWidth: { xs: "400px", md: "550px" },
                filter: "drop-shadow(0 0 40px rgba(99, 102, 241, 0.3))",
              }}
            />
          </Box>
        </Stack>

        {/* --- FIRST FEATURE SECTION --- */}
        <Box sx={{ mt: { xs: 20, md: 35 } }}>
          <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={10} alignItems="center">
            <Box flex={1} sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', inset: -30, background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', zIndex: -1 }} />
              <Box
                component="img"
                src="/dashboard-preview.png"
                sx={{
                  width: "100%", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                  transform: { md: "perspective(1000px) rotateY(15deg) rotateX(5deg)" },
                  transition: "transform 0.5s ease",
                  '&:hover': { transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)" }
                }}
              />
            </Box>

            <Box flex={1.2}>
              <Typography variant="overline" sx={{ color: "#818cf8", fontWeight: 800, letterSpacing: 3 }}>
                EXPERIENCE THE FUTURE
              </Typography>
              <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, mb: 3, mt: 1, background: "linear-gradient(90deg, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Everything you need <br /> to lead.
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4, fontSize: "1.1rem", lineHeight: 1.8 }}>
                Convox Meet combines high-definition video with military-grade security 
                and real-time collaboration tools.
              </Typography>
              <Stack spacing={4}>
                <Stack direction="row" spacing={3}>
                  <Security sx={{ color: "#a855f7", fontSize: 30 }} />
                  <Box>
                    <Typography variant="h6" fontWeight={700}>End-to-End Encryption</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Your data and calls are private, protected by 256-bit AES encryption.</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Speed sx={{ color: "#6366f1", fontSize: 30 }} />
                  <Box>
                    <Typography variant="h6" fontWeight={700}>Ultra-Low Latency</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>Experience zero lag with our global edge-network optimization.</Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* --- SECOND FEATURE SECTION --- */}
        <Box sx={{ mt: { xs: 20, md: 25 }, pb: 20 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={10} alignItems="center">
            <Box flex={1.2}>
              <Typography variant="overline" sx={{ color: "#a855f7", fontWeight: 800, letterSpacing: 3 }}>
                ANY DEVICE, ANYWHERE
              </Typography>
              <Typography variant="h2" fontWeight={900} sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, mb: 3, mt: 1, background: "linear-gradient(90deg, #fff, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Seamless Across <br /> All Screens.
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mb: 4, lineHeight: 1.8, fontSize: "1.1rem" }}>
                Join instantly from your browser with a single link, no bulky app downloads required.
              </Typography>
              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography variant="h4" fontWeight={800} sx={{ color: "#6366f1" }}>100%</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: 'uppercase' }}>Browser Based</Typography>
                </Box>
                <Box sx={{ width: '1px', bgcolor: 'rgba(255,255,255,0.1)' }} />
                <Box>
                  <Typography variant="h4" fontWeight={800} sx={{ color: "#a855f7" }}>4K</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", textTransform: 'uppercase' }}>Ultra-HD Quality</Typography>
                </Box>
              </Stack>
            </Box>

            <Box flex={1} sx={{ position: 'relative' }}>
              <Box sx={{ position: 'absolute', inset: -30, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', zIndex: -1 }} />
              <Box
                component="img"
                src="/multi-device.png"
                sx={{
                  width: "100%", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                  transform: { md: "perspective(1000px) rotateY(-15deg) rotateX(5deg)" },
                  transition: "transform 0.5s ease",
                  '&:hover': { transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)" }
                }}
              />
            </Box>
          </Stack>
        </Box>

      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
}