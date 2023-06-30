import React from 'react';
import AppContextProvider from './contexts/AppContext';
import Router from './router/Router';

function App() {

  return (
    <AppContextProvider>
      <Router/>
    </AppContextProvider>
  );
}

export default App;
