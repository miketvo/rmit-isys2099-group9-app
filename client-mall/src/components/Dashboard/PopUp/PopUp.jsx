import PropTypes from "prop-types";

import Product from "./Product";
import InboundOrder from "./InboundOrder.jsx";

const PopUp = ({ compData, compFunction }) => {
  const { popUpState, wareHouseData, productData } = compData;
  const { created, type } = popUpState;
  const { setPopUpState, setWareHouseData, setProductData } = compFunction;

  return (
    <div className="popup_wrapper">
      <div className="overlay"></div>
      <div className="popup_container p-4">
        {type === "warehouse" && (
          <InboundOrder
            compData={{ created: created, wareHouseData: wareHouseData }}
            compFunction={{ setPopUpState, setWareHouseData }}
          />
        )}
        {type === "product" && (
          <Product
            data={{ created: created, productData: productData }}
            compFunction={{ setPopUpState, setProductData }}
          />
        )}
      </div>
    </div>
  );
};

PopUp.propTypes = {
  compData: PropTypes.shape({
    popUpState: PropTypes.shape({
      created: PropTypes.bool.isRequired,
      type: PropTypes.oneOf(["warehouse", "product"]).isRequired,
    }).isRequired,
    wareHouseData: PropTypes.array.isRequired,
    productData: PropTypes.array.isRequired,
  }).isRequired,
  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setWareHouseData: PropTypes.func.isRequired,
    setProductData: PropTypes.func.isRequired,
  }).isRequired,
};

export default PopUp;
