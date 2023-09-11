import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { putDataAPI } from "../../../api/apiRequest";

const BuyerOrder = ({ compData, compFunction }) => {
  const { edited, editedBuyerOrderData } = compData;
  const { setPopUpState, setBuyerOrdersData } = compFunction;

  const BuyerOrderState = {
    product_id: "",
    quantity: 0,
  };

  const [buyerOrderData, setBuyerOrderData] = useState(BuyerOrderState);
  const { quantity, product_id } = buyerOrderData;

  useEffect(() => {
    if (edited) {
      setBuyerOrderData(preData => ({
        ...preData,
        quantity: editedBuyerOrderData.quantity
          ? editedBuyerOrderData.quantity
          : "",
        product_id: editedBuyerOrderData.id ? editedBuyerOrderData.id : "",
      }));
    }
  }, [
    edited,
    editedBuyerOrderData.id,
    editedBuyerOrderData.product_id,
    editedBuyerOrderData.quantity,
  ]);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    const parseValue = name === "quantity" ? parseInt(value, 10) : value;
    setBuyerOrderData(preState => ({ ...preState, [name]: parseValue }));
  };

  const handleSubmitData = async e => {
    e.preventDefault();

    try {
      if (buyerOrderData.quantity > 0) {
        if (edited) {
          const response = await putDataAPI(
            `buyer-order/${editedBuyerOrderData.id}/quantity`,
            { quantity: buyerOrderData.quantity },
          );
          if (response.status === 200 || response.status === 201) {
            setBuyerOrdersData(preData =>
              preData.map(obj => {
                if (obj.id === editedBuyerOrderData.id) {
                  return {
                    ...obj,
                    quantity: buyerOrderData.quantity,
                  };
                }
                return obj;
              }),
            );
            toast.success(`Edit order ${editedBuyerOrderData.id} successfully`);
          }
        }

        handleClosePopUpForm();
      } else {
        toast.error("Quantity of a product must be larger than 1");
      }
    } catch (error) {
      toast.error("Error: ", error.response?.data?.error);
    }
  };

  const handleClosePopUpForm = () => {
    if (edited) {
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: false,
      }));
    }
  };

  return (
    <div className="popup_container p-4" style={{ top: "20%" }}>
      <form onSubmit={handleSubmitData}>
        <div className="container_fluid">
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Product ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="product_id"
                  value={product_id}
                  disabled={true}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={quantity}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="submit_btn">
            <span className="btn" onClick={handleClosePopUpForm}>
              Cancel
            </span>
            <button className="btn btn-outline-primary ms-2" type="submit">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

BuyerOrder.propTypes = {
  compData: PropTypes.shape({
    edited: PropTypes.bool.isRequired,
    editedBuyerOrderData: PropTypes.object,
  }).isRequired,

  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setBuyerOrdersData: PropTypes.func.isRequired,
  }),
};

export default BuyerOrder;
