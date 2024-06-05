import React, { useState } from 'react';
import style from "./ui.module.css";
import { Loader } from "../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import { addAd, selectAllAds } from '../../Store/authSlice';
import { DeleteModel } from './DeleteModel';
function Tasks() {
    const dispatch = useDispatch()
    const storeAllAds = useSelector(selectAllAds)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [postdata, setPostdata] = useState({ adsDiscription: "", adsRating: 0 });
    const [deltedId, setDeletedId] = useState()
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    const serverURL = process.env.REACT_APP_SERVER_URL;
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };


    const handleInput = (e) => {

        setPostdata((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(selectedFile);

        if (selectedFile && postdata.adsDiscription.trim() !== "" && postdata.adsRating !== 0) {

            setLoading(true);
            const compressedFile = await imageCompression(selectedFile, options);
            console.log(compressedFile)
            const formData = new FormData();
            formData.append('AdsImage', compressedFile);
            formData.append('adsDiscription', postdata.adsDiscription);
            formData.append('adsRating', postdata.adsRating);
            try {


                const response = await axios.post(`${serverURL}/api/tasks/add-tasks`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setLoading(false);

                if (response && response.status === 200) {
                    console.log(response);
                    dispatch(addAd(response.data.ad))
                    toast.success(response.data.message);
                }
            } catch (error) {
                setLoading(false);
                console.log(error)
                // if (error.response) {
                //     const errorMessage = error.response.data.message || "Failed to upload Ads";
                //     toast.error(errorMessage);
                // } else {
                //     console.error("Failed to upload Ads", error.message);
                // }
            }
        } else {
            toast.error("Please fill in all the required fields and upload one image");
        }
    };


    return (
        <div>
            <div className={`p-2  text-light ${style.Sheading} `}>

                <h2 className={style.Heading}>
                    Ads
                </h2>
            </div>
            <div className="container">
                <div className="col-12">
                    <h3 className='mt-2'>Add ads</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 mt-3">
                        <form onSubmit={submit} >

                            <div className="row">

                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <h6>
                                            Ads Image
                                        </h6>
                                        <input

                                            type="file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} className="form-control "
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <h6>
                                            Ads Rating
                                        </h6>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="adsRating"
                                            placeholder="Ads rating"
                                            name='adsRating'
                                            step="0.1"
                                            min="1"
                                            max="5"
                                            value={postdata.adsRating}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">

                                    <div className="mb-3">
                                        <h6>
                                            Ads Description
                                        </h6>
                                        <textarea className="form-control" value={postdata.adsDiscription} id="adsDiscription" onChange={handleInput} name='adsDiscription' rows="4" placeholder="Please mention here ads description. "></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary px-4 mb-5">Submit Ad</button>
                                </div>
                            </div>








                        </form>
                    </div>
                </div>
            </div>

            {storeAllAds && storeAllAds.length > 0 &&
                <div>
                    <div className="container ">
                        <div className="row  ">
                            <div className="col-12">
                                <h3 className='my-5'>Ads Listing:</h3>
                            </div>
                            {storeAllAds.map((ad, index) => {
                                return <div key={index} className="col-md-3 mb-4">
                                    <div className="card">
                                        <img src={ad.adsImageUrl} className="card-img-top" style={{ height: "150px" }} alt="Card" />
                                        <div className="card-body">
                                            <p className="card-text">{ad.adsDiscription}</p>
                                            <div className="d-flex justify-content-between">
                                                <div className="rating">
                                                    Rating: <strong>{ad.adsRating}</strong>
                                                </div>

                                                <i className="fa-solid fa-trash-can text-danger" onClick={() => {
                                                    setDeletedId(ad._id)
                                                    setModal(!modal);
                                                    setdeleteWhatUsers("ads")
                                                    setpContent(' Are you sure you want to Delete Ad? All of your data will be permanently removed. This action cannot be undone.')
                                                }} style={{ cursor: 'pointer' }}></i>
                                                


                                                {/* <button className="btn btn-primary">Buy Now</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>

                    </div>
                </div>
            }
            <Loader loading={loading} />
            <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} />
        </div>
    )
}

export default Tasks
