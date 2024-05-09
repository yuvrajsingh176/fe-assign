import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import HomePage from "./components/HomePage";
import Post from "./components/Post";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="bg-[#BF40BF]   h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="edit/:id" element={<Edit />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
