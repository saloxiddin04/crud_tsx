import React from 'react';
import {Link} from "react-router-dom";
import {useAppSelector, useAppDispatch} from "../store/store";
import {deleteTravel} from "../store/slices/userSlice";

function Home() {
    const {travels, loading} = useAppSelector((state) => state.travels)
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) => {
        if (!id) return
        dispatch(deleteTravel(id!))
    }

    return (
        <>
            <div className="mt-5">
                <div className="container d-flex justify-content-between flex-wrap">
                    {
                    loading ? 'Loading...' :
                    travels && travels.map((travel) => (
                        <div className="col-md-4 mb-3" key={travel._id}>
                            <div className="border p-2">
                                <img className="w-100" src={travel.image} alt={travel.title} style={{height: "200px"}}/>
                                <h1>{travel.title}</h1>
                                <p>{travel.desc}</p>
                                <div className="buttons">
                                    <Link className="btn btn-primary me-1" to={`/edit/${travel._id}`}>
                                        Update
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(travel._id!)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
