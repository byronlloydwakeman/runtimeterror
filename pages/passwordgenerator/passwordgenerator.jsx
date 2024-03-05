'use client';

import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import styles from './passwordgenerator.module.css';
import Navbar from '../../components/Navbar';

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(15);
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState('');
  const [isUppercaseRequired, setIsUppercaseRequired] = useState(true);
  const [isLowercaseRequired, setIsLowercaseRequired] = useState(true);
  const [isSymbolsRequired, setIsSymbolsRequired] = useState(true);
  const [isNumbersRequired, setIsNumbersRequired] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const buttonStyle = {
    Button: {
      color: 'white',
      borderColor: 'white',
      width: 200,
      '&:hover': {
        backgroundColor: 'white !important',
        boxShadow: 'none !important',
        borderColor: 'white',
        color: '#045149',
      },
    },
  };

  const checkboxStyle = {
    Checkbox: {
      color: 'white',
      '&.Mui-checked': {
        color: 'white',
      },
    },
  };

  var generator = require('generate-password-browser');

  const handleSlider = (event, sliderValue) => {
    if (sliderValue != null) {
      setPasswordLength(sliderValue);
    }
  };

  useEffect(() => {
    let text = '';

    for (let i = 0; i < passwordLength; i++) {
      text += '•';
    }

    setPasswordHidden(text);

    handleButton();
  }, [passwordLength]);

  const handleButton = () => {
    var passwordVar = generator.generate({
      length: passwordLength,
      uppercase: isUppercaseRequired,
      lowercase: isLowercaseRequired,
      numbers: isNumbersRequired,
      symbols: isSymbolsRequired,
    });

    setPassword(passwordVar);
  };

  const handleUpperCase = () => {
    setIsUppercaseRequired(!isUppercaseRequired);
  };

  const handleLowerCase = () => {
    setIsLowercaseRequired(!isLowercaseRequired);
  };

  const handleNumbers = () => {
    setIsNumbersRequired(!isNumbersRequired);
  };

  const handleSymbols = () => {
    setIsSymbolsRequired(!isSymbolsRequired);
  };

  const handlePasswordVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Password Generator</h1>
      {isPasswordVisible ? (
        <div className={styles.password_container}>
          <span className={styles.password}>{password}</span>
          <Button variant="text">
            <Image
              src="/eye-off.svg"
              width={25}
              height={25}
              alt="visibility"
              onClick={handlePasswordVisiblity}
            />
          </Button>
        </div>
      ) : (
        <div className={styles.password_container}>
          <span className={styles.password}>{passwordHidden}</span>
          <Button variant="text">
            <Image
              src="/eye.svg"
              width={25}
              height={25}
              alt="visibility"
              onClick={handlePasswordVisiblity}
            />
          </Button>
        </div>
      )}

      <div className={styles.input_container}>
        <p>Password Length: {passwordLength}</p>
        <Slider
          sx={{
            color: 'white',
            width: 300,
          }}
          valueLabelDisplay="off"
          marks
          min={0}
          max={30}
          step={1}
          onChange={handleSlider}
          value={passwordLength}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={checkboxStyle.Checkbox}
              onChange={handleUpperCase}
            />
          }
          label="Include Uppercase Letters"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={checkboxStyle.Checkbox}
              onChange={handleLowerCase}
            />
          }
          label="Include Lowercase Letters"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={checkboxStyle.Checkbox}
              onChange={handleNumbers}
            />
          }
          label="Include Numbers"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={checkboxStyle.Checkbox}
              onChange={handleSymbols}
            />
          }
          label="Include Symbols"
        />
        <Button
          variant="outlined"
          sx={buttonStyle.Button}
          onClick={handleButton}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
