import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import styles from './challenges.module.scss';
import Link from 'next/link';
import challenge_list from '../public/challenges.json';

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

  const challengeList = challenge_list.challenges;
  const challenges = [];

  challengeList.forEach((challenge, index) => {
    challenges.push(
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            {challenge.week}
          </Typography>
          <Typography sx={{ fontSize: 22 }} component="div">
            {challenge.title}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
            {challenge.tags.map(function (tag, index) {
              return <span key={index}>{tag} • </span>;
            })}
          </Typography>
          <Typography variant="body2">{challenge.description}</Typography>
        </CardContent>
        <CardActions>
          <Link href={challenge.link}>
            <Button size="small" sx={buttonStyle.Button}>
              Visit Challenge
            </Button>
          </Link>
        </CardActions>
      </React.Fragment>
    );
  });

  return (
    <div>
      <Navbar />
      <div className={styles.main_container}>
        <h1 className={styles.page_title}>Challenges</h1>
        <div className={styles.challenge_container}>
          {challenges.map(function (challenge, index) {
            return (
              <Box
                sx={{
                  width: 300,
                  maxWidth: 300,
                  minWidth: 300,
                  maxHeight: 300,
                  height: 300,
                  minHeight: 300,
                  key: index,
                }}
              >
                <Card
                  variant="outlined"
                  sx={{ padding: '15px', borderRadius: '20px' }}
                >
                  {challenge}
                </Card>
              </Box>
            );
          })}
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
}
