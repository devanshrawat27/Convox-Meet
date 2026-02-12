// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Button,
//   CssBaseline,
//   TextField,
//   Typography,
//   Card,
//   Snackbar,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useAuth } from "../contexts/AuthContext.jsx";

// const theme = createTheme();

// export default function Authentication() {
//   const cardRef = useRef(null);

//   const { handleRegister, handleLogin } = useAuth();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [formState, setFormState] = useState(1);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleAuth = async () => {
//     try {
//       if (formState === 0) {
//         setMessage(await handleLogin(username, password));
//       } else {
//         setMessage(await handleRegister(name, username, password));
//         setFormState(0);
//       }

//       setUsername("");
//       setPassword("");
//       setName("");
//       setError("");
//       setOpen(true);
//     } catch (err) {
//       setError(err?.response?.data?.message || err.message);
//     }
//   };

//   /* VANTA */
//   useEffect(() => {
//     const effect = window.VANTA.NET({
//       el: "#auth-bg",
//       color: 0x22d3ee,
//       backgroundColor: 0x000000,
//       points: 14,
//       spacing: 13,
//     });
//     return () => effect && effect.destroy();
//   }, []);

//   /* Card tilt */
//   useEffect(() => {
//     const card = cardRef.current;

//     const move = (e) => {
//       const r = card.getBoundingClientRect();
//       const x = e.clientX - r.left - r.width / 2;
//       const y = e.clientY - r.top - r.height / 2;
//       card.style.transform = `rotateX(${(-y / 25)}deg) rotateY(${x / 25}deg)`;
//     };

//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   const fieldStyle = {
//     mb: 2,
//     "& fieldset": { borderColor: "#444" },
//     "&:hover fieldset": { borderColor: "#22d3ee" },
//     "& .Mui-focused fieldset": {
//       borderColor: "#22d3ee",
//       boxShadow: "0 0 12px #22d3ee",
//     },
//     input: { color: "white" },
//     label: { color: "#aaa" },
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       <div id="auth-bg" style={{ position: "absolute", inset: 0 }} />

//       <Box
//         minHeight="100vh"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         zIndex={2}
//         position="relative"
//       >
//         <div
//           style={{
//             position: "absolute",
//             width: 420,
//             height: 420,
//             borderRadius: "50%",
//             background: "conic-gradient(#22d3ee,#ff9839,#22d3ee)",
//             filter: "blur(120px)",
//             animation: "spin 12s linear infinite",
//           }}
//         />

//         <Card
//           ref={cardRef}
//           sx={{
//             width: 380,
//             p: 4,
//             borderRadius: "20px",
//             background: "linear-gradient(160deg,#060b18,#02040a)",
//             border: "1px solid rgba(34,211,238,.5)",
//             boxShadow: "0 0 60px rgba(34,211,238,.4)",
//             color: "white",
//             transition: ".2s",
//           }}
//         >
//           <Box display="flex" gap={2} mb={3}>
//             <Button
//               fullWidth
//               variant={formState === 0 ? "contained" : "outlined"}
//               onClick={() => setFormState(0)}
//             >
//               LOGIN
//             </Button>
//             <Button
//               fullWidth
//               variant={formState === 1 ? "contained" : "outlined"}
//               onClick={() => setFormState(1)}
//             >
//               SIGN UP
//             </Button>
//           </Box>

//           <Typography
//             textAlign="center"
//             fontSize={26}
//             mb={3}
//             sx={{
//               background: "linear-gradient(90deg,#22d3ee,#ff9839)",
//               WebkitBackgroundClip: "text",
//               color: "transparent",
//             }}
//           >
//             Convox Meet
//           </Typography>

//           {formState === 1 && (
//             <TextField
//               label="Full Name"
//               fullWidth
//               sx={fieldStyle}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           )}

//           <TextField
//             label="Username"
//             fullWidth
//             sx={fieldStyle}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             sx={fieldStyle}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <Typography color="error">{error}</Typography>

//           <Button
//             fullWidth
//             onClick={handleAuth}
//             sx={{
//               mt: 1,
//               fontWeight: 600,
//               background: "linear-gradient(90deg,#22d3ee,#ff9839)",
//               color: "black",
//             }}
//           >
//             {formState === 0 ? "LOGIN" : "REGISTER"}
//           </Button>
//         </Card>
//       </Box>

//       <Snackbar
//         open={open}
//         autoHideDuration={2500}
//         message={message}
//         onClose={() => setOpen(false)}
//       />

//       <style>{`
//         @keyframes spin{
//           from{transform:rotate(0)}
//           to{transform:rotate(360deg)}
//         }
//       `}</style>
//     </ThemeProvider>
//   );
// }




import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Card,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Person, Lock, Badge, ArrowForward } from "@mui/icons-material";

// Modern Minimalist Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" }, // Modern Indigo
    secondary: { main: "#a855f7" }, // Modern Purple
    background: { default: "#030712", paper: "#111827" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});

export default function Authentication() {
  const cardRef = useRef(null);
  const { handleRegister, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formState, setFormState] = useState(0); // Default to Login
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        setMessage(await handleLogin(username, password));
      } else {
        setMessage(await handleRegister(name, username, password));
        setFormState(0);
      }
      setUsername("");
      setPassword("");
      setName("");
      setError("");
      setOpen(true);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  };

  /* VANTA - Adjusted for subtle professional feel */
  useEffect(() => {
    const effect = window.VANTA.NET({
      el: "#auth-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x6366f1,
      backgroundColor: 0x030712,
      points: 10,
      maxDistance: 22.0,
      spacing: 16.0,
    });
    return () => effect && effect.destroy();
  }, []);

  const fieldStyle = {
    mb: 2.5,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      transition: "0.3s",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
      "&:hover fieldset": { borderColor: "rgba(99, 102, 241, 0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#6366f1" },
    },
    "& label": { color: "rgba(255,255,255,0.5)" },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div id="auth-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />
      
      {/* Background Orbs for Depth */}
      <Box sx={{
        position: 'fixed',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
        top: '-20%',
        left: '-10%',
        zIndex: 1,
      }} />

      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={2}
        px={2}
      >
        <Card
          ref={cardRef}
          sx={{
            width: 1,
            maxWidth: 420,
            p: 4,
            borderRadius: "24px",
            background: "rgba(17, 24, 39, 0.7)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            textAlign: "center"
          }}
        >
          <Typography variant="h4" fontWeight={800} gutterBottom sx={{ 
            letterSpacing: "-1px",
            background: "linear-gradient(to right, #fff, #9ca3af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Convox Meet
          </Typography>
          
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 4 }}>
            {formState === 0 ? "Welcome back! Please enter your details." : "Create your account to start meeting."}
          </Typography>

          <Box sx={{ display: 'flex', mb: 4, p: 0.5, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <Button 
              fullWidth 
              onClick={() => setFormState(0)}
              sx={{ 
                borderRadius: '10px', 
                bgcolor: formState === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: formState === 0 ? '#fff' : 'rgba(255,255,255,0.5)'
              }}
            >Login</Button>
            <Button 
              fullWidth 
              onClick={() => setFormState(1)}
              sx={{ 
                borderRadius: '10px', 
                bgcolor: formState === 1 ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: formState === 1 ? '#fff' : 'rgba(255,255,255,0.5)'
              }}
            >Sign Up</Button>
          </Box>

          {formState === 1 && (
            <TextField
              label="Full Name"
              fullWidth
              sx={fieldStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Badge sx={{fontSize: 20, opacity: 0.6}}/></InputAdornment>,
              }}
            />
          )}

          <TextField
            label="Username"
            fullWidth
            sx={fieldStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Person sx={{fontSize: 20, opacity: 0.6}}/></InputAdornment>,
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={fieldStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock sx={{fontSize: 20, opacity: 0.6}}/></InputAdornment>,
            }}
          />

          {error && <Typography color="error" variant="caption" sx={{ display: 'block', mb: 2 }}>{error}</Typography>}

          <Button
            fullWidth
            variant="contained"
            onClick={handleAuth}
            endIcon={<ArrowForward />}
            sx={{
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              background: "linear-gradient(45deg, #6366f1, #a855f7)",
              boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.4)",
              },
              transition: "all 0.2s"
            }}
          >
            {formState === 0 ? "Sign In" : "Create Account"}
          </Button>
        </Card>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}



