import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeeklyCalendar from "./components/Pages/mainview";
import RegistartionForm from "./components/Pages/registration";
import Login from "./components/Pages/login";
import Errorpage from "./components/Pages/ErrorPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistartionForm />} />
          <Route path="/signup" element={<RegistartionForm />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/calender" element={<WeeklyCalendar />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
