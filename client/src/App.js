import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './common/Layout';
import Dashboard from './Dashboard';
import Login from "./admin/Login";
import Userlist from "./admin/Userlist";
import ChangePassword from './admin/Change';
import Profile from './admin/Profile';
import View from './admin/View';
import Edit from "./admin/Edit";
import Privacy from './admin/Privacy';
import AboutUs from "./admin/AboutUs";
import TermAndConditions from "./admin/TermAndCondition";
import PrivateRoute from './Private';
import Provider from "./provider/Provider";
import ProviderView from "./provider/ProviderView";
import Workers from "./worker/Workers";
import WorkerView from "./worker/WorkerView";
import CategoryList from "./categeory/CategeoryList";
import CategeoryView from "./categeory/CategeoryView";
import CategoryAdd from "./categeory/CategoryAdd";
import ServiceList from "./service/ServiceList";
import ServiceView from "./service/ServiceView";
import ServiceAdd from "./service/ServiceAdd";
import BookingList from "./booking/BookingList";
import BookingView from "./booking/BookingView";
import CarList from "./car/CarList";
import CarView from "./car/CarView";
import ContactUs from "./admin/ContactUs";
import ContactView from "./admin/ContactView";
import CarAdd from "./car/CarAdd";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/userlist" element={<Userlist />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/viewuser/:_id" element={<View />} />
            <Route path="/edituser/:_id" element={<Edit />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/terms" element={<TermAndConditions />} />
            <Route path='/provider' element={<Provider/>}/>
            <Route path='/providerview/:_id' element={<ProviderView />} />
            <Route path="/worker" element={< Workers/>}/>
            <Route path="/workerview/:_id" element={<WorkerView/>}/>
            <Route path='/categeorylist' element={<CategoryList/>}/>
            <Route path='/viewcategeory/:_id' element={<CategeoryView/>}/>
            <Route path='/createcategory' element={<CategoryAdd/>}/>
            <Route path="/services" element={<ServiceList/>}/>
            <Route path='/service/:_id' element={<ServiceView/>}/>
            <Route path='/createservice' element={<ServiceAdd/>}/>
            <Route path="/booking" element={<BookingList/>}/>
            <Route path="/booking/:_id" element={<BookingView/>}/>
            <Route path="/carlist" element={<CarList/>}/>
            <Route path="/carview/:_id" element={<CarView/>}/>
            <Route path="/getcontact" element={<ContactUs/>}/>
            <Route path="/viewcontact/:_id" element={<ContactView/>}/>
            <Route path="/createcar" element={<CarAdd/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
