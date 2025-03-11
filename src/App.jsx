import { Routes, Route} from "react-router-dom";
import AdminPannal from "./Pages/dashboard/AdminPannal";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";
import EditHome from "./Pages/dashboard/EditHome";


import ListHomes from "./Pages/property/ListHomes";
import ListLands from "./Pages/property/ListLands";





function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPannal />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />     
      <Route path="/list-homes" element={<ListHomes />} />
      <Route path="/list-lands" element={<ListLands />} />
    </Routes>
  );
}

export default App;
