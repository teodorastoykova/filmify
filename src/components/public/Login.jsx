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
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate= useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-unused-vars
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/authentication/token/new",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const responseData = response.data;
        if (responseData.success) {
          localStorage.setItem("request_token", responseData.request_token);
          window.location.href = `https://www.themoviedb.org/authenticate/${responseData.request_token}?redirect_to=http://localhost:5173/login`;
          setIsLoggedIn(true);
        } else {
          console.error("Failed to get request token.");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };


useEffect(() => {
    const options = {
      method: "POST",
      url: "https://api.themoviedb.org/3/authentication/session/new",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThkYzk1YTAxNDQyY2NmZDM0YzJlOWY0MmRiNjY5MCIsInN1YiI6IjY2MTNlOGU5MGJiMDc2MDE0ODJmYjYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6UGD_8V7MgsHRv2EizIyg5KV9ZZb9cHGV4A_Nq_UNY",
      },
      data: { request_token: localStorage.getItem("request_token") },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("Current sessionId is: " + response.data.session_id)
        localStorage.setItem("sessionId", response.data.session_id)
        navigate('/')
      })
      .catch(function (error) {
        console.error(error);
      });
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
