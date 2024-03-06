'use client';

import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from './passwordgenerator.module.scss';
import Navbar from '../components/Navbar';
import NavbarBottom from '../components/NavbarBottom';
import { platform } from 'os';
import Snackbar from '@mui/material/Snackbar';

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(15);
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState('');
  const [isUppercaseRequired, setIsUppercaseRequired] = useState(true);
  const [isLowercaseRequired, setIsLowercaseRequired] = useState(true);
  const [isSymbolsRequired, setIsSymbolsRequired] = useState(true);
  const [isNumbersRequired, setIsNumbersRequired] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAllFieldsUnchecked, setIsAllFieldsUnchecked] = useState(true);
  const [open, setOpen] = useState(false);

  // STYLING
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
  // STYLING

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

  const handleCopyText = (entryText) => {
    if (platform() !== 'browser') return;
    navigator.clipboard.writeText(entryText);
  };

  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleButton = () => {
    var passwordVar = generator.generate({
      length: passwordLength,
      uppercase: isUppercaseRequired,
      lowercase: isLowercaseRequired,
      numbers: isNumbersRequired,
      symbols: isSymbolsRequired,
    });
    if (!isAllFieldsUnchecked) setPassword(passwordVar);
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

  useEffect(() => {
    if (
      !isUppercaseRequired &&
      !isLowercaseRequired &&
      !isNumbersRequired &&
      !isSymbolsRequired
    ) {
      setIsAllFieldsUnchecked(true);
    } else {
      setIsAllFieldsUnchecked(false);
    }
  }, [
    isUppercaseRequired,
    isLowercaseRequired,
    isNumbersRequired,
    isSymbolsRequired,
  ]);

  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <h1 className={styles.title}>Password Generator</h1>
        {isPasswordVisible ? (
          <div className={styles.password_container}>
            <span className={styles.password}>{password}</span>
            <div className={styles.password_button_group}>
              <VisibilityOffOutlinedIcon onClick={handlePasswordVisiblity} />
              <ContentCopyIcon
                onClick={function (event) {
                  handleOpenSnackbar();
                  handleCopyText(password);
                }}
              />
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message="Password copied to clipboard."
              />
            </div>
          </div>
        ) : (
          <div className={styles.password_container}>
            <span className={styles.password}>{passwordHidden}</span>
            <div className={styles.password_button_group}>
              <VisibilityOutlinedIcon onClick={handlePasswordVisiblity} />
              <ContentCopyIcon
                onClick={function (event) {
                  handleOpenSnackbar();
                  handleCopyText(password);
                }}
              />
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message="Password copied to clipboard."
              />
            </div>
          </div>
        )}

        <div className={styles.input_container}>
          <p>Password Length: {passwordLength}</p>
          {!isAllFieldsUnchecked ? (
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
          ) : (
            <Slider
              disabled
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
          )}

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
          {!isAllFieldsUnchecked ? (
            <Button
              variant="outlined"
              sx={buttonStyle.Button}
              onClick={handleButton}
            >
              Generate
            </Button>
          ) : (
            <div className={styles.button_text_group}>
              <Button
                disabled
                variant="outlined"
                sx={buttonStyle.Button}
                onClick={handleButton}
              >
                Generate
              </Button>
              <span className={styles.warning}>
                At least one field must be selected to generate a password.
              </span>
            </div>
          )}
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
}
