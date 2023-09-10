import { useState } from "react";
import PropTypes from 'prop-types';

import OptionComponent from "./MoveProduct/OptionComponent"
import {FaArrowRight} from "react-icons/fa"
import { IconSetting } from "../../../utils/IconSettings"

import { stockPileMockData } from "../../../api/mock_data";

const MoveProduct = ({compData}) => {
    const {productsData, wareHouseData} = compData;

    const [seller, setSeller] = useState("")
    const [category, setCategory] = useState("")
    const [products, setProducts] = useState("")

    const [warehouseId, setWarehouseId] = useState("")
    const [warehouseMoved, setWarehouseMoved] = useState("")

    const sellersOnly = (products === "" && category === "" ) ? [...new Set(productsData.map(item => item.seller))]
                        : products !== "" ? productsData.filter(item => item.title === products).map(item => item.seller)
                        : category !== "" ? productsData.filter(item => item.category === category).map(item => item.seller)
                        : productsData.filter(item => (item.title === products && item.category === category)).map(item => item.seller)

    const categoryOnly = (products === "" && seller === "" ) ? [...new Set(productsData.map(item => item.category))]
                        : products !== "" ? productsData.filter(item => item.title === products).map(item => item.category)
                        : seller !== "" ? productsData.filter(item => item.seller === seller).map(item => item.category)
                        : productsData.filter(item => (item.seller === seller && item.title === products)).map(item => item.category)

    const productOnly = (category === "" && seller === "") ? productsData.map(item => item.title)
                        : category !== "" ? productsData.filter(item => item.category === category).map(item => item.title)
                        : seller !== "" ? productsData.filter(item => item.seller === seller).map(item => item.title)
                        : productsData.filter(item => (item.seller === seller && item.category === category)).map(item => item.title)

    function findIdByCriteria(seller, product, category) {
        const result = productsData.find(item => {
            return item.seller === seller && item.title === product && item.category === category;
        });
        
        return result ? result.id : "";
    }

    const productResultId = findIdByCriteria(seller, products, category)

    const currentProductWarehouse = stockPileMockData.find(item => item.product_id === productResultId)
    
    const wareHouseFounded = wareHouseData.find(item => item.id === currentProductWarehouse?.warehouse_id)

    const wareHouseFilter = warehouseId ? wareHouseData.filter(item => item.id !== currentProductWarehouse?.warehouse_id) : []
    
    const handleResetData = () => {
        setSeller("");
        setCategory("");
        setProducts("");
        setWarehouseId("");
        setWarehouseMoved("");
    }
    return (
        <div className="move_product mt-3">
            <div className="container_fluid">
                <div className="row g-2">
                    <OptionComponent name="Seller" compData={sellersOnly} compState={seller} compFunction={setSeller} />
                    <OptionComponent name="Category" compData={categoryOnly} compState={category} compFunction={setCategory} />
                    <OptionComponent name="Product" compData={productOnly} compState={products} compFunction={setProducts} />
                </div>
                <div className="mt-4">
                    <div className="d-flex">
                        <div className="col-5">
                            <select className="form-select" aria-label="Default select example"
                            value={warehouseId}
                            onChange={(e) => setWarehouseId(e.target.value)}>
                                <option value="">Open this select menu</option>
                                {
                                    wareHouseFounded && (
                                        <option value={`${wareHouseFounded.id}`}>{wareHouseFounded.warehouse_name}</option>
                                    )

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
                                                <li><span>Warehouse Name: {item.warehouse_name}</span></li>
                                                <li><span>Volume: {item.volume}</span></li>
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

                        </div>
                        <div className="col-5">
                            <div className="my-3"> 
                                {
                                    wareHouseFilter.map((item) =>
                                        item.id === parseInt(warehouseMoved, 10) && (
                                            <ul key={item.id}>
                                                <li><span>Warehouse Name: {item.warehouse_name}</span></li>
                                                <li><span>Volume: {item.volume}</span></li>
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
                    <button className="btn btn-outline-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}

MoveProduct.propTypes = {
    compData: PropTypes.shape({
      productsData: PropTypes.array, 
      productCategoryData: PropTypes.array,
      wareHouseData: PropTypes.array, 
    }).isRequired,
};

export default MoveProduct