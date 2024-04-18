import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../common/Copyright";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../../Services/Common/TokenService";
import getSessionId from "../../Services/Common/SessionService";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-unused-vars
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const token = await getToken();
      if (token) {
        localStorage.setItem("request_token", token);
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/login`;
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const sessionId = await getSessionId();
        localStorage.setItem("sessionId", sessionId);
        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchSessionId();
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
export default Login;
