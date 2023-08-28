import { Fragment, useEffect, useState } from "react"

// Item Component
import WareHouse from "./Items/WareHouse"
import Product from "./Items/Product"
import Stockpile from "./Items/Stockpile"

// Icons Imported
import {BiSearch} from "react-icons/bi"
import {IoAddOutline} from "react-icons/io5"
import { IconSetting } from "../../utils/IconSettings"

import {getDataAPI} from "../../api/fetchAPI"
import PopUp from "./PopUp/PopUp"
const WareHouseComponent = () => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await await getDataAPI('warehouse');
          setWareHouseData(result)
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
          const result = await await getDataAPI('product');
          setProductData(result)
      } catch (error) {
          // Handle the error
          console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const [wareHouseData, setWareHouseData] = useState([])
  const [productData, setProductData] = useState([])

  const handleDeleteData = (id, place) => {
    if (place === "warehouse") {
      setWareHouseData(preState => [...preState.filter((item) => item.id !== id)])
    }
    if (place === "product") {
      setProductData(preState => [...preState.filter((item) => item.id !== id)])
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
  const ProductFunction = {handleDeleteData}

  const WareHouseTabsMap = [
    {
      id: 'warehouse',
      component: <WareHouse data={wareHouseData} compFunction={WareHouseFunction}/>
    },
    {
      id: 'stockpile',
      component: <Stockpile />
    },
    {
      id: 'product',
      component: <Product data={productData} compFunction={ProductFunction}/>
    }
  ]

  const [wareHouseTabs, setWareHouseTab] = useState(WareHouseTabsMap[0].id)

  const [popUpState, setPopUpState] = useState({
    state: false,
    created: false,
    type: wareHouseTabs
  })

  const PopUpData = {popUpState, wareHouseData, productData}
  const PopUpFunction = {setPopUpState, setWareHouseData, setProductData}


  

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
                      <span className="text-capitalize">{tab.id}</span>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="">
              <div className="input-group">
                <div className="input-group-btn search-panel">
                    <div className="btn btn-default dropdown-toggle" id="filterDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span id="search_concept">Filter by</span> <span className="caret"></span>
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                      <li><a href="#contains">Contains</a></li>
                      <li><a href="#its_equal">It&apos;s equal</a></li>
                      <li><a href="#greather_than">Greather than &gt;</a></li>
                      <li><a href="#less_than">Less than &lt;    </a></li>
                      <li className="divider"></li>
                      <li><a href="#all">Anything</a></li>
                    </ul>
                </div>
                <input type="hidden" name="search_param" value="all" id="search_param" />         
                <input type="text" className="form-control" name="x" placeholder="Search term..." />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      {IconSetting(<BiSearch/>, "black", "16px")}
                    </button>
                </span>
              </div>
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