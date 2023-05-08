import React, { useState, useEffect }from "react";
import { Login } from "./Login";
import { Estaciones } from "./Estaciones";
import { Solicitudes } from "./Solicitudes";
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
  // Carga las fuentes cuando se monta el componente
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

  // Renderiza el contenido de la aplicación si las fuentes se han cargado

  return (
    <>
      {isLoaded && (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
            <Routes>
              <Route path="/estaciones" element={<Estaciones />} />
            </Routes>
            <Routes>
              <Route path="/solicitudes" element={<Solicitudes />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </>
  );
}
