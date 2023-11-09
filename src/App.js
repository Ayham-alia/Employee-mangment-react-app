import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Component/Login/Login'
import Dashboard from './Component/Dashboard/Dashboard'
import ReviewHoliday from './Review_Request_Holiday/ReviewHoliday'
import CreateAccount from './Component/Create_Employee_Account/CreateAccount'
import QR from './Component/QR_Code/QR'
import ActiveUsers from './Component/Active_Users/ActiveUsers'
import UpdateUsers from './Component/Update_Users_Data/UpdateUsers'
import NotFound from './Component/NotFound/NotFound'
import Loader from './Component/Loader/Loader';
import { jwtDecode} from 'jwt-decode';
import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes'
import Edit_IPAddress from './Component/Edit_IPAddress/Edit_IPAddress'
import Archive from './Component/Archive/Archive'
import axios from 'axios'


export default function App() {
  let [companyData,setCompanyData]=useState(null);
  let token=localStorage.getItem('token');
  let Navigate=useNavigate();
  let [employees,setEmployees]=useState([]);
  let [loading,setLoading]=useState(true);
  let [TotalPages, setTotalPages] = useState();
  function getCompanyData(){
    let decoded=jwtDecode(localStorage.getItem("token"));
     setCompanyData(decoded);
  }
  //Pagination
  const handlePageChange = (data) => {
    setEmployees([]);
    getEmployees(data.selected + 1);
 };
  //get all Employee
  const getEmployees=async(curr)=>{
    let {data}=await axios.get("https://staff-scanner.vercel.app/company/getEmployees",{headers:{"Authorization":`Bearer ${token}`},params: {
      page: curr,
      perPage:7,
    }})
    setEmployees(data.employees);
    setTotalPages(data.totalPages);
    setLoading(false);
  }
  // to Logout
  function logout(){
    localStorage.removeItem("token");
    localStorage.setItem("isLogged", false);
    setCompanyData(null);
    Navigate("/login");
  }
  useEffect(()=>{
    getEmployees();
  }, []);
  return (
<>
{loading ?(<Loader/>):(
<Routes>
  <Route element={<ProtectedRoutes/>}>
  <Route path='Dashboard' element={<Dashboard logout={logout} employees={employees} handlePageChange={handlePageChange} TotalPages={TotalPages}/>}></Route>
  <Route path='ReviewHoliday' element={<ReviewHoliday/>}></Route>
  <Route path='EditIPAddress' element={<Edit_IPAddress/>}></Route>
  <Route path='CreateAccount' element={<CreateAccount/>}></Route>
  <Route path='/Archive' element={<Archive/>}></Route>
  <Route path='QRcode' element={<QR/>}></Route>
  <Route path='ActiveUsers' element={<ActiveUsers/>}></Route>
  <Route path='UpdateUsers/:id' element={<UpdateUsers />}></Route>
  </Route>
 <Route path='/' element={<Login getCompanyData={getCompanyData}/> } ></Route>
 <Route path='*' element={<NotFound/>}></Route>
</Routes>)}
</>
  )
}
