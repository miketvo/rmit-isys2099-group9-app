import PropTypes from "prop-types";
import { useState } from "react";

const Product = ({ data, compFunction }) => {
  const { created } = data;
  const { setPopUpState } = compFunction;

  const ProductState = {
    title: "",
    // img: "",  // TODO: Implement later
    product_description: "",
    category: "",
    price: "",
    width: "",
    length: "",
    height: "",
    // seller: "",  // TODO: Automatically insert seller here according to currently logged in user
  };

  const [productFormData, setproductFormData] = useState(ProductState);
  const {
    title,
    // img,  // TODO: Implement later
    product_description,
    category,
    price,
    width,
    height,
    length,
  } = productFormData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "width" || name === "length" || name === "height" ? parseInt(value, 10) : value;

    setproductFormData(prevState => ({...prevState, [name]: parsedValue}))
  };


  const handleSubmitData = (e) => {
    e.preventDefault();

    setproductFormData(prevState => [
      ...prevState,
      {
        id: productFormData.length + 1,
        ...productFormData
      }
    ])

    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true
    }));
  };

  const handleClosePopUpForm = () => {
    setPopUpState(prevState => ({
      ...prevState,
      state: !prevState.state,
      created: true
    }));

    setproductFormData(ProductState);
  };

  return (
    <form onSubmit={handleSubmitData}>
      <div className="container_fluid">
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Product Title</label>
              <input type="text" className="form-control"
                     name="title" value={title} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control"
                     name="product_description" value={product_description} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input type="text" className="form-control"
                     name="category" value={category} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="text" className="form-control"
                     name="price" value={price} onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label className="form-label">Width</label>
              <input type="number" className="form-control"
                     name="width" value={width} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Length</label>
              <input type="number" className="form-control"
                     name="height" value={height} onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Height</label>
              <input type="number" className="form-control"
                     name="length" value={length} onChange={handleChangeInput}
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
