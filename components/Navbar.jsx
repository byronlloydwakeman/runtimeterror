import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import styles from './navbar.module.css';

function Navbar() {
  const appBarStyle = {
    AppBar: {
      backgroundColor: '#045149',
    },
  };

  const buttonStyle = {
    Button: {
      color: 'white',
      borderColor: 'white',
      width: 150,
      '&:hover': {
        backgroundColor: 'white !important',
        boxShadow: 'none !important',
        borderColor: 'white',
        color: '#045149',
      },
    },
  };

  return (
    <div className={styles.navbar_container}>
      <AppBar position="static" sx={appBarStyle.AppBar}>
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                textAlign: 'start',
              }}
            >
              Runtimeterror
            </Typography>
            <div className={styles.button_group}>
              <Link href="/challenges">
                <Button sx={buttonStyle.Button}>Challenges</Button>
              </Link>
              <Link href="/aboutUs">
                <Button sx={buttonStyle.Button}>About Us</Button>
              </Link>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
