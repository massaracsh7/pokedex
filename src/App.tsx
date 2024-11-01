import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "@/pages/MainPage";
import DetailPage from "@/pages/DetailPage";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
