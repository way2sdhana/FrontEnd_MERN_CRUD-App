import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './pages/Contact';
import GForm from './pages/GForm';
import Home from './pages/Home';
import Layout from './pages/Layout';
import MyForm from './pages/MyForm';
import NoPage from './pages/NoPage';
import ShowRec from './pages/ShowRec';
import ShowAll from './pages/Read/ShowAll';
import { MoreInfo } from './pages/Read/MoreInfo';
// import FormValidate from './FormValidate';
// import FValidate from './FValidate'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="myform" element={<MyForm />} />
            <Route path="gform" element={<GForm />} />
            <Route path="showrec" element={<ShowRec />} />
            <Route path="showrec/showall" element={<ShowAll />} />
            <Route path="showrec/showall/moreinfo/:id" element={<MoreInfo />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <FValidate /> <br/> <br/> <br/> <br/>
      <FormValidate /> */}
    </div>
  );
}

export default App;
