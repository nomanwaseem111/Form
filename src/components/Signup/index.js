import * as React from 'react';
import { Auth } from 'aws-amplify';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  // const handleSubmit = (event) => {
  //   event.preventDefault();


  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  async function signUp(e) {
    e.preventDefault()

    // console.log(email);
    // console.log(password);

    try {
      const { user } = await Auth.signUp({

        password,
        username: email,
        attributes: {
          email: email
        }

      });
      setEmail("")
      setPassword("")

      console.log("User", user);


      swal({
        title: "Signup Successfully",
        icon: "success",
        button: false,
        timer: 3000,
      });
    } catch (error) {
      console.log('error signing up:', error);
      swal({
        title: error.message,
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
  }




  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'red' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box noValidate sx={{ mt: 3 }}>
            <form onSubmit={signUp} >
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  type="text"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  type="text"

                />
              </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
              
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,background:"red",":hover":{background:"red"}}}
              >
                Sign Up
              </Button>
            </form>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/signin" variant="body2" style={{color:"red"}}>
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}