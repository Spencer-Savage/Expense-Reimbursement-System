import { useNavigate } from "react-router-dom";
import './NavigationBar.css';

interface NavigationBarProps {
    loginStatus: string;
  }
  
  export const NavigationBar: React.FC<NavigationBarProps> = ({ loginStatus }) => {
    const navigate = useNavigate();
    return(
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light mb-5">
            <a className="navbar-brand">CORS</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
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
                {loginStatus === "" ? (
                        <a className="nav-item nav-link ms-auto me-5" onClick={() => navigate("/")}>Login</a>
                    ) : <></>}
                {loginStatus !== "" ? (
                        <a className="nav-item nav-link ms-auto me-5" href={"/"}>Logout</a>
                    ) : <></>}
            </div>
        </nav>
    )
}