import React from 'react';

import AuthProvider from './context/AuthContext';
import AppNav from './navigation/AppNav';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
