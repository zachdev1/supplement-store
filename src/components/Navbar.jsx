import './Navbar.css'
import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <>
            <div className="navbar">
                <img src="/images/supplement-icon.png" alt="supplement icon"></img>
                <h1>Supplement Store</h1>
                <Link to={"/"}>
                    <button>
                        <span>Home</span>
                    </button>
                </Link>
                <Link to={"/login"}>
                    <button>
                        <span>Login</span>
                    </button>
                </Link>
                <Link to={"/register"}>
                    <button>
                        <span>Register</span>
                    </button>
                </Link>
            </div>
        </>
    )
}