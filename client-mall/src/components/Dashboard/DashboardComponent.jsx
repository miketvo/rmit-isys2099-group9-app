import { Fragment, useEffect, useState } from "react";

// Item Component
import InboundOrder from "./Items/InboundOrder";
import Product from "./Items/Product";

// Icons Imported
import { IoAddOutline } from "react-icons/io5";
import { IconSetting } from "../../utils/IconSetting";

import { getDataAPI } from "../../api/apiRequest";
import PopUp from "./PopUp/PopUp";

import BuyerOrder from "./Items/BuyerOrder";

// Import Mock data
import { buyerOrderMockData, inboundOrderMockData } from "../../api/mock_data";



const DashboardComponent = () => {
  const [productData, setProductData] = useState([]);
  const [buyerOrderData, setBuyerOrderData] = useState([]);
  const [inboundOrderData, setInboundOrderData] = useState([]);

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role


  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataAPI("product");
        setProductData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setBuyerOrderData(buyerOrderMockData)
  }, [buyerOrderData])

  useEffect(() => {
    setInboundOrderData(inboundOrderMockData)
  }, [buyerOrderData])


  // Function
  const handleDeleteData = (id, place) => {
    if (place === "buyerOrder") {
      setBuyerOrderData(preState => [...preState.filter(item => item.id !== id)]);
    }
  };

  const handlePopUpForm = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true,
    }));
  };

  const ProductFunction = { handleDeleteData };
  const BuyerOrderFunction = { handleDeleteData };


  const DashboardTabsMap = userRole === "buyer" ?
    [
      {
        id: "buyer order",
        component: <BuyerOrder data={buyerOrderData} compFunction={BuyerOrderFunction} />,
      }
    ]
    :
    [
      {
        id: "product",
        component: <Product data={productData} compFunction={ProductFunction} />,
      }
      ,
      {
        id: "inbound order",
        component: (
          <InboundOrder data={inboundOrderData} compFunction={ProductFunction}/>
        ),
      },
    ];

  const [DashboardTabs, setDashboardTabs] = useState(DashboardTabsMap[0].id);

  const [popUpState, setPopUpState] = useState({
    state: false,
    created: false,
    type: DashboardTabs,
  });

  const PopUpData = { popUpState, productData };
  const PopUpFunction = { setPopUpState, setProductData };

  return (
    <Fragment>
      <div className="dashboard_wrapper mt-5">
        <div className="container">
          <div className="warehouse_header d-flex flex-rows justify-content-between align-items-center">
            <div className="dashboard_tabs">
              <ul className="tab_header">
                {DashboardTabsMap.map(tab => (
                  <li
                    className={`tab_item ${
                      DashboardTabs === tab.id ? "active" : ""
                    }`}
                    key={tab.id}
                    onClick={() => {
                      setDashboardTabs(tab.id);
                      setPopUpState(prevState => ({
                        ...prevState,
                        type: tab.id,
                      }));
                    }}
                  >
                    <span className="text-capitalize">{tab.id}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <button className="btn btn-success" onClick={handlePopUpForm}>
                {IconSetting(<IoAddOutline />, "white", "16px")}
                <span>Create</span>
              </button>
            </div>
          </div>

          <div className="dashboard_body">
            {DashboardTabsMap.map(
              tab =>
                tab.id === DashboardTabs && (
                  <Fragment key={tab.id}>{tab.component}</Fragment>
                ),
            )}
          </div>
        </div>
      </div>

      {popUpState.state === true && (
        <PopUp compData={PopUpData} compFunction={PopUpFunction} />
      )}
    </Fragment>
  );
};

export default DashboardComponent;
