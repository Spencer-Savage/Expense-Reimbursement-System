import { Container, FormSelect, Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import { useEffect, useState } from "react";
import { Store } from "../../GlobalData/Store";
import axios from "axios";
import { WarningAlert } from "../../Alerts/WarningAlert";
import { useNavigate } from "react-router-dom";
import { User } from "../../Interfaces/User";

export const UsersDashboard:React.FC = () => {

    const [employees, setEmployees] = useState([])
    const [filter, setFilter] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if (Store.loggedInUser.role === "admin"){
            getEmployees()
        } else{
            navigate("/not-loggedin")
        }
    },[])

    const getEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users`, {withCredentials:true})
            setEmployees(response.data)
        }
        catch(error: any){
            setError(error.response.data)
        }
    }

    const renderEmployeeRows = () => {
        return employees
            .map((employee: User) => {
                return <tr key={employee.userId}>
                    <td>{employee.userId}</td>  
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.role}</td>
                    {employee.role === "admin" ? <td></td> :
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteEmployee(employee.userId)}>Delete</button>
                        </td>
                    }
                </tr>

            }
            );
    };

    const deleteEmployee = async ( userId: number) => {
        //Todo: Implement deleteEmployee
        try {
            const response = await axios.delete(`http://localhost:8080/users/${userId}`, {withCredentials:true})
            getEmployees()
        }
        catch(error: any){
            console.log(error)
            setError(error.response.data)
        }
    }

    return(
        <Container className="container">
        <h3>User Dashboard</h3>
        {error.length > 0 ? <WarningAlert message={error} />: <></>}

        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th data-field="id" data-filter-control="select">Id</th>
              <th data-field="fName" data-filter-control="select">First Name</th>
              <th data-field="lName" data-filter-control="select">Last Name</th>
              <th data-field="lName" data-filter-control="select">Role</th>
              <th data-field="status" data-filter-control="select">Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderEmployeeRows()}
          </tbody>
        </Table>
      </Container>
    )
}