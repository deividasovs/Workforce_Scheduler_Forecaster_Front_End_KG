import './App.css';
import { LandingPage, HistoricalRotasPage, CreateRotaPage, PredictionsPage } from './Pages';

import { LANDING_PAGE_EP, GENERATE_ROTA_PAGE_EP, PREDICTIONS_PAGE_EP, HISTORICAL_ROTAS_EP } from './consts';

import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter >
    <Routes>
      <Route path={PREDICTIONS_PAGE_EP} Component={PredictionsPage} />
      <Route path={HISTORICAL_ROTAS_EP} Component={HistoricalRotasPage} />
      <Route path={GENERATE_ROTA_PAGE_EP} Component={CreateRotaPage} />
      <Route path={LANDING_PAGE_EP} Component={LandingPage} />
    </Routes >
  </BrowserRouter >
)



export default App;