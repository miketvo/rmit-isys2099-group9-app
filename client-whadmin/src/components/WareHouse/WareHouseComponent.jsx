import { Fragment, useEffect, useState } from "react"

// Item Component
import WareHouse from "./Items/WareHouse"
import ProductAttributes from "./Items/ProductAttributes"

// Icons Imported
import {IoAddOutline} from "react-icons/io5"
import { IconSetting } from "../../utils/IconSettings"

import PopUp from "./PopUp/PopUp"
import Categories from "./Items/Categories"
import MoveProduct from "./Items/MoveProduct"
import { getDataAPI } from "../../api/apiRequest"


const WareHouseComponent = () => {
  const [wareHouseData, setWareHouseData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await getDataAPI('warehouse');
          setWareHouseData(result.data)
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await getDataAPI('product-category');
          setProductCategoryData(result.data)
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  

  const handleDeleteData = (id, place) => {
    if (place === "warehouse") {
      setWareHouseData(preState => [...preState.filter((item) => item.id !== id)])
    }
    
  }

  const handlePopUpForm = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true
    }))
  }

  const WareHouseFunction = {handleDeleteData}
  const ProductCategoryFunction = {handleDeleteData}
  const ProductFunction = {handleDeleteData}

  const WareHouseTabsMap = [
    {
      id: 'warehouse',
      component: <WareHouse data={wareHouseData} compFunction={WareHouseFunction}/>
    },
    {
      id: 'categories',
      component: <Categories compData={productCategoryData} compFunction={ProductCategoryFunction}/>
    },
    {
      id: 'product_attribute',
      component: <ProductAttributes compFunction={ProductFunction}/>
    },
    {
      id: 'move_product',
      component: <MoveProduct />
    }
  ]

  const [wareHouseTabs, setWareHouseTab] = useState(WareHouseTabsMap[0].id)

  const [popUpState, setPopUpState] = useState({
    state: false,
    created: false,
    type: wareHouseTabs
  })

  const PopUpData = {popUpState, wareHouseData}
  const PopUpFunction = {setPopUpState, setWareHouseData}


  

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

            <div className="">
              <button className="btn btn-success" onClick={handlePopUpForm}>
                {IconSetting(<IoAddOutline/>, "white", "16px")}
                <span>Create</span>
              </button>
            </div>
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