import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import DetailPage from '@/pages/DetailPage';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';
import FavoritePage from './pages/FavoritePage/FavoritePage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/pokemon/:name" element={<DetailPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
