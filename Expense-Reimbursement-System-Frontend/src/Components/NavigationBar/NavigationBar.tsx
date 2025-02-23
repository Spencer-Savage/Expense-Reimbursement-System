import { useNavigate } from "react-router-dom";
import './NavigationBar.css';

interface NavigationBarProps {
    loginStatus: string;
  }
  
  export const NavigationBar: React.FC<NavigationBarProps> = ({ loginStatus }) => {
    const navigate = useNavigate();
    return(
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" onClick={() => navigate("/")}>CORS</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    {loginStatus === "" ? (
                        <a className="nav-item nav-link" onClick={() => navigate("/")}>Login</a>
                    ) : <></>}
                    {loginStatus === "admin" || loginStatus === "employee" ? (
                        <>
                            <a className="nav-item nav-link" onClick={() => navigate("/reimbursements-dashboard")}>Reimbursements</a>
                            <a className="nav-item nav-link" onClick={() => navigate("/submit-reimbursement")}>Submit Reimbursement</a>
                        </>
                    ) : <></>}
                    {loginStatus === "admin" ? (
                        <a className="nav-item nav-link" onClick={() => navigate("/users-dashboard")}>Users</a>
                    ) : <></>}
                </div>
            </div>
        </nav>
    )
}