import PropTypes from "prop-types";

import Product from "./Product";
import InboundOrder from "./InboundOrder";
import BuyerOrder from "./BuyerOrder";

const PopUp = ({ compData, compFunction }) => {
  const { popUpState, productData, categoryData, editedProductData, editedInboundOrderData, editedBuyerOrderData } = compData;
  const { setPopUpState, setProductData, setInboundOrdersData, setBuyerOrdersData } = compFunction;

  const { created, edited, type } = popUpState;


  return (
    <div className="popup_wrapper">
      <div className="overlay"></div>
        {type === "buyer order" && 
          <BuyerOrder 
            compData={{edited: edited, editedBuyerOrderData: editedBuyerOrderData}}
            compFunction={{ setPopUpState, setBuyerOrdersData}}
          />
        }

        {type === "product" && (
          <Product
            compData={{ created: created, edited: edited, productData: productData, categoryData: categoryData, editedProductData: editedProductData}}
            compFunction={{ setPopUpState, setProductData }}
          />
        )}

        {type === "inbound order" && (
          <InboundOrder
            compData={{ created: created, edited: edited, productData: productData, editedInboundOrderData: editedInboundOrderData}}
            compFunction={{ setPopUpState, setInboundOrdersData }}
          />
        )}
        
    </div>
  );
};

PopUp.propTypes = {
  compData: PropTypes.shape({
    popUpState: PropTypes.shape({
      created: PropTypes.bool.isRequired,
      edited: PropTypes.bool.isRequired,
      type: PropTypes.oneOf(["buyer order", "product", "inbound order"]).isRequired,
    }).isRequired,

    productData: PropTypes.array.isRequired,
    categoryData: PropTypes.array.isRequired,
    editedProductData: PropTypes.object,
    editedInboundOrderData: PropTypes.object,
    editedBuyerOrderData: PropTypes.object
    
  }).isRequired,

  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setProductData: PropTypes.func.isRequired,
    setInboundOrdersData: PropTypes.func.isRequired,
    setBuyerOrdersData: PropTypes.func.isRequired
  }).isRequired,
};

export default PopUp;
