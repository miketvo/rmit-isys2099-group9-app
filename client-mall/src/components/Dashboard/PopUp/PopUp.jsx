import PropTypes from "prop-types";

import Product from "./Product";

const PopUp = ({ compData, compFunction }) => {
  const { popUpState, productData, categoryData, editedData } = compData;
  const { setPopUpState, setProductData } = compFunction;

  const { created, edited, type } = popUpState;


  return (
    <div className="popup_wrapper">
      <div className="overlay"></div>
      <div className="popup_container p-4">
        {type === "product" && (
          <Product
            compData={{ created: created, edited: edited, productData: productData, categoryData: categoryData, editedData: editedData}}
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
      edited: PropTypes.bool.isRequired,
      type: PropTypes.oneOf(["product"]).isRequired,
    }).isRequired,

    productData: PropTypes.array.isRequired,
    categoryData: PropTypes.array.isRequired,
    editedData: PropTypes.object
    
  }).isRequired,

  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setProductData: PropTypes.func.isRequired,
  }).isRequired,
};

export default PopUp;
