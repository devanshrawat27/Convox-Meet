import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // FIX #1: import missing tha

const withAuth = (WrappedComponent) => {  // FIX #2: Capital W — convention
    const AuthComponent = (props) => {
        const router = useNavigate();

        const isAuthenticated = () => {
            if (localStorage.getItem('token')) {
                return true;
            }
            return false;
        }

        useEffect(() => {
            if (!isAuthenticated()) {
                router('/auth');
            }
        }, []);

        // FIX #3: <wrappedComponent> → <WrappedComponent> 
        // lowercase component React render nahi karta — HTML tag samajh leta hai
        return <WrappedComponent {...props} />;
    }

    return AuthComponent;
}

export default withAuth;