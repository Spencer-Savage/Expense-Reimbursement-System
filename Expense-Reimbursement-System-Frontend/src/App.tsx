import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login/Login'
import { Register } from './Components/Register/Register'
import { ReimbursementsDashboard } from './Components/Reimbursements/ReimbursementsDashboard'
import { UsersDashboard } from './Components/Users/UsersDashboard'
import { useState } from 'react';
import { Layout } from './Components/Layout/Layout';
import { SubmitReimbursement } from './Components/Reimbursements/SubmitReimbursement';

function App() {
  const [loggedUser, setLoggedUser] = useState("")

  const setStatusFromChild = (status: string) => {
    setLoggedUser(status)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout loginStatus={loggedUser} />}>
              <Route index element={<Login setLoggedInStatus={setStatusFromChild}/>}/>
              <Route path="/register" element={<Register setLoggedInStatus={setStatusFromChild}/>}/>
              <Route path="/reimbursements-dashboard" element={<ReimbursementsDashboard/>}/>
              <Route path="/submit-reimbursement" element={<SubmitReimbursement/>}/>
              <Route path="/users-dashboard" element={<UsersDashboard/>}/>
              <Route path="/not-loggedin" element={<h1>Not Logged In</h1>}/>
              <Route path="*" element={<h1>404 Not Found</h1>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
