import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Product = ({ compData, compFunction }) => {
  const { created, edited, categoryData, editedData } = compData;
  const { setPopUpState, setProductData } = compFunction;

  const username = JSON.parse(localStorage.getItem("userInfo"))?.username

  const ProductState = {
    title: "",
    img: "",  // TODO: Implement later
    product_description: "",
    category: "",
    price: "",
    width: "",
    length: "",
    height: "",
    seller: username,
  };

  const [productFormData, setProductFormData] = useState(ProductState);

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

  useEffect(() => {
    if(edited) {
      setProductFormData(preData => ({
        ...preData,
        title: editedData.title !== null ? editedData.title : "",
        img: editedData.img !== null ? editedData.img : "",  // TODO: Implement later
        product_description: editedData.product_description !== null ? editedData.product_description : "",
        category: editedData.category !== null ? editedData.category : "",
        price: editedData.price !== null ? editedData.price : "",
        width: editedData.width !== null ? editedData.width : "",
        length: editedData.length !== null ? editedData.length: "",
        height: editedData.height !== null ? editedData.height : "",
      }))
    }
  }, [edited, editedData.category, editedData.height, editedData.img, editedData.length, editedData.price, editedData.product_description, editedData.title, editedData.width])



  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "width" || name === "length" || name === "height" ? parseInt(value, 10) : 
                        name === "price" ? parseFloat(value) : value;

    setProductFormData(prevState => ({...prevState, [name]: parsedValue}))
  };


  const handleSubmitData = (e) => {
    e.preventDefault();

    if (created) {
      // Handle call create product here
      setProductData((preData) => ([...preData, productFormData]))
    } else if (edited) {
      setProductData((preData) => (preData.map(obj => {
        if(obj.id === editedData.id) {
          console.log(obj)
            return {
                ...obj,
                title: productFormData.title,
                // img: productFormData.img,  // TODO: Implement later
                product_description: productFormData.product_description,
                category: productFormData.category,
                price: productFormData.price,
                width: productFormData.width,
                length: productFormData.length ,
                height: productFormData.height ,
            }
        }
        return obj;
      }))
      )
    }
    

    handleClosePopUpForm();
  };

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
              <select className="form-select" name="category" value={category} onChange={handleChangeInput}>
                <option value="">-- Choose product category --</option>
                {
                  categoryData?.map((item) => (
                    <option value={item} key={item}>{item}</option>
                  ))
                }
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control"
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
  compData: PropTypes.shape({
    created: PropTypes.bool.isRequired,
    edited: PropTypes.bool.isRequired,
    categoryData: PropTypes.array.isRequired,
    editedData: PropTypes.object
  }).isRequired,

  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setProductData: PropTypes.func.isRequired,
  })
};

export default Product;
