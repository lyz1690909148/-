import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shell from "@/components/layout/Shell";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import StandardDetail from "@/pages/StandardDetail";
import Favorites from "@/pages/Favorites";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/standard/:id" element={<StandardDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
