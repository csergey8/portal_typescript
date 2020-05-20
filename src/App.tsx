/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Container from '@material-ui/core/Container';
import { NewsContainer } from './components/News';
import { CryptoContainer } from './components/Crypto';
import { AppProvider } from './context';
import { FlightTicketsContainer } from './components/FlightTickets';



const App = () => {

  return (
    <AppProvider>
      <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <NewsContainer />
        <FlightTicketsContainer />
        <CryptoContainer />
      </Container>
    </AppProvider>
  );
}



export default App;
