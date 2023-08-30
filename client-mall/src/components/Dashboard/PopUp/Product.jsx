import PropTypes from "prop-types";
import { useState } from "react";

const Product = ({ data, compFunction }) => {
  const { created } = data;
  const { setPopUpState } = compFunction;

  const ProductState = {
    title: "",
    img: "",
    product_description: "",
    category: "",
    price: "",
    width: "",
    length: "",
    height: "",
    // seller: "",  TODO: Automatically insert seller here according to currently logged in user
  };

  const [productData, setProductData] = useState(ProductState);
  const {
    title,
    // img,  // TODO: Implement later
    product_description,
    category,
    price,
    width,
    height,
    length,
  } = productData;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmitData = e => {
    e.preventDefault();

    console.log(productData);
  };

  const handleClosePopUpForm = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true
    }));
  };

  return (
    <form onSubmit={handleSubmitData}>
      <div className="container_fluid">
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Product Title</label>
              <input type="text" className="form-control"
                     name="warehouse_name" value={title} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control"
                     name="volume" value={product_description} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input type="text" className="form-control"
                     name="province" value={category} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="text" className="form-control"
                     name="city" value={price} onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Width</label>
              <input type="text" className="form-control"
                     name="street_number" value={width} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Length</label>
              <input type="text" className="form-control"
                     name="street" value={height} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Height</label>
              <input type="text" className="form-control"
                     name="district" value={length} onChange={handleChangeInput}
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
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    created: PropTypes.bool.isRequired,
  }).isRequired,
  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
  })
};

export default Product;
