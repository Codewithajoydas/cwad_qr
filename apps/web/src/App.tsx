import { GenerateQRPage } from "@/pages/GenerateQR";
import Header from "@/components/layout/header";
import { Routes, Route } from "react-router-dom";
// @ts-ignore
import "./styles.css";
import Scanner from "@/pages/Scanner";
import About from "@/pages/About";
import Features from "@/pages/Features";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GenerateQRPage />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </>
  );
}
