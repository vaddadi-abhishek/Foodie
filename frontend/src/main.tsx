import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@/hooks/AuthContext"; // ✅ import your AuthProvider

createRoot(document.getElementById("root")!).render(
  <AuthProvider>   {/* ✅ wrap App in AuthProvider */}
    <App />
  </AuthProvider>
);
