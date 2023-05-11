import React, { useState, useEffect }from "react";
import { Login } from "./Login.jsx";
import { Stations } from "./Stations.jsx";
import { RequestsAdmin } from "./RequestsAdmin.jsx";
import { RequestsUser } from "./RequestsUser.jsx";
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
              <Route path="/requestsAdmin" element={<RequestsAdmin />} />
            </Routes>
            <Routes>
              <Route path="/requestsUser" element={<RequestsUser />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </>
  );
}
