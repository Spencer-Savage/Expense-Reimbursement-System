import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Login/Login'
import { Register } from './Register/Register'
import { ReimbursementsDashboard } from './Reimbursements/ReimbursementsDashboard'
import { UsersDashboard } from './Users/UsersDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reimbursements-dashboard" element={<ReimbursementsDashboard/>}/>
          <Route path="/users-dashboard" element={<UsersDashboard/>}/>
          <Route path="/not-loggedin" element={<h1>Not Logged In</h1>}/>
          <Route path="*" element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
