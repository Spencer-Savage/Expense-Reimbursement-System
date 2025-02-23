import { Container, FormSelect, Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.js';
import 'jquery/dist/jquery.min.js';
import { useEffect, useState } from "react";
import { Store } from "../GlobalData/Store";
import axios from "axios";
import { WarningAlert } from "../Alerts/WarningAlert";
import { useNavigate } from "react-router-dom";
import { Reimbursement } from "../Interfaces/Reimbursement";


export const ReimbursementsDashboard:React.FC = () => {

    const [reimbursements, setReimbursements] = useState([])
    const [filter, setFilter] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if (Store.loggedInUser.role === "admin"){
            getAllReimbursements()
        } else if (Store.loggedInUser.role === "employee"){
            getUserReimbursements()
        } else{
            navigate("/not-loggedin")
        }
    },[])

    const getUserReimbursements = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reimbursements/${Store.loggedInUser.userId}`, {withCredentials:true})
            setReimbursements(response.data)
        }
        catch(error: any){
            console.log(error)
            setError(error.response.data)
        }
    }

    const getAllReimbursements = async () => {
        try {
            alert("Getting all reimbursements")
            const response = await axios.get(`http://localhost:8080/reimbursements/all`, {withCredentials:true})
            setReimbursements(response.data)
        }
        catch(error: any){
            console.log(error)
            setError(error.response.data)
        }
    }

    const renderEmployeeRows = () => {
        return reimbursements.map((reimbursement: Reimbursement) => (
            filter === "" || filter === reimbursement.status ? (
                <tr key={reimbursement.reimbId}>
                    <td>{reimbursement.reimbId}</td>
                    <td>{reimbursement.user.firstName}</td>
                    <td>{reimbursement.user.lastName}</td>
                    <td>{reimbursement.description}</td>
                    <td>{reimbursement.amount}</td>
                    <td>{reimbursement.status}</td>
                </tr>
            ) : null
        ));
    };

    const renderAdminRows = () => {
        return reimbursements.map((reimbursement: Reimbursement) => (
            filter === "" || filter === reimbursement.status ? (
                <tr key={reimbursement.reimbId}>
                    <td>{reimbursement.reimbId}</td>
                    <td>{reimbursement.user.firstName}</td>
                    <td>{reimbursement.user.lastName}</td>
                    <td>{reimbursement.description}</td>
                    <td>{reimbursement.amount}</td>
                    <td>{reimbursement.status}</td>
                    <td>
                        <button className="btn btn-success" onClick={() => approveReimbursement(reimbursement)}>Approve</button>
                        <button className="btn btn-danger" onClick={() => denyReimbursement(reimbursement)}>Deny</button> 
                    </td>
                </tr>
            ) : null
        ))
    }

    const approveReimbursement = async (reimbursement: Reimbursement) => {
        try {
            const response = await axios.patch(`http://localhost:8080/reimbursements`, 
                {"status": "APPROVED", "reimbursementId": reimbursement.reimbId},
                 {withCredentials:true})
            console.log(response.data)
            getAllReimbursements()
        }
        catch(error: any){
            console.log(error)
            setError(error.response.data)
        }
    }

    const denyReimbursement = async (reimbursement: Reimbursement) => {
        try {
            const response = await axios.patch(`http://localhost:8080/reimbursements`, 
                {"status": "DENIED", "reimbursementId": reimbursement.reimbId},
                 {withCredentials:true})
            console.log(response.data)
            getAllReimbursements()
        }
        catch(error: any){
            console.log(error)
            setError(error.response.data)
        }
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    return(
        <Container className="container">
        <h3>Reimbursement Dashboard</h3>
        {error.length > 0 ? <WarningAlert message={error} />: <></>}

        <div id="filter">
            <label>Filter by Status:</label>
            <FormSelect name="reimFilter" className="form-control" onChange={(e) => {handleFilterChange(e)}}>
                <option value="">--Choose a filter--</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="DENIED">DENIED</option>
            </FormSelect>
        </div>
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th data-field="id" data-filter-control="select">Id</th>
              <th data-field="fName" data-filter-control="select">First Name</th>
              <th data-field="lName" data-filter-control="select">LastName</th>
              <th data-field="description" data-filter-control="select">Description</th>
              <th data-field="amount" data-filter-control="select">Amount</th>
              <th data-field="status" data-filter-control="select">Status</th>
            </tr>
          </thead>
          <tbody>
            {Store.loggedInUser.role === "admin" ? renderAdminRows() : renderEmployeeRows()}
          </tbody>
        </Table>
      </Container>
    )
}