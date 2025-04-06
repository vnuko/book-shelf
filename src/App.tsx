import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Discover from "./pages/Discover";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import AuthorDetail from "./pages/AuthorDetail";
import BookDetail from "./pages/BookDetail";
import { PlayerProvider } from "./contexts/PlayerContext";

import "./App.css";

function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Discover />} />
            <Route path="authors" element={<Authors />} />
            <Route path="books" element={<Books />} />
            <Route path="author/:authorId" element={<AuthorDetail />} />
            <Route path="book/:bookId" element={<BookDetail />} />
          </Route>
        </Routes>
      </Router>
    </PlayerProvider>
  );
}

export default App;
