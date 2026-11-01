import { GenerateQRPage } from "@/pages/GenerateQR";
import Header from "@/components/layout/header";
import { Routes, Route } from "react-router-dom";
// @ts-ignore
import "./styles.css";
import Scanner from "@/pages/Scanner";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GenerateQRPage />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/" element={<Scanner />} />
      </Routes>
    </>
  );
}
