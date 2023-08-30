import PropTypes from "prop-types";

import Product from "./Product";

const PopUp = ({ compData, compFunction }) => {
  const { popUpState, productData } = compData;
  const { created, type } = popUpState;
  const { setPopUpState, setProductData } = compFunction;

  return (
    <div className="popup_wrapper">
      <div className="overlay"></div>
      <div className="popup_container p-4">
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
      type: PropTypes.oneOf(["product"]).isRequired,
    }).isRequired,
    productData: PropTypes.array.isRequired,
  }).isRequired,
  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setProductData: PropTypes.func.isRequired,
  }).isRequired,
};

export default PopUp;
