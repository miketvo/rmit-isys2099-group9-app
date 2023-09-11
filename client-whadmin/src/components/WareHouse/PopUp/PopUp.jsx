import PropTypes from "prop-types";

import WareHouse from "./WareHouse";
import Categories from "./Categories";
import { Fragment } from "react";
import ProductAttributes from "./ProductAttributes";

const PopUp = ({ compData, compFunction }) => {
  const {
    popUpState,
    productCategoryData,
    editedWarehouseData,
    editedProductCategoryData,
    editedProductAttributeData,
  } = compData;
  const {
    setPopUpState,
    setWareHouseData,
    setProductCategoryData,
    setProductAttributesData,
  } = compFunction;

  const { created, edited, type } = popUpState;

  return (
    <div className="popup_wrapper">
      <div className="overlay"></div>

      <Fragment>
        {type === "warehouse" && (
          <WareHouse
            compData={{
              created: created,
              edited: edited,
              editedWarehouseData: editedWarehouseData,
            }}
            compFunction={{ setPopUpState, setWareHouseData }}
          />
        )}
        {type === "categories" && (
          <Categories
            compData={{
              created: created,
              edited: edited,
              productCategoryData: productCategoryData,
              editedProductCategoryData: editedProductCategoryData,
            }}
            compFunction={{ setPopUpState, setProductCategoryData }}
          />
        )}
        {type === "product_attribute" && (
          <ProductAttributes
            compData={{
              created: created,
              edited: edited,
              productCategoryData: productCategoryData,
              editedProductAttributeData: editedProductAttributeData,
            }}
            compFunction={{ setPopUpState, setProductAttributesData }}
          />
        )}
      </Fragment>
    </div>
  );
};

PopUp.propTypes = {
  compData: PropTypes.shape({
    popUpState: PropTypes.shape({
      created: PropTypes.bool.isRequired,
      edited: PropTypes.bool.isRequired,
      type: PropTypes.oneOf([
        "warehouse",
        "product",
        "categories",
        "product_attribute",
      ]).isRequired,
    }).isRequired,
    productCategoryData: PropTypes.array,
    productAttributesData: PropTypes.array,
    editedWarehouseData: PropTypes.object,
    editedProductCategoryData: PropTypes.object,
    editedProductAttributeData: PropTypes.object,
  }).isRequired,
  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setWareHouseData: PropTypes.func.isRequired,
    setProductCategoryData: PropTypes.func.isRequired,
    setProductAttributesData: PropTypes.func.isRequired,
  }).isRequired,
};

export default PopUp;
