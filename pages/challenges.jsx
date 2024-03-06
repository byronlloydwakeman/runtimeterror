import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import styles from './challenges.module.css';
import Link from 'next/link';

export default function Challenges() {
  // STYLING
  const buttonStyle = {
    Button: {
      color: '#045149',
      border: '1px solid #045149',
      backgroundColor: 'white',
      padding: '5px 10px',
      '&:hover': {
        backgroundColor: '#045149 !important',
        boxShadow: 'none !important',
        borderColor: 'white',
        color: 'white',
      },
    },
  };
  // STYLING

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          Week 1
        </Typography>
        <Typography sx={{ fontSize: 22 }} component="div">
          Password Generator
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
          UI • Validation • Testing • Hosting
        </Typography>
        <Typography variant="body2">
          A user interface where a user can easily generate a password string.
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="/passwordgenerator">
          <Button size="small" sx={buttonStyle.Button}>
            Visit Challenge
          </Button>
        </Link>
      </CardActions>
    </React.Fragment>
  );
  return (
    <div>
      <Navbar />
      <div className={styles.main_container}>
        <h1 className={styles.page_title}>Challenges</h1>
        <Box sx={{ width: 300 }}>
          <Card
            variant="outlined"
            sx={{ padding: '15px', borderRadius: '20px' }}
          >
            {card}
          </Card>
        </Box>
      </div>
      <NavbarBottom />
    </div>
  );
}
