import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {getSingleTravel, updateTravel} from "../store/slices/userSlice";
import {travel} from "../interfaces/user";

function Edit() {
    const [item, setItem] = useState({
        title: "",
        desc: "",
        image: ""
    })
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const travel = useAppSelector<any>((state) => state.travels.travel)

    useEffect(() => {
        dispatch(getSingleTravel(id))
    }, [])

    useEffect(() => {
        if (travel) {
            setItem({
                title: travel.title,
                desc: travel.desc,
                image: travel.image
            })
        }
    }, [travel])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let data = {
            _id: travel._id,
            title: travel.title,
            desc: travel.desc,
            image: travel.image
        }
        dispatch(updateTravel(data))
        alert("Travel edited successfully!")
        navigate("/")
    }

    return (
        <>
            <div className="container text-center">
                <h1>Edit Travel</h1>
                <div className="row">
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-2">
                        <input
                            className="border p-1 rounded col-md-6 form-control"
                            type="text"
                            placeholder="Country name"
                            value={item.title || ""}
                            onChange={(e) => setItem({...item, title: e.target.value})}
                        />
                        <input
                            className="border p-1 rounded col-md-6 form-control"
                            type="text"
                            placeholder="Description"
                            value={item.desc || ""}
                            onChange={(e) => setItem({...item, desc: e.target.value})}
                        />
                        <input
                            className="border p-1 rounded col-md-6 form-control"
                            type="text"
                            placeholder="Image link"
                            value={item.image || ""}
                            onChange={(e) => setItem({...item, image: e.target.value})}
                        />
                        <button type="submit" className="btn btn-primary">Edit Post</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;
