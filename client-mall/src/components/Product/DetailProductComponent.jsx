import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"

import {GrAdd} from "react-icons/gr"
import {BiMinus} from "react-icons/bi"
import { getDataAPI } from "../../api/apiRequest"

import {toast} from "react-hot-toast"

const DetailProductComponent = () => {
    const {id} = useParams()
    const initialState = {
        id: 0,
        title: "",
        image: null,
        product_description: "",
        category: "",
        price: "",
        width: 0,
        length: 0,
        height: 0,
        seller: ""
    }
    const [detailProduct, setDetailProduct] = useState(initialState)
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        const fetchDetailProduct = async() => {
            try {
                const response = await getDataAPI(`product/${id}`)
                console.log(response.data)
                setDetailProduct(response?.data[0])
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchDetailProduct()
    }, [id])


    const handleCreateOrder = () => {
        toast.success("Create an Order")
    }
    return (
        <div className="detail_product mt-5">
            <div className="container shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="row">
                    <div className="col-5">
                        <img
                            className="card-img-top"
                            src={
                            "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                            }
                            alt="Product"
                        />
                    </div>
                    <div className="col-7 p-2">
                        <div className="">
                            <h4 className="fw-bold">{detailProduct.title}</h4>
                            <p>{detailProduct.product_description}</p>
                        </div>
                        <div className="">
                            <span>Category: {detailProduct.category}</span>
                        </div>
                        <hr />
                        <div className="">
                            <small>Price: </small>
                            <h5>$ {detailProduct.price}</h5>
                        </div>
                        <hr />
                        <div className="">
                            <div className="d-flex align-items-center">
                                <span className="me-4">Quantity: </span>
                                <div className="d-flex">
                                    <button className="btn btn-outline-secondary me-2" onClick={() => {quantity > 0 && setQuantity(quantity - 1)}}>
                                        <BiMinus />
                                    </button>
                                    <input className="form-control w-25" type="number" inputMode="numeric" aria-label="default input example"
                                    value={quantity || 0} onChange={(e) => {
                                        const newValue = e.target.value;
                                        const parsedValue = newValue ? parseInt(newValue, 10) : 0;
                                        setQuantity(parsedValue);
                                    }} 
                                    />
                                    <button className="btn btn-outline-secondary ms-2" onClick={() => setQuantity(quantity + 1)}>
                                        <GrAdd/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="btn btn-outline-primary" onClick={handleCreateOrder}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProductComponent