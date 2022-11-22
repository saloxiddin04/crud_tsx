import React, {useState} from 'react';
import {useAppDispatch} from "../store/store";
import {addTravel} from "../store/slices/userSlice";
import {useNavigate} from "react-router-dom";

function Add() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [image, setImage] = useState<string>("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (!title || !desc || !image) {
            alert("All input field")
        } else {
            dispatch(addTravel({title, desc, image}))
            setTitle("")
            setDesc("")
            setImage("")
            navigate("/")

        }
    }
    return (
        <>
            <div className="container text-center">
                <h1>Add Travel</h1>
                <div className="row">
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-2">
                        <input
                            className="border p-1 rounded form-control"
                            type="text"
                            placeholder="Country name"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            className="border p-1 rounded form-control"
                            type="text"
                            placeholder="Description"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <input
                            className="border p-1 rounded form-control"
                            type="text"
                            placeholder="Image link"
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Add Post</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Add;
