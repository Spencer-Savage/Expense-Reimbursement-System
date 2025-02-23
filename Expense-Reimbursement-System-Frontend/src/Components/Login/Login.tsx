import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Store } from "../../GlobalData/Store";
import { WarningAlert } from "../../Alerts/WarningAlert";

interface LoginProps {
    setLoggedInStatus: (status: string) => void;
  }
  
  export const Login: React.FC<LoginProps> = ({ setLoggedInStatus }) => {

    const navigate = useNavigate();
    const [loginCreds, setLoginCreds] = useState({username:"", password:""})
    const [error, setError] = useState("")

    const storeValues = (e:React.ChangeEvent<HTMLInputElement>) => {
        let {name, value} = e.target;
        console.log(name, value);

        setLoginCreds({...loginCreds, [name]:value})
    }

    const login = async () => {
        try {
            setError("");
            const response = await axios.post("http://localhost:8080/auth/login", loginCreds, {withCredentials:true})
            Store.loggedInUser = response.data;
            console.log("axois response")
            console.log(response.data)
            console.log("Store Data")
            console.log(Store.loggedInUser)
            setLoggedInStatus(Store.loggedInUser.role);
            navigate("/reimbursements-dashboard");
        } catch (error: any) {
            setError(error.response.data)
            console.log(error.response.data)
        }
    }

    return(
        <Container>
            <h1>Login to access:</h1>
                <div>
                    {error.length > 0 ? <WarningAlert message={error}/> : <></>}
                    <div>
                        <Form.Control
                            type="text"
                            placeholder="Enter username: (i.e. jdoe)"
                            name="username"
                            onChange={storeValues}
                        />
                    </div>

                    <div>
                        <Form.Control
                            type="password"
                            placeholder="Enter password: (i.e. example123)"
                            name="password"
                            onChange={storeValues}
                        />
                    </div>

                    <Button className="btn-success m-1" onClick={()=>login()}>Login</Button>
                    <Button className="btn-dark" onClick={()=>navigate("/register")}>Register</Button>
                </div>
        </Container>
    )
}