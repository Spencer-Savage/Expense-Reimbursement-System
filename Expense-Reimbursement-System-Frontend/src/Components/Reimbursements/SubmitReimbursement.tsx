import { Button, Container, Form } from "react-bootstrap"
import { WarningAlert } from "../../Alerts/WarningAlert"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Store } from "../../GlobalData/Store";
import axios from "axios";

export const SubmitReimbursement:React.FC = () => {
    const navigate = useNavigate();
    const [reimbursement, setReimbursement] = useState({userId: Store.loggedInUser.userId, description:"",amount: 0})
    const [error, setError] = useState("")
    
    const storeValues = (e:React.ChangeEvent<HTMLInputElement>) => {
        let {name, value} = e.target;

        setReimbursement({...reimbursement, [name]:value})
    }

    const validateReimbursement = () => {
        setError("")
        if (reimbursement.description === ""){ 
            setError("Please enter a description")
            return false
        }
        if (reimbursement.amount <= 0){
            setError("Please enter a valid amount")
            return false
        }
        if (isNaN(reimbursement.amount)){
            setError("Please enter a valid amount")
            return false
        }

        return true
    }


    const postReimbursement = async () => {
        if (!validateReimbursement()){
            return;
        }

        try {
            await axios.post("http://localhost:8080/reimbursements", reimbursement, {withCredentials:true})
            navigate("/reimbursements-dashboard");
        } catch (error: any) {
            setError(error.response.data)
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
            if (Store.loggedInUser.role === ""){
                navigate("/not-loggedin")
            }
        },[])

    return(
        <Container>
            <h3>Create New Reimbursement:</h3>
            {error.length > 0 ? <WarningAlert message={error}/> : <></>}
                <div>
                    <Form.Control
                        type="text"
                        placeholder="Enter Description of Expense: (i.e. Travel)"
                        name="description"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="numeric"
                        placeholder="Enter Amount: (i.e. 100)"
                        name="amount"
                        onChange={storeValues}
                        min={0.00}
                    />
                </div>

                <Button className="btn-success m-1" onClick={()=>postReimbursement()}>Submit</Button>
                <Button className="btn-dark" onClick={()=>navigate("/reimbursements-dashboard")}>Cancel</Button>
        </Container>
    )
}