import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutPage from 'pages/layout';
import PostPage from 'pages/post';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
