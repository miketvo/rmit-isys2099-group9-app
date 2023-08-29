import PropTypes from "prop-types";

import { useState } from "react";

const Product = ({ data }) => {
  const { created } = data;
  const ProductState = {
    title: "",
    img: "",
    product_description: "",
    category: "",
    price: "",
    width: "",
    height: "",
    length: "",
    seller: "",
  };

  const [productData, setProductData] = useState(ProductState);
  const {
    title,
    img,
    product_description,
    category,
    price,
    width,
    height,
    length,
    seller,
  } = productData;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmitData = e => {
    e.preventDefault();

    console.log(productData);
  };

  return (
    <form onSubmit={handleSubmitData}>
      <div className="container_fluid">
        <div className="row"></div>
      </div>
    </form>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    created: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Product;
