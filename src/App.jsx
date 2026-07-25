import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CoursePost from './pages/CoursePost';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Admin from './pages/Admin';
import AdminPostEditor from './pages/AdminPostEditor';
import NoteEditor from './pages/NoteEditor';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CoursePost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/posts/new" element={<AdminPostEditor />} />
            <Route path="/admin/posts/:id/edit" element={<AdminPostEditor />} />
            <Route path="/admin/notes/new" element={<NoteEditor />} />
            <Route path="/admin/notes/:id/edit" element={<NoteEditor />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
