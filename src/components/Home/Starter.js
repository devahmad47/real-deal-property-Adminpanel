import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TopCards from "../Cards/TopCards";
import style from "../Pages/ui.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllActiveUsers, selecteUsers, selectAllPosts } from '../../Store/authSlice';//selectAllPinnedPosts,
import GraphComponent from "../Pages/userGraph";
import Chart from "react-apexcharts";



const Starter = () => {
  const referenceDate = new Date();

  const storeusers = useSelector(selecteUsers)
  const storeAllPosts = useSelector(selectAllPosts)
  const storeAllActiveUsers = useSelector(selectAllActiveUsers)
  const [suspendedUsers, setsuspendedUsers] = useState(0)
  const [Buyandhold, setBuyandhold] = useState(0)
  const [FixNFlip, setFixNFlip] = useState(0)
  const [Subto, setSubto] = useState(0)
  const [currentData, setcurrentData] = useState();
  const [selectedOption, setSelectedOption] = useState('Select..');
  const dispatch = useDispatch()
  useEffect(() => {
    setcurrentData(storeAllPosts);

  }, [storeAllPosts]);

  useEffect(() => {
    let suspendedUserSum = 0;
    storeusers.forEach((userobjects) => {
      if (userobjects.status === false) {
        suspendedUserSum++;
      }
    })
    setsuspendedUsers(suspendedUserSum)
  }, [dispatch, storeusers])

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedOption(selectedValue);

    if (selectedValue === 'Select..') {
      return
    }

    if (selectedValue === "7") {
      referenceDate.setDate(referenceDate.getDate() - selectedValue);
      let Result = storeAllPosts.filter((userObject) => {
        return new Date(userObject.postCreated
        ).getTime() > referenceDate.getTime();
      });
      // console.log(Result);
      setcurrentData(Result)
    } else if (selectedValue === "30") {
      referenceDate.setDate(referenceDate.getDate() - selectedValue);
      let Result = storeAllPosts.filter((userObject) => {
        return new Date(userObject.postCreated
        ).getTime() > referenceDate.getTime();
      });

      // console.log(Result);
      setcurrentData(Result)

    } else if (selectedValue === "365") {
      referenceDate.setDate(referenceDate.getDate() - selectedValue);
      let Result = storeAllPosts.filter((userObject) => {
        return new Date(userObject.postCreated
        ).getTime() > referenceDate.getTime();
      });

      // console.log(Result);
      setcurrentData(Result)

    }
    else if (selectedValue === "1") {
      referenceDate.setDate(referenceDate.getDate() - selectedValue);
      let Result = storeAllPosts.filter((userObject) => {
        return new Date(userObject.postCreated
        ).toLocaleDateString() === new Date(referenceDate).toLocaleDateString();

      });

      // console.log(Result);
      setcurrentData(Result)
    }
    else if (selectedValue === "0") {
      // console.log(new Date("2024-01-21T21:39:57.730Z").toDateString());
      referenceDate.setDate(referenceDate.getDate() - selectedValue);
      let Result = storeAllPosts.filter((userObject) => {
        return new Date(userObject.postCreated
        ).toLocaleDateString() === new Date(referenceDate).toLocaleDateString();
      });
      // console.log(Result);
      setcurrentData(Result)


    } else if (selectedValue === "all") {
      setcurrentData(storeAllPosts);

    }
    else {

      setcurrentData(storeAllPosts)
    }
    setSelectedOption('Select..')

  };



  useEffect(() => {
    let A = 0;
    let B = 0;
    let C = 0;
    if (currentData) {
      currentData.forEach((userobjects) => {
        if (userobjects.postDealType === "Subto") {
          C++;
        }
        else if (userobjects.postDealType === "Buy and hold") {
          B++
        }
        else {
          A++
        }
      })
      setSubto(C);
      setBuyandhold(B);
      setFixNFlip(A);
    }
  }, [currentData])

  var states = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Buy and hold", "Fix N` Flip", "Subto"]
      },
      title: {
        text: 'Posts deal type',
        floating: true,
        offsetY: 330,
        align: 'center',

      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
          barWidth: 10,
        }
      },
    },
    series: [
      {
        name: "Deal type",
        data: [Buyandhold, FixNFlip, Subto]
      }
    ]
  };


  return (<>


    <div className={`p-2  text-light ${style.Sheading} `}>

      <h2 className={style.Heading}>
        Reports
      </h2>
    </div>
    <div className="p-3">
      <div className={`${style.mainDashboard} `}>
        <h2>
          Satatistics
        </h2>
        <div >
          <GraphComponent />

          <div>
            {storeusers && <>
              <div>
                <p className="fw-bold ">
                  Users
                </p>
              </div>
              <Row>
                {/* <Col sm="8" lg="8">
                  <div>
                    <div id="wrapper">
                      <div id="chart-line2">
                        <Chart options={ustate.options} series={ustate.series} type="area" height={300} />
                      </div>
                      <div id="chart-line">
                        <Chart options={ustate.optionsLine} series={ustate.seriesLine} type="area" height={100} />
                      </div>
                    </div>
                    <div id="html-dist"></div>
                  </div>
                </Col> */}

                <Col sm="4" >
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="Total Users"
                    earning={storeusers.length}
                    icon="bi bi-people"
                  />
                </Col>
                <Col sm="4" >
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Last week active users"
                    earning={storeAllActiveUsers.length}
                    icon="bi bi-people"
                  />
                </Col>
                {suspendedUsers > 0 &&
                  <Col sm="4" >

                    <TopCards
                      bg="bg-light text-danger"
                      title="Suspnded Users"
                      subtitle="Suspended Users"
                      earning={suspendedUsers}
                      icon="bi bi-people"
                    />

                  </Col>
                }
              </Row>
            </>}

          </div>


          <div>
            {storeAllPosts && storeAllPosts.length > 0 && <>


              <div>
                <p className="fw-bold ">
                  Posts
                </p>
              </div>
              <div className="row">
                <div className={style.inputDivMain}>
                  <div >
                    <label style={{ fontWeight: "bold", marginLeft: "20px" }} htmlFor="userStatus">Posts time filter:</label>
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
                <div className="col-12 col-sm-8 d-flex mt-5 justify-content-center">

                  <div className="w-100" >

                    <Chart
                      options={{
                        ...states.options,
                        title: {
                          text: states.options.title.text,
                          align: 'center',
                          style: {
                            color: 'blue',
                            fontSize: '18px',
                          },
                        },
                      }}
                      series={states.series}
                      type="bar"
                      width="100%"
                      height="300px"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-4">

                  <div className="card text-white bg-dark mt-2 mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title">Total posts: {currentData ? currentData.length : "0"}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card text-primary bg-white mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title">Buy and Hold: {Buyandhold}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card text-primary bg-white  mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title">Fix N' Flip: {FixNFlip}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                  <div className="card text-primary bg-white  mx-2 shadow-lg">

                    <div className="card-body">
                      <h5 className="card-title"> Subto: {Subto}</h5>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>


              {/* <Row>
                <Col sm="6" lg="4">
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="All Posts"
                    earning={storeAllPosts.length}
                    icon="bi bi-people"
                  />
                </Col>


                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Approved Posts"
                    earning={ApprovedPosts}
                    icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    bg="bg-light-danger text-danger"
                    title="Refunds"
                    subtitle="Other Posts"
                    earning={+(storeAllPosts.length) - +(ApprovedPosts)}
                    icon="bi bi-person-dash"
                  />
                </Col>
                <div>
                <p className="fw-bold ">
                 Posts Deal Types:
                </p>
              </div>
                <Col sm="6" lg="4">
                  <TopCards
                    // bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Fix N' Flip"
                    earning={FixNFlip}
                    // icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    // bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Subto"
                    earning={Subto}
                    // icon="bi bi-person-check"
                  />
                </Col>
                <Col sm="6" lg="4">
                  <TopCards
                    // bg="bg-light-success text-success"
                    title="Sales"
                    subtitle="Buy and hold"
                    earning={Buyandhold}
                    // icon="bi bi-person-check"
                  />
                </Col>
              </Row> */}
            </>}

          </div>
          <div>
            {/* {storeAllBumperPosts && storeAllBumperPosts.length > 0 && <>
              <div>
                <p className="fw-bold ">
                  Groups
                </p>
              </div>
              <Row>
                <Col sm="12" lg="12">
                  <TopCards
                    bg=" bg-light-info text-info"
                    title="Profit"
                    subtitle="Total Groups"
                    earning={storeAllBumperPosts.length}
                    icon="bi bi-people"
                  />
                </Col>
              </Row>
            </>} */}

          </div>
        </div>
      </div>
    </div >


  </>);
};

export default Starter;
