import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import styles from './navbarBottom.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';

function Navbar() {
  const appBarStyle = {
    AppBar: {
      backgroundColor: 'white',
      boxShadow: 'none !important',
    },
  };

  const buttonStyle = {
    Button: {
      color: 'white',
      borderColor: 'white',
      width: 50,
      height: 50,
      borderRadius: 1000,
      '&:hover': {
        backgroundColor: '#e6eaef !important',
        boxShadow: 'none !important',
        borderColor: 'white',
        color: '#045149',
      },
    },
  };

  const iconStyle = {
    Icon: {
      color: '#045149',
    },
  };

  return (
    <div className={styles.navbar_container}>
      <AppBar position="static" sx={appBarStyle.AppBar}>
        <Container maxWidth="false">
          <Toolbar>
            <div className={styles.button_group}>
              <a
                href="https://github.com/byronlloydwakeman/runtimeterror"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button sx={buttonStyle.Button}>
                  <GitHubIcon
                    sx={iconStyle.Icon}
                    className={styles.github_icon}
                  />
                </Button>
              </a>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
