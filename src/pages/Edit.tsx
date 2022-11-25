import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../store/store";
import {useNavigate, useParams} from "react-router-dom";
import {getSingleTravel, updateTravel} from "../store/slices/userSlice";

function Edit() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {travel} = useAppSelector((state) => state.travels)

    useEffect(() => {
        if (!id) return
        dispatch(getSingleTravel(id))
    }, [])

    useEffect(() => {
        if (!travel) return
        setHandleItems()
    }, [travel])

    const [item, setItem] = useState({
        title: "",
        desc: "",
        image: ""
    })

    const setHandleItems = () => {
        if (!travel) return
        setItem({
            title: travel?.title!,
            desc: travel?.desc!,
            image: travel?.image!
        })
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        let data = {
            _id: id,
            title: item?.title,
            desc: item?.desc,
            image: item?.image
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
