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

  const [categoryData, setCategoryData] = useState([])

  const [editedData, setEditedData] = useState({})

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role
  const username = JSON.parse(localStorage.getItem("userInfo"))?.username

  // Fetch data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await getDataAPI("product");
        const filteredProductBySeller = result?.data.filter((obj) => obj.seller === username);
        setProductData(filteredProductBySeller);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchProductCategoryData = async () => {
      try {
        const result = await getDataAPI("product-category");
        const categoryArray = result.data.map((item) => item.category_name);
        setCategoryData(categoryArray)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductData();

    fetchProductCategoryData();
  }, [username]);

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
    else if (place === "product") {
      setProductData(preState => [...preState.filter(item => item.id !== id)]);
    }
  };

  
  const handleOpenEdited = (id, place) => {
    if (place === "product") {
      setEditedData(productData.find(item => item.id === id))
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true
      }));
    }
  }

  const handlePopUpForm = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true,
    }));
  };

  const BuyerOrderFunction = { handleDeleteData };
  const ProductFunction = { handleDeleteData, handleOpenEdited };
  const InboundOrderFunction = {handleDeleteData, handleOpenEdited};


  const DashboardTabsMap = userRole === "buyer" ?
    [
      {
        id: "buyer order",
        component: <BuyerOrder data={buyerOrderData} compFunction={BuyerOrderFunction} />,
        created: false
      }
    ]
    :
    [
      {
        id: "product",
        component: <Product data={productData} compFunction={ProductFunction} />,
        created: true,
      }
      ,
      {
        id: "inbound order",
        component: <InboundOrder data={inboundOrderData} compFunction={InboundOrderFunction}/>,
        created: false
      },
    ];

  const [DashboardTabs, setDashboardTabs] = useState(DashboardTabsMap[0].id);

  const [popUpState, setPopUpState] = useState({
    state: false,
    created: false,
    edited: false,
    type: DashboardTabs,
  });

  const PopUpData = { popUpState, productData, categoryData, editedData };
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

            
            {DashboardTabsMap.map(
              tab =>
                tab.id === DashboardTabs && tab.created === true && (
                  <div className="" key={tab.id}>
                    <button className="btn btn-success" onClick={handlePopUpForm}>
                      {IconSetting(<IoAddOutline />, "white", "16px")}
                      <span>Create</span>
                    </button>
                  </div>
                ),
            )}
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
