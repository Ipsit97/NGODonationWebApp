import './App.css';
import FormPage from './pages/FormPage/FormPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUpFormNGO from './components/Auth/SignUpFormNGO/SignUpFormNGO';
import SignUpFormCustomer from './components/Auth/SignUpFormCustomer/SignUpFormCustomer';
import LoginFormNGO from './components/Auth/LoginFormNGO/LoginFormNGO';
import LoginFormCustomer from './components/Auth/LoginFormCustomer/LoginFormCustomer';
import UserSelectionForm from './components/Auth/UserSelectionForm';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import HomeNGO from './pages/Home/HomeNGO';
import HomeCustomer from './pages/Home/HomeCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/homeNGO" element={ <HomeNGO />}/> 
          <Route path="/" element={<UserSelectionForm />}/>
          <Route exact path="/form" element={<FormPage/>}/>
          <Route path="/summary" element={<SummaryPage/>}/>
          <Route path="/signUpNGO" element={<SignUpFormNGO/>}/>
          <Route path="/loginNGO" element={<LoginFormNGO/>} />
          <Route path="/homeCustomer" element={<HomeCustomer/>} />
          <Route path="/signUpCustomer" element={<SignUpFormCustomer/>} />
          <Route path="/loginCustomer" element={<LoginFormCustomer/>} />
        </Routes>  
    </Router>
    </div>
  );
}

export default App;
