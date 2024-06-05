import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectAllPosts } from '../../Store/authSlice';
import style from "./ui.module.css"
import { Loader } from "../Loader/loader";
import { useParams } from 'react-router-dom';
function PostDetailPage() {
    const storeAllPosts = useSelector(selectAllPosts)
    let [loading, setloading] = useState(true);
    let [Userposts, setUserposts] = useState();
    const { postid } = useParams();
    useEffect(() => {

        console.log(storeAllPosts)
        let CurrentUserPosts = storeAllPosts.find((post) => {
            return post._id === postid;
        });
        console.log(CurrentUserPosts);
        if (CurrentUserPosts) {

            setloading(false)
        }
        setUserposts(CurrentUserPosts);

    }, [storeAllPosts, postid])

    console.log(Userposts)

    return (
        <div>

            <div className={`p-2  text-light ${style.Sheading} `}>

                <h2 className={style.Heading}>
                    Post Detail
                </h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        {
                            Userposts ?
                                <div className={`${style.postdetailDIv} mt-5 mb-4`}>
                                    <div className="mt-2">
                                        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                {Userposts.mediaUrls.map((pst, index) => {
                                                    return <div key={index} >

                                                        {
                                                            Userposts.mediaTypes[index].includes("image") ?
                                                                <div className={`carousel-item  ${index === 0 ? "active" : ""}`} data-bs-interval="2000">
                                                                    <img src={pst} className="d-block rounded img-fluid" style={{ width: "982px", height: "400px" }} alt="..." />
                                                                </div>
                                                                :
                                                                <div className={`carousel-item ${index === 0 ? "active" : "active"}`} data-bs-interval="2000">
                                                                    <video src={pst} className="d-block rounded img-fluid" style={{ width: "982px", height: "400px" }} controls ></video>
                                                                </div>
                                                        }

                                                    </div>
                                                })
                                                }</div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: 'black' }}></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className='row'>
                                            <h4 className=' my-2 text-success text-bold'>
                                                Post Details
                                            </h4>
                                        </div>
                                        {/* <div className="row ">
                                            {Userposts.postedBy &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Posted by</span> : <span>{Userposts.postedBy}</span>
                                                    </p>
                                                </div>
                                            }
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold"> Post created date</span> : <span>{Userposts.postCreated ? Userposts.postCreated.slice(0, 15) : 'NaN'}</span>
                                                </p>
                                            </div>

                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Post Reaction</span> : <span>{Userposts.postReactions.length}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Post Share</span> : <span>{Userposts.postShare}</span>
                                                </p>
                                            </div>
                                            <div className="col-6">
                                                <p>
                                                    <span className="fw-bold">Post comments</span> : <span>{Userposts.comments.length}</span>
                                                </p>
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            {Userposts.postedBy &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Posted by</span> : <span>{Userposts.postedBy}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.postCreated &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Post created date</span> : <span>{Userposts.postCreated.slice(0, 15)}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.postReactions &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Post Reaction</span> : <span>{Userposts.postReactions.length}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.postShare &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Post Share</span> : <span>{Userposts.postShare}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.comments &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Post comments</span> : <span>{Userposts.comments.length}</span>
                                                    </p>
                                                </div>
                                            }
                                        </div>

                                        <div className='row'>
                                            {Userposts.postDealType &&
                                                <h4 className=' my-2 text-success text-bold'>
                                                    Deal Details
                                                </h4>
                                            }
                                        </div>

                                        <div className='row'>
                                            {Userposts.postDealType &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Deal type</span> : <span>{Userposts.postDealType}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Price &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Price</span> : <span>{Userposts.Price}$</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.NoOfBedromoms &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">No Of Bedrooms</span> : <span>{Userposts.NoOfBedromoms}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.NoOfBathrooms &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">No Of Bathrooms</span> : <span>{Userposts.NoOfBathrooms}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Approx_SQFT &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Approx SQFT</span> : <span>{Userposts.Approx_SQFT}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.YearBuilt &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Built Year :</span>
                                                        <span>{Userposts.YearBuilt}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.city && Userposts.state && Userposts.zipCode &&
                                                <div className="col-12">
                                                    <p>
                                                        <span className="fw-bold">City,State - Zipcode</span> : <span>{Userposts.city + "," + Userposts.state + " - " + Userposts.zipCode}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.postDescription &&
                                                <div className="col-12">
                                                    <p>
                                                        <span className="fw-bold">Deal Description</span> : <span>{Userposts.postDescription}</span>
                                                    </p>
                                                </div>
                                            }
                                        </div>



                                        <div className='row'>
                                            <h4 className=' my-2 text-success text-bold'>
                                                Special Listing Features
                                            </h4>
                                        </div>

                                        <div className='row'>
                                            {Userposts.DwellingStyle &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Dwelling Feature</span> : <span>{Userposts.DwellingStyle}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.HAO_Feature &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">HAO Feature</span> : <span>{Userposts.HAO_Feature}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Monthly_PMT &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Monthly PMT</span> : <span>{Userposts.Monthly_PMT}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Garage_Spaces &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Garage Spaces</span> : <span>{Userposts.Garage_Spaces}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Pool &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Pool</span> : <span>{Userposts.Pool}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Basement &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Basement</span> : <span>{Userposts.Basement}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Repair_Needs &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Repair Needs</span> : <span>{Userposts.Repair_Needs}</span>
                                                    </p>
                                                </div>
                                            }
                                        </div>

                                        <div className='row'>
                                            <h4 className=' my-2 text-success text-bold'>
                                                Terms
                                            </h4>
                                        </div>
                                        <div className='row'>
                                           

                                            {Userposts.close_of_Escrow &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Close of Escrow C.O.E.</span> : <span>{Userposts.close_of_Escrow}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Sale_Type &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Sale Type:
                                                        </span> : <span>{Userposts.Sale_Type}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Estimated_Rents &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Estimated Rents

                                                        </span> : <span>{Userposts.Estimated_Rents}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Payment_PITI &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Payment (PITI)

                                                        </span> : <span>{Userposts.Payment_PITI}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Interest_Rate &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Interest Rate
                                                        </span> : <span>{Userposts.Interest_Rate}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Mortgage_Balance &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Mortgage Balance
                                                        </span> : <span>{Userposts.Mortgage_Balance}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Loan_Term &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Loan Term (Years)
                                                        </span> : <span>{Userposts.Loan_Term}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Loan_Balance &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Other Loan Balance
                                                        </span> : <span>{Userposts.Loan_Balance}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.Mortgage_Balance &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Mortgage Balance
                                                        </span> : <span>{Userposts.Mortgage_Balance}</span>
                                                    </p>
                                                </div>
                                            }


                                            {Userposts.Down_Payment &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Down Payment (Entry Fee)
                                                        </span> : <span>{Userposts.Down_Payment}</span>
                                                    </p>
                                                </div>
                                            }

                                            {Userposts.Loan_Type &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">New Loan Type:</span> : <span>{Userposts.Loan_Type}</span>
                                                    </p>
                                                </div>
                                            }

                                            {Userposts.Est_Repairs &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Est. Repairs</span> : <span>{Userposts.Est_Repairs}</span>
                                                    </p>
                                                </div>
                                            }

                                            {Userposts.ARV &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">ARV</span> : <span>{Userposts.ARV}</span>
                                                    </p>
                                                </div>
                                            }

                                            {Userposts.Est_Closing_Costs_Buy &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Est. Closing Costs (Buy)</span> : <span>{Userposts.Est_Closing_Costs_Buy}</span>
                                                    </p>
                                                </div>
                                            }

                                            {Userposts.Est_Closing_Costs_Sell &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Est. Closing Costs (Sell)</span> : <span>{Userposts.Est_Closing_Costs_Sell}</span>
                                                    </p>
                                                </div>
                                            }

                                            {Userposts.Est_Profit &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Est. Profit</span> : <span>{Userposts.Est_Profit}</span>
                                                    </p>
                                                </div>
                                            }
                                            {Userposts.other_Terms &&
                                                <div className="col-6">
                                                    <p>
                                                        <span className="fw-bold">Other</span> : <span>{Userposts.other_Terms}</span>
                                                    </p>
                                                </div>
                                            }

                                        </div>

                                    </div>
                                </div>
                                :
                                <div>
                                    <p>
                                        No Post found
                                    </p>
                                </div>
                        }

                    </div>
                </div>
            </div>
            <Loader loading={loading} />

        </div >
    )
}

export default PostDetailPage;
