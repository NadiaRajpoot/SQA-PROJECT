
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import UpdateProfile from "./pages/UpdateProfile";
const API_URL = "https://dummyjson.com/products";


function App() {
return (
  <div>
     <Routes>
     <Route path="/homepage" element={<HomePage/>} />
      <Route path="/" element={<SignupPage />} />
      <Route path="/login" element={<SignupPage />} />
         <Route path="/update-profile" element={<UpdateProfile />} />

    </Routes>
  </div>
)
  
}

export default App;
