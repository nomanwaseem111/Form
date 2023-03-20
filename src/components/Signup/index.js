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
import { style } from '@mui/system/Stack/createStack';


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
  const [cpassword, cSetPassword] = React.useState("")
  const [blur, setBlur] = React.useState(false)

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
        cpassword,
        username: email,
        attributes: {
          email: email
        }

      });
      setEmail("")
      setPassword("")
      cSetPassword("")

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


  const handleBlur = () =>{
    setBlur(true)
  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt:"100px"
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
            
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onBlur={handleBlur}
                    style={{ border: blur ? '1px solid red' : "none"}}
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
                    pattern="^[A-Za-z0-9]{3,8}$"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="confirm Password"
                    type="password"
                    id="password"
                    pattern="^[A-Za-z0-9]{3,8}$"
                    value={cpassword}
                    onChange={(e) => cSetPassword(e.target.value)}

                  />
                </Grid>
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