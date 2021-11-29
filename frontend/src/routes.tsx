import { BrowserRouter as Router, Routes as R, Route, Navigate } from "react-router-dom";
import Cart from "./components/cart";
import Home from './components/home'

const Routes = () => {
    return (
        <>
            <Router>
                <R>
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/" element={<Navigate replace to="/home" />} />
                </R>
            </Router>
        </>
    )
}

export default Routes;