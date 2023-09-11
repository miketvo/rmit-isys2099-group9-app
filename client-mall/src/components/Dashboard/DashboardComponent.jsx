import { Fragment, useEffect, useState } from "react";

// Item Component
import InboundOrder from "./Items/InboundOrder";
import Product from "./Items/Product";

// Icons Imported
import { IoAddOutline } from "react-icons/io5";
import { IconSetting } from "../../utils/IconSetting";

import { deleteDataAPI, getDataAPI } from "../../api/apiRequest";
import PopUp from "./PopUp/PopUp";

import BuyerOrder from "./Items/BuyerOrder";

import { toast } from "react-hot-toast";

const DashboardComponent = () => {
  const [productData, setProductData] = useState([]);
  const [buyerOrdersData, setBuyerOrdersData] = useState([]);
  const [inboundOrdersData, setInboundOrdersData] = useState([]);

  const [categoryData, setCategoryData] = useState([]);

  const [editedProductData, setEditedProductData] = useState({});
  const [editedInboundOrderData, setEditedInboundOrderData] = useState({});
  const [editedBuyerOrderData, setEditedBuyerOrderData] = useState({});

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role;
  const username = JSON.parse(localStorage.getItem("userInfo"))?.username;

  // Fetch data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await getDataAPI("product");
        const filteredProductBySeller = result?.data.filter(
          obj => obj.seller === username,
        );
        setProductData(filteredProductBySeller);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchProductCategoryData = async () => {
      try {
        const result = await getDataAPI("product-category");
        const categoryArray = result.data.map(item => item.category_name);
        setCategoryData(categoryArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBuyerOrderData = async () => {
      try {
        const result = await getDataAPI("buyer-order");
        const filteredBuyerOrderData = result?.data.filter(
          obj => obj.buyer === username,
        );
        setBuyerOrdersData(filteredBuyerOrderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchInboundOrderData = async () => {
      try {
        const result = await getDataAPI("inbound-order");
        const filteredInboundOrderBySeller = result?.data.filter(
          obj => obj.seller === username,
        );
        setInboundOrdersData(filteredInboundOrderBySeller);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userRole === "seller") {
      fetchProductData();
      fetchInboundOrderData();
    } else {
      fetchBuyerOrderData();
    }
    fetchProductCategoryData();
  }, [userRole, username]);

  // Function
  const handleDeleteData = async (id, place) => {
    try {
      if (place === "buyer order") {
        const response = await deleteDataAPI(`buyer-order/delete/${id}`);
        if (response.status === 200 || response.status === 201) {
          setBuyerOrdersData(preState => [
            ...preState.filter(item => item.id !== id),
          ]);
          toast.success(`Delete Order ${id} Successfully`);
        }
      } else if (place === "product") {
        const response = await deleteDataAPI(`product/delete/${id}`);
        if (response.data) {
          setProductData(preState => [
            ...preState.filter(item => item.id !== id),
          ]);
          toast.success(`Delete Product With id ${id} Successfully`);
        }
      } else if (place === "inbound order") {
        const response = await deleteDataAPI(`inbound-order/delete/${id}`);
        if (response.status === 200 || response.status === 201) {
          setInboundOrdersData(preState => [
            ...preState.filter(item => item.id !== id),
          ]);
          toast.success(`Delete Order ${id} Successfully`);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const handleOpenEdited = (id, place) => {
    if (place === "product") {
      setEditedProductData(productData.find(item => item.id === id));
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true,
      }));
    } else if (place === "inbound order") {
      setEditedInboundOrderData(inboundOrdersData.find(item => item.id === id));
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true,
      }));
    } else if (place === "buyer order") {
      setEditedBuyerOrderData(buyerOrdersData.find(item => item.id === id));
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true,
      }));
    }
  };

  const handlePopUpForm = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true,
    }));
  };

  const BuyerOrderFunction = {
    handleDeleteData,
    handleOpenEdited,
    setBuyerOrdersData,
  };
  const ProductFunction = { handleDeleteData, handleOpenEdited };
  const InboundOrderFunction = {
    handleDeleteData,
    handleOpenEdited,
    setInboundOrdersData,
  };

  const DashboardTabsMap =
    userRole === "buyer"
      ? [
          {
            id: "buyer order",
            component: (
              <BuyerOrder
                data={buyerOrdersData}
                compFunction={BuyerOrderFunction}
              />
            ),
            created: false,
          },
        ]
      : [
          {
            id: "product",
            component: (
              <Product data={productData} compFunction={ProductFunction} />
            ),
            created: true,
          },
          {
            id: "inbound order",
            component: (
              <InboundOrder
                data={inboundOrdersData}
                compFunction={InboundOrderFunction}
              />
            ),
            created: true,
          },
        ];

  const [DashboardTabs, setDashboardTabs] = useState(DashboardTabsMap[0].id);

  const [popUpState, setPopUpState] = useState({
    state: false,
    created: false,
    edited: false,
    type: DashboardTabs,
  });

  const PopUpData = {
    popUpState,
    productData,
    categoryData,
    editedProductData,
    editedInboundOrderData,
    editedBuyerOrderData,
  };
  const PopUpFunction = {
    setPopUpState,
    setProductData,
    setInboundOrdersData,
    setBuyerOrdersData,
  };

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
                tab.id === DashboardTabs &&
                tab.created === true && (
                  <div className="" key={tab.id}>
                    <button
                      className="btn btn-success"
                      onClick={handlePopUpForm}
                    >
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
