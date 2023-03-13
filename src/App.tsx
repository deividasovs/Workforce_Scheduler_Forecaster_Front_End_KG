import './App.css';
import { LandingPage, HistoricalRotasPage, RotaGenerationPage, PredictionsPage } from './Pages';

import { LANDING_PAGE_EP, GENERATE_ROTA_PAGE_EP, PREDICTIONS_PAGE_EP, HISTORICAL_ROTAS_EP } from './consts';

import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter >
    <Routes>

      <Route path={HISTORICAL_ROTAS_EP} Component={HistoricalRotasPage} />
      <Route path={GENERATE_ROTA_PAGE_EP} Component={RotaGenerationPage} />
      <Route path={LANDING_PAGE_EP} Component={LandingPage} />
    </Routes >
  </BrowserRouter >
)

//<Route path={PREDICTIONS_PAGE_EP} Component={PredictionsPage} />

export default App;