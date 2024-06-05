import React, { useEffect } from "react";
import style from "./ui.module.css"
import { useState } from "react";
import { Loader } from "../Loader/loader";
import { useSelector } from "react-redux";
import { selectAllPosts, selectAllPinnedPosts} from "../../Store/authSlice";
import { Button } from "reactstrap";
import { DeleteModel } from "./DeleteModel";
import { EditPost } from "./EditPost";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function Posts() {

    const StorePosts = useSelector(selectAllPosts);
    const StorePinnedPosts = useSelector(selectAllPinnedPosts);
    const [loading, setloading] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deltedId, setDeletedId] = useState('')
    const [deleteWhatUsers, setdeleteWhatUsers] = useState('')
    const [pContent, setpContent] = useState()
    const [TotalPinned, setTotalPinned] = useState(0)
    const [singlepost, setsinglepost] = useState();
    const [modalEdit, setEditModal] = useState(false);


    const maxLength = 40; // Set your desired maximum length
    useEffect(() => {
        let MyPinnedPosts = 0;
        StorePinnedPosts.forEach((userobjects) => {
            if (userobjects.isPinnedT === true) {
                MyPinnedPosts++;
            }
        })
        setTotalPinned(MyPinnedPosts)
        setcurrentData(StorePosts)
    }, [StorePosts])
    console.log(TotalPinned);
    const [currentData, setcurrentData] = useState();
    const [selectedOption, setSelectedOption] = useState('Select..');
    const referenceDate = new Date();

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;

        setSelectedOption(selectedValue);

        if (selectedValue === 'Select..') {
            toast.info("Please Select Any Options")
            return
        }

        if (selectedValue === "7") {
            referenceDate.setDate(referenceDate.getDate() - selectedValue);
            let Result = StorePosts.filter((userObject) => {
                return new Date(userObject.postCreated
                ).getTime() > referenceDate.getTime();
            });
            console.log(Result);
            setcurrentData(Result)
        } else if (selectedValue === "30") {
            referenceDate.setDate(referenceDate.getDate() - selectedValue);
            let Result = StorePosts.filter((userObject) => {
                return new Date(userObject.postCreated
                ).getTime() > referenceDate.getTime();
            });

            console.log(Result);
            setcurrentData(Result)

        } else if (selectedValue === "365") {
            referenceDate.setDate(referenceDate.getDate() - selectedValue);
            let Result = StorePosts.filter((userObject) => {
                return new Date(userObject.postCreated
                ).getTime() > referenceDate.getTime();
            });

            console.log(Result);
            setcurrentData(Result)

        }
        else if (selectedValue === "1") {
            referenceDate.setDate(referenceDate.getDate() - selectedValue);
            let Result = StorePosts.filter((userObject) => {
                return new Date(userObject.postCreated
                ).toLocaleDateString() === new Date(referenceDate).toLocaleDateString();

            });

            console.log(Result);
            setcurrentData(Result)
        }
        else if (selectedValue === "0") {
            console.log(new Date("2024-01-21T21:39:57.730Z").toDateString());
            referenceDate.setDate(referenceDate.getDate() - selectedValue);
            let Result = StorePosts.filter((userObject) => {
                return new Date(userObject.postCreated
                ).toLocaleDateString() === new Date(referenceDate).toLocaleDateString();
            });
            console.log(Result);
            setcurrentData(Result)


        } else if (selectedValue === "all") {
            setcurrentData(StorePosts);

        }
        else {

            setcurrentData(StorePosts)
        }
        setSelectedOption('Select..')

    };
    return (<>
        <div className={`p-2  text-light ${style.Sheading} `}>

            <h2 className={style.Heading}>
                All Post
            </h2>
        </div>
        <div className={style.inputDivMain}>
            <div >
                <label style={{ fontWeight: "bold", marginLeft: "20px" }} htmlFor="userStatus">Select posts:</label>
                <select
                    className={style.dropdown}
                    id="userStatus"
                    name="userStatus"
                    value={selectedOption}

                    onChange={handleDropdownChange}
                >
                    <option value="Select..">Select..</option>
                    <option value="all">All posts</option>
                    <option value="365">Last Year posts</option>
                    <option value="30">Last Month posts</option>
                    <option value="7">Last Week posts</option>
                    <option value="1">Last Day posts</option>
                    <option value="0">Today posts</option>
                </select>
            </div>
        </div>
        {currentData && currentData.length > 0 ?
            <div className="my-2 p-2">

                <div className={style.containerContent}>
                    <div className={style.HeadingContent}>
                        <div className="row">
                            <div className="col-12 table-responsive">
                                <table className="table align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col"><h2 className="fw-bold fs-5">Media</h2></th>
                                            <th scope="col"><h2 className="fw-bold fs-5">Description</h2>
                                            </th>
                                            <th scope="col"><h2 className="fw-bold fs-5">Posted by</h2></th>
                                            <th scope="col"> <h2 className="fw-bold fs-5">Posted Date</h2>

                                            </th>
                                            <th scope="col"><h2 className="fw-bold fs-5">Reported Posts</h2></th>
                                            <th scope="col"><h2 className="fw-bold fs-5">Delete</h2></th>
                                            <th scope="col"><h2 className="fw-bold fs-5">Edit</h2></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((pst, index) => {
                                            return <tr key={index}>
                                                <th scope="row"><div className="col">

                                                    <Link to={`/Admin/AdminDashboard/UserDetails/${pst.CreatorID}/Posts/${pst._id}/Postdetail`}>
                                                        {
                                                            pst.mediaTypes[0].includes("image") ?
                                                                < div >
                                                                    <img src={pst.mediaUrls[0]} alt="PostMedia" style={{ borderRadius: "1rem" }} width={"100rem"} height={"100rem"} />

                                                                </div>
                                                                :
                                                                <div>
                                                                    <video src={pst.mediaUrls[0]} controls ></video>
                                                                </div>
                                                        }

                                                    </Link>
                                                </div></th>
                                                <td> <div className="col d-flex align-items-center justify-content-center w-10">
                                                    <h2 className="fw-medium fs-6">{pst.postDescription.length > maxLength
                                                        ? pst.postDescription.substring(0, maxLength) + '...'
                                                        : pst.postDescription}</h2>
                                                </div></td>
                                                <td>                                  <div className="col d-flex align-items-center justify-content-center">
                                                    <h2 className="fw-medium fs-6">{pst.postedBy
                                                    }</h2>
                                                </div></td>
                                                <td>  <div className="col d-flex align-items-center justify-content-center">
                                                    <h2 className="fw-medium fs-6">{pst.postCreated ? pst.postCreated.slice(0, 15) : 'NaN'}</h2>
                                                </div></td>
                                                <td>   <div className="col  d-flex align-items-center justify-content-center">
                                                    {pst.isReporeted ? <span className="fw-bold fs-6  text-danger">Reported post</span> : <span className="fw-bold fs-6  text-success"> Not reported</span>
                                                    }
                                                </div></td>
                                                <td>  <div className="col d-flex align-items-center justify-content-center">
                                                    <Button className="Reject"
                                                        onClick={() => {
                                                            setDeletedId(pst._id)
                                                            setModal(!modal);
                                                            setdeleteWhatUsers("Post")
                                                            setpContent(' Are you sure you want to Delete  this Post? This action cannot be undone.')
                                                        }}
                                                    ><i className="bi bi-trash3"></i></Button>
                                                </div></td>
                                                <td>  <div className="col d-flex align-items-center justify-content-center">

                                                    <Button className="Reject"
                                                        onClick={() => {
                                                            // setDeletedId(pst._id)
                                                            setEditModal(true);
                                                            setsinglepost(StorePosts[index])
                                                        }}
                                                    ><i className="fa-regular fa-pen-to-square"></i></Button>
                                                </div></td>
                                            </tr>
                                        })
                                        }

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>
            </div> :
            <div className=" text-xl d-flex  align-items-center my-5 justify-content-center">
                <p className="text-center center fw-bolder ">
                    No Posts Found
                </p>
            </div>
        }

        <DeleteModel modal={modal} setModal={setModal} toggle={toggle} pContent={pContent} deleteWhat={deleteWhatUsers} deltedId={deltedId} setDeletedId={setDeletedId} />

        <EditPost modalEdit={modalEdit} setEditModal={setEditModal} singlepost={singlepost} />


        <Loader loading={loading} />
    </>)
}