import React, { useState, Fragment, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Loader } from '../Loader/loader';
import { updatePost} from "../../Store/authSlice";
import axios from 'axios';
import Select from 'react-select'
import { useDispatch} from 'react-redux'
import { toast } from "react-toastify"
const serverURL = process.env.REACT_APP_SERVER_URL;
export function EditPost(props) {
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false);
    const toggle = () => props.setEditModal(!props.modalEdit);
    const [MonthlyPMTEnable, setMonthlyPMTEnable] = useState(false);
    const [loanTypeEnable, setloanTypeEnable] = useState(false);
    const [SubtooEnable, setSubtooEnable] = useState(false);
    const [fixNEnable, setfixNEnable] = useState(false);
    const invesmentTypes = [
        { value: "Buy and hold", label: "Buy and hold" },
        { value: "Subto", label: "Subto" },
        { value: "Fix N' Flip", label: "Fix N' Flip" },
    ]
    const listingFeature = [
        { value: "SFR", label: "SFR" },
        { value: "Townhome", label: "Townhome" },
        { value: "Condo", label: "Condo" },
        { value: "Multiple Dwellings", label: "Multiple Dwellings" },
        { value: "Land", label: "Land" },
        { value: "Other", label: "Other" },
    ]
    const HAOfeatures = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ]
    const LoadTypeFeatures = [
        { value: "Conventional", label: "Conventional" },
        { value: "FHA", label: "FHA" },
        { value: "VA", label: "VA" },
        { value: "Assumable", label: "Assumable" },
        { value: "Seller Finnace", label: "Seller Finnace" },
        { value: "Cash", label: "Cash" },
        { value: "Other", label: "Other" },
    ]
    const SaleTypeFeatures = [
        { value: "Subto", label: "Subto" },
        { value: "SubWrap", label: "SubWrap" },
    ]


    const intialpost = {

        postDescription: "",
        postDealType: "",
        mediaType: '',
        Postmedia: [],
        Price: 0,
        mediaSize: 0,
        postedBy: "",
        userProfileImageSrc: "",
        postCreated: '',
        DwellingStyle: "",
        city: "",
        zipCode: 0,
        state: "",
        NoOfBedromoms: 0,
        NoOfBathrooms: 0,
        NoOfInteriorLevel: 0,
        yearOfBuilt: 0,
        Approx_SQFT: 0,
        HAO_Feature: "",
        Monthly_PMT: 0,
        Garage_Spaces: 0,
        Pool: "",
        Basement: "",
        Repair_Needs: "",
        Loan_Type: "",
        close_of_Escrow: "",
        other_Terms: "",
        Estimated_Rents: 0,
        Sale_Type: "",
        Payment_PITI: 0,
        Interest_Rate: 0,
        Mortgage_Balance: 0,
        Loan_Term: 0,
        Loan_Balance: 5,
        Est_Repairs: 0,
        ARV: 0,
        Down_Payment: 0,
        Est_Closing_Costs_Buy: 0,
        Est_Closing_Costs_Sell: 0,
        Est_Profit: 0,
        YearBuilt: 0,


    }
    const [createPostData, setCreatePostData] = useState({})
    useEffect(() => {
        if (props.singlepost) {
            console.log(props.singlepost);
            setCreatePostData(props.singlepost);
            if (props.singlepost.postDealType === "Buy and hold") {
                setloanTypeEnable(true)
            } else {
                setloanTypeEnable(false)
            }
            if (props.singlepost.postDealType === "Subto") {
                setSubtooEnable(true)
            } else {
                setSubtooEnable(false)
            }
            if (props.singlepost.postDealType === "Fix N' Flip") {
                setfixNEnable(true)
            } else {
                setfixNEnable(false)
            }
        } else {
            setCreatePostData(intialpost)
        }
    }, [props.singlepost ]);

    async function handelSubmit(e) {
        e.preventDefault();

        if (loading) {
            return
        }

        try {
            setloading(true)
                const response = await axios.post(`${serverURL}/api/posts/edit-post/${createPostData._id}
                `, createPostData)
                setloading(false)
                if (response && response.status === 200) {
                    console.log(response.data);
                    setCreatePostData(response.data.post);
                    dispatch(updatePost(response.data.post));
                    toast.success(response.data.message);
                    props.setEditModal(!props.modalEdit);

            }



        } catch (error) {
            setloading(false);
            console.log(error);
            if (error) {
                if (error.response) {
                    console.log(error.response.status);
                    toast.error(error.response.data.message);
                    console.log(error.response.data);
                } else {
                    toast.error("Failed to Create Post");
                }
            }
        }
        

    }
    return (<>
        <div>

            {props.singlepost && <Modal centered zIndex={105000} isOpen={props.modalEdit} toggle={toggle} style={{ maxWidth: '100%' }} >
                <div>
                    <ModalHeader toggle={props.toggleEdit}> <span className='fw-bold'>Edit Post</span></ModalHeader>
                    <ModalBody>

                        <form className='form' onSubmit={handelSubmit} >


                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="">Deal Type</label>
                                        <Select
                                            required
                                            value={invesmentTypes.find(option => option.value === createPostData.postDealType)}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, postDealType: e.value }))
                                                if (e.value === "Buy and hold") {
                                                    setloanTypeEnable(true)
                                                } else {
                                                    setloanTypeEnable(false)
                                                }
                                                if (e.value === "Subto") {
                                                    setSubtooEnable(true)
                                                } else {
                                                    setSubtooEnable(false)
                                                }
                                                if (e.value === "Fix N' Flip") {
                                                    setfixNEnable(true)
                                                } else {
                                                    setfixNEnable(false)
                                                }
                                            }}

                                            className={` w-100`} options={invesmentTypes}
                                        />
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <label htmlFor="">listingFeature</label>
                                        <Select
                                            required
                                            value={listingFeature.find(option => option.value === createPostData.DwellingStyle)}
                                            onChange={async (e) => {
                                                setCreatePostData((pre) => ({ ...pre, DwellingStyle: e.value }))
                                            }}

                                            className={` w-100 `} options={listingFeature}
                                        />
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <div>
                                            <label htmlFor="">City:</label>
                                            <input
                                                required
                                                value={createPostData.city}
                                                onChange={(e) => {
                                                    setCreatePostData((pre) => ({ ...pre, city: e.target.value }))
                                                }}
                                                type="text" className=" form-control " placeholder="London" />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-3">


                                        <label htmlFor="">ZipCAode:</label>
                                        <input
                                            required
                                            value={createPostData.zipCode}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, zipCode: e.target.value }))
                                            }}
                                            type="text" className="form-control" placeholder="xxxxxx" />
                                    </div>

                                    <div className=" col-12 col-md-3">

                                        <label htmlFor="">State:</label>
                                        <div>
                                            <input className="form-control"
                                                required
                                                value={createPostData.state}
                                                onChange={(e) => {
                                                    setCreatePostData((pre) => ({ ...pre, state: e.target.value }))
                                                }}
                                                type="text" placeholder="Punjab" />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <label htmlFor="">No of BedRooms</label>
                                        <input
                                            required
                                            value={createPostData.NoOfBedromoms}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, NoOfBedromoms: e.target.value }))
                                            }}
                                            type="Number" className="form-control" placeholder="Enter BedRooms" />
                                    </div>

                                    <div className="col-12 col-md-3 ">
                                        <label htmlFor="">No of BathRooms</label>
                                        <input
                                            required
                                            value={createPostData.NoOfBathrooms}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, NoOfBathrooms: e.target.value }))
                                            }}
                                            type="Number" className="form-control" placeholder="Enter BathRooms" />

                                    </div>
                                    <div className="col-12 col-md-3">

                                        <label htmlFor="">Approx SQFT</label>
                                        <input
                                            required
                                            value={createPostData.Approx_SQFT}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, Approx_SQFT: e.target.value }))
                                            }}
                                            type="Number" className=" form-control" placeholder="Enter SQFT" />
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <label htmlFor="">Built Year</label>

                                        <input
                                            required
                                            value={createPostData.YearBuilt}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, YearBuilt: e.target.value }))
                                            }}
                                            type="Number" className="form-control " placeholder="Enter Year Built" />


                                    </div>
                                    {/* <div className="col-12 col-md-3">
                                        <label htmlFor="">Choose Post Media</label>
                                        <input
                                            required
                                            onChange={handleFileChange}

                                            type="file" multiple accept="image/*, video/*" className="form-control" />
                                    </div> */}

                                    <div className="col-12 col-md-6">

                                        <label htmlFor="">Description</label>
                                        <div>
                                            <textarea rows={1}
                                                required
                                                value={createPostData.postDescription}
                                                onChange={(e) => {
                                                    setCreatePostData((pre) => ({ ...pre, postDescription: e.target.value }))
                                                }}
                                                type="text" className="form-control" placeholder="Enter post description..." />
                                        </div>
                                    </div>
                                    <div className="col-12">

                                        <h6 className=''>
                                            Special Listing Features:
                                        </h6>
                                    </div>

                                    <div className="col-12 col-md-3">
                                        <label htmlFor="">HOA</label>
                                        <Select
                                            required
                                            value={HAOfeatures.find(option => option.value === createPostData.HAO_Feature)}
                                            onChange={async (e) => {
                                                setCreatePostData((pre) => ({ ...pre, HAO_Feature: e.value }))
                                                if (e.value === 'Yes') {
                                                    setMonthlyPMTEnable(true)
                                                } else {
                                                    setMonthlyPMTEnable(false)
                                                }
                                            }}

                                            className={`w-100`} options={HAOfeatures}
                                        />
                                    </div>
                                    {MonthlyPMTEnable && <div className="col-12 col-md-3">
                                        <label htmlFor="">Monthly PMT</label>
                                        <input
                                            required
                                            value={createPostData.Monthly_PMT}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, Monthly_PMT: e.target.value }))
                                            }}
                                            type="Number" className="form-control" placeholder="Enter Monthly PMT" />


                                    </div>}

                                    <div className="col-12 col-md-3">

                                        <label htmlFor="">Garage Spaces</label>
                                        <input
                                            required
                                            value={createPostData.Garage_Spaces}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, Garage_Spaces: e.target.value }))
                                            }}
                                            type="Number" className="form-control" placeholder="Enter Garage Space" />


                                    </div>

                                    <div className="col-12 col-md-3">

                                        <label htmlFor="">Pool</label>
                                        <Select
                                            required
                                            value={HAOfeatures.find(option => option.value === createPostData.Pool)}

                                            onChange={async (e) => {
                                                setCreatePostData((pre) => ({ ...pre, Pool: e.value }))
                                            }}

                                            className={`w-100`} options={HAOfeatures}
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <label htmlFor="">Basement</label>
                                        <Select
                                            required
                                            value={HAOfeatures.find(option => option.value === createPostData.Basement)}
                                            onChange={async (e) => {
                                                setCreatePostData((pre) => ({ ...pre, Basement: e.value }))
                                            }}

                                            className={`w-100`} options={HAOfeatures}
                                        />
                                    </div>
                                    <div className="col-12 col-md-3">

                                        <label htmlFor="">Repair Needs</label>
                                        <Select
                                            required
                                            value={HAOfeatures.find(option => option.value === createPostData.Repair_Needs)}
                                            onChange={async (e) => {
                                                setCreatePostData((pre) => ({ ...pre, Repair_Needs: e.value }))
                                            }}

                                            className={` w-100`} options={HAOfeatures}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <h5 className='my-4'>
                                            Terms:
                                        </h5>
                                    </div>
                                    <div className="col-12 col-md-3">

                                        <label htmlFor="">List Price</label>
                                        <input
                                            required
                                            value={createPostData.Price}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, Price: e.target.value }))
                                            }}
                                            type="Number" className="form-control" placeholder="Enter Price" />
                                    </div>
                                    <div className="col-12 col-md-3">

                                        <label htmlFor="">Close of Escrow</label>
                                        <input
                                            required
                                            value={createPostData.close_of_Escrow}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, close_of_Escrow: e.target.value }))
                                            }}
                                            type="Date" className="w-100" placeholder="Enter Date" />


                                    </div>
                                    {
                                        loanTypeEnable && <>

                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">New Loan Type</label>
                                                <Select
                                                    required
                                                    value={LoadTypeFeatures.find(option => option.value === createPostData.Loan_Type)}
                                                    onChange={async (e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Loan_Type: e.value }))

                                                    }}

                                                    className={`w-100`} options={LoadTypeFeatures}
                                                />
                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Estimated Rents</label>
                                                <input
                                                    required
                                                    value={createPostData.Estimated_Rents}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Estimated_Rents: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Estimated Rents" />


                                            </div>

                                        </>
                                    }

                                    {
                                        SubtooEnable && < >


                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">Sale Type</label>
                                                <Select
                                                    required
                                                    value={SaleTypeFeatures.find(option => option.value === createPostData.Sale_Type)}
                                                    onChange={async (e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Sale_Type: e.value }))

                                                    }}

                                                    className={`w-100`} options={SaleTypeFeatures}
                                                />
                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Estimated Rents</label>
                                                <input
                                                    required
                                                    value={createPostData.Estimated_Rents}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Estimated_Rents: e.target.value }))
                                                    }}
                                                    type="Number" className="w-12" placeholder="Enter Estimated Rents" />


                                            </div>

                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">Payment (PITI)</label>
                                                <input
                                                    required
                                                    value={createPostData.Payment_PITI}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Payment_PITI: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Payment (PITI)" />


                                            </div>
                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">Interest Rate</label>
                                                <input
                                                    required
                                                    value={createPostData.Interest_Rate}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Interest_Rate: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Interest Rate" />

                                            </div>
                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">Mortgage Balance</label>
                                                <input
                                                    required
                                                    value={createPostData.Mortgage_Balance}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Mortgage_Balance: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Mortgage Balance" />

                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Loan Term (Years)</label>
                                                <input
                                                    required
                                                    value={createPostData.Loan_Term}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Loan_Term: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Loan Term " />


                                            </div>
                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">Other Loan Balance</label>
                                                <input
                                                    required
                                                    value={createPostData.Loan_Balance}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Loan_Balance: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" />

                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Est. Repairs</label>
                                                <input
                                                    required
                                                    value={createPostData.Est_Repairs}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Est_Repairs: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Est. Repairs" />


                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">ARV</label>
                                                <input
                                                    required
                                                    value={createPostData.ARV}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, ARV: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter ARV" />

                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Down payment (Entry Fee)</label>
                                                <input
                                                    required
                                                    value={createPostData.Down_Payment}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Down_Payment: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Down Payment" />

                                            </div>


                                        </>
                                    }

                                    {
                                        fixNEnable &&
                                        <>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Est. Repairs</label>
                                                <input
                                                    required
                                                    value={createPostData.Est_Repairs}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Est_Repairs: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Est. Repairs" />

                                            </div>

                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">ARV</label>
                                                <input
                                                    required
                                                    value={createPostData.ARV}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, ARV: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter ARV" />

                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Est. Closing Costs (Buy)</label>

                                                <input
                                                    required
                                                    value={createPostData.Est_Closing_Costs_Buy}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({ ...pre, Est_Closing_Costs_Buy: e.target.value }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Est. Closing Costs Buy" />


                                            </div>
                                            <div className="col-12 col-md-3">

                                                <label htmlFor="">Est. Closing Costs (Sell)</label>

                                                <input
                                                    required
                                                    value={createPostData.Est_Closing_Costs_Sell}
                                                    onChange={(e) => {
                                                        setCreatePostData((pre) => ({
                                                            ...pre, Est_Closing_Costs_Sell: e.target.value
                                                        }))

                                                        const newProfit = createPostData.ARV - createPostData.Est_Repairs - (createPostData.Est_Closing_Costs_Buy + createPostData.Est_Closing_Costs_Sell)

                                                        setCreatePostData((pre) => ({ ...pre, Est_Profit: newProfit }))
                                                    }}
                                                    type="Number" className="form-control" placeholder="Enter Est. Closing Costs Sell " />


                                            </div>
                                            <div className="col-12 col-md-3">
                                                <label htmlFor="">Est. Profit</label>
                                                <input
                                                    readOnly
                                                    value={createPostData.Est_Profit}
                                                    // onChange={(e) => {
                                                    //     setCreatePostData((pre) => ({ ...pre, Est_Profit: e.target.value }))
                                                    // }}
                                                    type="Number" className="form-control" placeholder="Enter Est. Closing Costs Sell " />

                                            </div>



                                        </>
                                    }
                                    <div className="col-12">
                                        <label htmlFor="">Other</label>
                                        <textarea
                                            rows={2}
                                            required
                                            value={createPostData.other_Terms}
                                            onChange={(e) => {
                                                setCreatePostData((pre) => ({ ...pre, other_Terms: e.target.value }))
                                            }}
                                            type="Number" className="form-control" placeholder="Enter other Terms" />


                                    </div>

                                </div>
                            </div>



                            <ModalFooter>

                                <Button className='mt-3' color="light" onClick={toggle}>
                                    Cancel
                                </Button> {' '}
                                <Button type='submit' color="success" >
                                    Update
                                </Button>
                            </ModalFooter>
                        </form>


                    </ModalBody>


                </div>

            </Modal >}
        </div >

        <Loader loading={loading} />
    </>);
}
