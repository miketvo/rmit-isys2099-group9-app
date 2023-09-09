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

// API
import { deleteDataAPI, getDataAPI } from "../../api/apiRequest"
import { toast } from "react-hot-toast"



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
        const result = await getDataAPI('attribute');
        setProductAttributesData(result.data.map(item => ({...item, required: item.required === 1 })))
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
      const combineEditedProductAttributeData = productAttributesData
      .filter(item => item.attribute_name === attribute_name)
      .reduce((result, item) => {
        const key = item.attribute_name;

        if (!result) {
          result = {
            attribute_name: key,
            attribute_type: item.attribute_type,
            categories: [item.category],
            required: item.required,
          };
        } else {
          result.categories.push(item.category);
        }
        return result;
      }, null);

      setEditedProductAttributeData(combineEditedProductAttributeData)
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: true
      }));
    }
  }

  const handleDeleteData = async({id, category_name, attribute_name, place}) => {
    try {
      if (place === "warehouse") {
        const response = await deleteDataAPI(`warehouse/delete/${id}`);
        if (response.data) {
          setWareHouseData(preState => [...preState.filter((item) => item.id !== id)])

          toast.success(`Delete Warehouse with ID ${id} Successfully`)
        }

      } 
      else if (place === "categories") {
        const response = await deleteDataAPI(`product-category/delete/${category_name}`);
        if (response.data) {
          setProductCategoryData(preState => [...preState.filter((item) => item.category_name !== category_name)])

          toast.success(`Delete Category with name ${category_name} Successfully`)
        }
        
      } 
      else if (place === "product_attribute") {
        const response = await deleteDataAPI(`attribute/delete/${attribute_name}`);
        if (response.data) {
          setProductAttributesData(preState => [...preState.filter((item) => (item.attribute_name !== attribute_name))])
          toast.success(`Delete Attribute ${attribute_name} Successfully`)

        }
      }
    } catch (error) {
      toast.error("Error: ", error)
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
      id: 'products view',
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