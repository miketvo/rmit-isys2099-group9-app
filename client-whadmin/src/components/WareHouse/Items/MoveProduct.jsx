import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import OptionComponent from "./MoveProduct/OptionComponent"
import {FaArrowRight} from "react-icons/fa"
import { IconSetting } from "../../../utils/IconSettings"

import { toast } from "react-hot-toast";
import { getDataAPI, postDataAPI } from "../../../api/apiRequest";

const MoveProduct = ({compData}) => {
    const {productsData, wareHouseData} = compData;
    const [stockpileData, setStockpileData] = useState([])

    const fetchStockpileData = async() => {
        try {
          const result = await getDataAPI('stock');
          setStockpileData(result.data)
        } catch (error) {
            // Handle the error
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchStockpileData();
    }, [])

    const [seller, setSeller] = useState("")
    const [category, setCategory] = useState("")
    const [productID, setProductID] = useState("")

    const [warehouseId, setWarehouseId] = useState("")
    const [warehouseMoved, setWarehouseMoved] = useState("")

    const [quantityProductMoved, setQuantityProductMoved] = useState(0);

    const sellersOnly = (productID !== "" && category !== "" ) ? productsData.filter(item => (item.id === parseInt(productID, 10) && item.category === category)).map(item => item.seller)
                        : productID !== "" ? productsData.filter(item => item.id === parseInt(productID, 10)).map(item => item.seller)
                        : category !== "" ? productsData.filter(item => item.category === category).map(item => item.seller)
                        : [...new Set(productsData.map(item => item.seller))] 

    const categoryOnly = (productID !== "" && seller !== "" ) ?  productsData.filter(item => (item.seller === seller && item.id === parseInt(productID, 10))).map(item => item.category)
                        : seller !== "" ? productsData.filter(item => item.seller === seller).map(item => item.category)
                        : productID !== "" ? productsData.filter(item => item.id === parseInt(productID, 10)).map(item => item.category)
                        : [...new Set(productsData.map(item => item.category))]

    const productOnly = (category !== "" && seller !== "") ? productsData.filter(item => (item.seller === seller && item.category === category)).map(item => ({id: item.id, title: item.title}))
                        : seller !== "" ? productsData.filter(item => item.seller === seller).map(item => ({id: item.id, title: item.title}))
                        : category !== "" ? productsData.filter(item => item.category === category).map(item => ({id: item.id, title: item.title}))
                        : productsData.map(item => ({id: item.id, title: item.title})) 
    

    const [wareHouseFounded, setWareHouseFounded] = useState([]);
    const [currentQuantityProduct, setCurrentQuantityProduct] = useState(0);
    

    useEffect(() => {
        function findIdByCriteria(seller, productID, category) {
            const result = productsData.find(item => {
                return item.seller === seller && item.id === parseInt(productID, 10) && item.category === category;
            });
            
            return result ? result.id : "";
        }

        if (seller && productID && category) {
            const productResultId = findIdByCriteria(seller, productID, category)

            const currentProductWarehouse = stockpileData.filter(item => item.product_id === productResultId)

            const resultArray = currentProductWarehouse?.map((item) => {
                return wareHouseData.find((wh) => wh.id === item.warehouse_id) || []
            });


            const getCurrentQuantityProductInWarehouse = currentProductWarehouse.find(item => item.warehouse_id === parseInt(warehouseId, 10))

            setWareHouseFounded(resultArray);
            setCurrentQuantityProduct(getCurrentQuantityProductInWarehouse?.quantity)
        } else {
            setWareHouseFounded([]);
            setCurrentQuantityProduct(0);
            setWarehouseId("")
        }
    }, [warehouseId, warehouseMoved, wareHouseData, seller, productID, category, productsData, stockpileData]);
    
    const wareHouseFilter = warehouseId ? wareHouseData.filter(item => item.id !== parseInt(warehouseId, 10)) : []

    
    const handleResetData = () => {
        setSeller("");
        setCategory("");
        setProductID("");
        setWarehouseId("");
        setWarehouseMoved("");
        setCurrentQuantityProduct(0);

        // Fetch again after reset
        fetchStockpileData();
    }

    const handleChangeQuantity = (e) => {
        const {value} = e.target;
        const parseValue = parseInt((value > 0 ? value : 0), 10)
        setQuantityProductMoved(parseValue)
    }

    const handleMoveProduct = async() => {
        try {
            if (productID && quantityProductMoved && warehouseId && warehouseMoved) {
                if (quantityProductMoved > 0) {
                    const postData = {
                        product_id: parseInt(productID, 10), 
                        move_quantity: parseInt(quantityProductMoved, 10), 
                        from_warehouse_id: parseInt(warehouseId, 10), 
                        to_warehouse_id: parseInt(warehouseMoved, 10)
                    }
                    console.log(postData)
                    const response = await postDataAPI("warehouse/move-product", postData)
                    console.log(response)
                    if (response.data) {
                        toast.success("Move A Product Successfully!")
                    }
                } else {
                    toast.error("You need to input number of products that need to move")
                }
            } else {
                toast.error("You need to enter all information before move product")
            }
        } catch (error) {
            toast.error("Error: ", error)
        }
        
        
    }

    return (
        <div className="move_product mt-3">
            <div className="container_fluid">
                <div className="row g-2">
                    <OptionComponent name="seller" compData={sellersOnly} compState={seller} compFunction={setSeller} />
                    <OptionComponent name="category" compData={categoryOnly} compState={category} compFunction={setCategory} />
                    <OptionComponent name="product" compData={productOnly} compState={productID} compFunction={setProductID} />
                </div>
                <div className="mt-4">
                    <div className="d-flex">
                        <div className="col-5">
                            <select className="form-select" aria-label="Default select example"
                            value={warehouseId}
                            onChange={(e) => setWarehouseId(e.target.value)}>
                                <option value="">Open this select menu</option>
                                {
                                    wareHouseFounded && wareHouseFounded.map(warehouse => (
                                        <option value={warehouse.id} key={warehouse.id}>{warehouse.warehouse_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">             
                            {IconSetting(<FaArrowRight/>, "black", "25px", "")}
                        </div>
                        <div className="col-5">
                            <select className="form-select" aria-label="Default select example"
                            value={warehouseMoved}
                            onChange={(e) => setWarehouseMoved(e.target.value)}>
                                <option value="">Open this select menu</option>
                                {
                                    wareHouseFilter.length > 0 && wareHouseFilter.map(item => (
                                        <option value={`${item.id}`} key={item.id}>{item.warehouse_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="col-5">                                
                            <div className="my-3">
                                {
                                    wareHouseData.map((item) =>
                                        item.id === parseInt(warehouseId, 10) && (
                                            <ul key={item.id}>
                                                <li><span className="fw-bold">Warehouse Name: {item.warehouse_name}</span></li>
                                                <li><span className="fw-bold">Total Volume: {item.volume}</span></li>
                                                <li><span className="fw-bold">Available Volume: {item.available_volume}</span></li>
                                                <li><span>Province: {item.province}</span></li>
                                                <li><span>City: {item.city}</span></li>
                                                <li><span>District: {item.district}</span></li>
                                                <li><span>Street Number: {item.street_number}</span></li>
                                                <li><span>Street: {item.street}</span></li>
                                            </ul>
                                        ) 
                                    )
                                }
                            </div>

                        </div>
                        <div className="col-2">
                            {
                                currentQuantityProduct > 0 && (
                                   
                                    <div className="d-flex justify-content-start align-items-center px-3 my-3">
                                        <label className="form-label mb-0 me-2">Quantity: </label>
                                        <input type="number" className="form-control w-25" value={quantityProductMoved} 
                                        onChange={handleChangeQuantity}/>
                                        <span className="fw-bold ms-2">/ {currentQuantityProduct}</span>
                                    </div>
                                    
                                )
                            }
                            
                            
                        </div>
                        <div className="col-5">
                            <div className="my-3"> 
                                {
                                    wareHouseFilter.map((item) =>
                                        item.id === parseInt(warehouseMoved, 10) && (
                                            <ul key={item.id}>
                                                <li><span className="fw-bold">Warehouse Name: {item.warehouse_name}</span></li>
                                                <li><span className="fw-bold">Total Volume: {item.volume}</span></li>
                                                <li><span className="fw-bold">Available Volume: {item.available_volume}</span></li>
                                                <li><span>Province: {item.province}</span></li>
                                                <li><span>City: {item.city}</span></li>
                                                <li><span>District: {item.district}</span></li>
                                                <li><span>Street Number: {item.street_number}</span></li>
                                                <li><span>Street: {item.street}</span></li>
                                            </ul>
                                        ) 
                                    )
                                }  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 d-flex flex-row float-end">
                    <button className="btn btn-outline-secondary me-3" onClick={handleResetData}>Reset</button>
                    <button className="btn btn-outline-primary" onClick={handleMoveProduct}>Submit</button>
                </div>
            </div>
        </div>
    )
}

MoveProduct.propTypes = {
    compData: PropTypes.shape({
      productsData: PropTypes.array, 
      wareHouseData: PropTypes.array, 
    }).isRequired,
};

export default MoveProduct