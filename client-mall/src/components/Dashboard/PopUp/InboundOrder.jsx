import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import PropTypes from "prop-types";
import { postDataAPI, putDataAPI } from "../../../api/apiRequest";

const InboundOrder = ({compData, compFunction}) => {
  const { created, edited, productData, editedInboundOrderData } = compData;
  const { setPopUpState, setInboundOrdersData } = compFunction;


  const InboundOrderState = {
    product_id: "",
    quantity: 0,
  }

  const [inboundOrderData, setInboundOrderData] = useState(InboundOrderState);
  const {quantity, product_id} = inboundOrderData

  useEffect(() => {
    if (edited) {
      setInboundOrderData(preData => ({
        ...preData,
        quantity: editedInboundOrderData.quantity ? editedInboundOrderData.quantity : "",
        product_id: editedInboundOrderData.product_id ? editedInboundOrderData.product_id: ""
      }))
    }
  }, [edited, editedInboundOrderData.product_id, editedInboundOrderData.quantity])

  const handleChangeInput = (e) => {
    const {name, value} = e.target
    const parseValue = name === "quantity" ? parseInt(value, 10) : value;
    setInboundOrderData(preState => ({...preState, [name]: parseValue}))
  }

  const handleSubmitData = async(e) => {
    e.preventDefault();
    try {
      if (inboundOrderData.quantity > 0) {
        if (created) {
          const response = await postDataAPI("inbound-order/create", inboundOrderData);
          if (response.status === 200 || response.status === 201 || response.status === 201) {
            setInboundOrdersData((preData) => ([...preData, {
              id: response.data.id,
              quantity: response.data.quantity,
              product_id: parseInt(response.data.product_id, 10),
              fulfilled_time: response.data.fulfilled_time,
              fulfilled_date: response.data.fulfilled_date,
              created_time: response.data.created_time,
              created_date: response.data.created_date,
              seller: response.data.seller
            }]))

            toast.success(`Create An Order Successfully`)
          }
          
        } else if (edited) {
          const response = await putDataAPI(`inbound-order/update/${editedInboundOrderData.id}`, inboundOrderData)
          if (response.status === 200 || response.status === 201) {
            setInboundOrdersData((preData) => (preData.map(obj => {
              if(obj.id === editedInboundOrderData.id) {
                  return {
                      ...obj,
                      quantity: inboundOrderData.quantity
                  }
              }
              return obj;
            }))
            )
          }

          toast.success(`Edit order ${editedInboundOrderData.id} successfully`)
        }
    
        handleClosePopUpForm();
      } else {
        toast.error("Quantity of a product must be larger than 1")
      }
    } catch (error) {
      toast.error("Error: ", error)
    }
  }

  const handleClosePopUpForm = () => {
    if (created) {
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        created: false
      }));
    }
    else if (edited) {
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: false
      }));
    }
  };


  return (
    <div className="popup_container p-4" style={{top: "20%"}}>
      <form onSubmit={handleSubmitData}>
        <div className="container_fluid">
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Product</label>
                <select className="form-select" name="product_id" value={product_id} 
                onChange={handleChangeInput} disabled={edited ? true : false}>
                  <option value="">-- Choose product --</option>
                  {
                    productData?.map((item) => (
                      <option value={item.id} key={item.id}>{item.title}</option>
                    ))
                  }
                </select>
              </div>
              
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control"
                      name="quantity" value={quantity > 0 ? quantity : 0} onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="submit_btn">
            <span className="btn" onClick={handleClosePopUpForm}>Cancel</span>
            <button className="btn btn-outline-primary ms-2" type="submit">{created ? "Create" : "Edit"}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

InboundOrder.propTypes = {
  compData: PropTypes.shape({
    created: PropTypes.bool.isRequired,
    edited: PropTypes.bool.isRequired,
    productData: PropTypes.array.isRequired,
    editedInboundOrderData: PropTypes.object
  }).isRequired,

  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setInboundOrdersData: PropTypes.func.isRequired,
  })
};

export default InboundOrder;
