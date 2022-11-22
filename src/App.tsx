import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {getUsers} from "./store/slices/userSlice";
import {useAppDispatch} from "./store/store";
import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers())
    })

    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/edit/:id" element={<Edit/>} />
            </Routes>
        </div>
    );
}

export default App;
