import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<div className="page" style={{paddingTop:'100px'}}><div className="container"><h2>项目页建设中...</h2></div></div>} />
          <Route path="/blog" element={<div className="page" style={{paddingTop:'100px'}}><div className="container"><h2>博客页建设中...</h2></div></div>} />
          <Route path="/about" element={<div className="page" style={{paddingTop:'100px'}}><div className="container"><h2>关于页建设中...</h2></div></div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
