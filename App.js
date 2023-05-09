import React, { useState, useEffect }from "react";
import { Login } from "./Login";
import { Stations } from "./Stations";
import { Requests } from "./Requests";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Font from 'expo-font';
import { ThemeProvider, createTheme } from '@mui/material/styles';

async function loadFonts() {
  await Font.loadAsync({
    'Product Sans Regular': require('./assets/fonts/Product-Sans-Bold.ttf'),
    'Product Sans Bold': require('./assets/fonts/Product-Sans-Regular.ttf'),
  });
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await loadFonts();
      setIsLoaded(true);
    }
    load();
  }, []);

const theme = createTheme({
  typography: {
    fontFamily: 'Product Sans Regular',
  },
});

  return (
    <>
      {isLoaded && (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
            <Routes>
              <Route path="/stations" element={<Stations />} />
            </Routes>
            <Routes>
              <Route path="/requests" element={<Requests />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </>
  );
}
