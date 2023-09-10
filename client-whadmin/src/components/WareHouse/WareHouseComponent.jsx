// Library Imported
import { Fragment, useEffect, useState } from "react"

// Item Component
import WareHouse from "./Items/WareHouse"
import ProductAttributes from "./Items/ProductAttributes"

// Icons Imported
import {IoAddOutline} from "react-icons/io5"
import { IconSetting } from "../../utils/IconSettings"

// Popup Imported
import PopUp from "./PopUp/PopUp"
import Categories from "./Items/Categories"
import MoveProduct from "./Items/MoveProduct"
import Product from "./Items/Product"

// Mock data
import { ProductAttributesMockData } from "../../api/mock_data"

// API
import { getDataAPI } from "../../api/apiRequest"



const WareHouseComponent = () => {
  const [wareHouseData, setWareHouseData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [productAttributesData, setProductAttributesData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const [editedWarehouseData, setEditedWarehouseData] = useState({})
  const [editedProductCategoryData, setEditedProductCategoryData] = useState({})
  const [editedProductAttributeData, setEditedProductAttributeData] = useState({})


  
  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
          const result = await getDataAPI('warehouse');
          setWareHouseData(result.data)
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };

    const fetchProductCategoryData = async () => {
      try {
          const result = await getDataAPI('product-category');
          setProductCategoryData(result.data)
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };

    const fetchProductAttributesData = async () => {
      try {
          setProductAttributesData(ProductAttributesMockData.map(item => ({...item, required: item.required === 1 })))
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };

    const fetchProductsData = async () => {
      try {
          const result = await getDataAPI('product');
          setProductsData(result.data)
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };


    fetchWarehouseData();
    fetchProductCategoryData();
    fetchProductAttributesData();
    fetchProductsData();
  }, []);


  const handleOpenCreatedMode = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true
    }))
  }

  const handleOpenEditedMode = ({id, category_name, attribute_name, place}) => {
    if (place === "warehouse") {
      setEditedWarehouseData(wareHouseData.find(item => item.id === id))
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true
      }));
    }

    else if (place === "categories") {
      setEditedProductCategoryData(productCategoryData.find(item => item.category_name === category_name))
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true
      }));
    }

    else if (place === "product_attribute") {
      setEditedProductAttributeData(productAttributesData.find(item => item.attribute_name === attribute_name))
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true
      }));
    }
  }

  const handleDeleteData = ({id, category_name, attribute_name, place}) => {
    if (place === "warehouse") {
      setWareHouseData(preState => [...preState.filter((item) => item.id !== id)])
    } else if (place === "categories") {
      setProductCategoryData(preState => [...preState.filter((item) => item.category_name !== category_name)])
    } else if (place === "product_attribute") {
      setProductAttributesData(preState => [...preState.filter((item) => item.attribute_name !== attribute_name)])
    }
    
  }

  const WareHouseFunction = {handleOpenEditedMode, handleDeleteData};
  
  const ProductCategoryFunction = {handleOpenEditedMode, handleDeleteData};

  const ProductAttributeFunction = {handleOpenEditedMode, handleDeleteData};

  const MoveProductData = {productsData, wareHouseData};
  const WareHouseTabsMap = [
    {
      id: 'warehouse',
      component: <WareHouse data={wareHouseData} compFunction={WareHouseFunction}/>,
      created: true
    },
    {
      id: 'categories',
      component: <Categories compData={productCategoryData} compFunction={ProductCategoryFunction}/>,
      created: true
    },
    {
      id: 'product_attribute',
      component: <ProductAttributes compData={productAttributesData} compFunction={ProductAttributeFunction}/>,
      created: true
    },
    {
      id: 'products viewed',
      component: <Product compData={productsData}/>,
      created: false
    },
    {
      id: 'move_product',
      component: <MoveProduct compData={MoveProductData}/>,
      created: false
    }
  ]

  const [wareHouseTabs, setWareHouseTab] = useState(WareHouseTabsMap[0].id)

  const [popUpState, setPopUpState] = useState({
    state: false,
    created: false,
    edited: false,
    type: wareHouseTabs
  })

  const PopUpData = {popUpState, productCategoryData, productAttributesData, editedWarehouseData, editedProductCategoryData, editedProductAttributeData}
  const PopUpFunction = {setPopUpState, setWareHouseData, setProductCategoryData, setProductAttributesData}


  

  return (
    <Fragment>
      <div className="warehouse_wrapper mt-3">
        <div className="container">
          <div className="warehouse_header d-flex flex-rows justify-content-between align-items-center">
            <div className="warehouse_tabs">
              <ul className="tab_header">
                {
                  WareHouseTabsMap.map((tab) => (
                    <li className={`tab_item ${wareHouseTabs === tab.id ? "active" : ""}`} key={tab.id} 
                    onClick={() => {
                      setWareHouseTab(tab.id);
                      setPopUpState(prevState => ({...prevState, type: tab.id}))
                      }}
                    >
                      <span className="text-capitalize">{(tab.id).replace(/_/g, ' ')}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
            {
              WareHouseTabsMap.map((tab) => (
                tab.id === wareHouseTabs && tab.created === true && (
                  <div className="" key={tab.id}>
                    <button className="btn btn-success" onClick={handleOpenCreatedMode}>
                      {IconSetting(<IoAddOutline/>, "white", "16px")}
                      <span>Create</span>
                    </button>
                  </div>
                )
              ))
            }

            
          </div>


          <div className="warehouse_body">
            {
              WareHouseTabsMap.map((tab) => (
                tab.id === wareHouseTabs && (
                    <Fragment key={tab.id}>
                      {tab.component}
                    </Fragment>
                )
              ))
            }
          </div>
        </div>
      </div>

      { popUpState.state === true && <PopUp compData={PopUpData} compFunction={PopUpFunction}/>}
    </Fragment>
  )
}

export default WareHouseComponent;