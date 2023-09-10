import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {toast} from "react-hot-toast";

import { postDataAPI, putDataAPI } from "../../../api/apiRequest";
import { checkImage } from "../../../utils/checkImage";

const Product = ({ compData, compFunction }) => {
  const { created, edited, categoryData, editedProductData } = compData;
  const { setPopUpState, setProductData } = compFunction;

  const username = JSON.parse(localStorage.getItem("userInfo"))?.username

  const ProductState = {
    title: "",
    image: "", 
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
    image,
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
        title: editedProductData.title !== null ? editedProductData.title : "",
        image: editedProductData.image !== null ? editedProductData.image : "",
        product_description: editedProductData.product_description !== null ? editedProductData.product_description : "",
        category: editedProductData.category !== null ? editedProductData.category : "",
        price: editedProductData.price !== null ? editedProductData.price : "",
        width: editedProductData.width !== null ? editedProductData.width : "",
        length: editedProductData.length !== null ? editedProductData.length: "",
        height: editedProductData.height !== null ? editedProductData.height : "",
      }))
    }
  }, [edited, editedProductData.category, editedProductData.height, editedProductData.image, editedProductData.length, editedProductData.price, editedProductData.product_description, editedProductData.title, editedProductData.width])



  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "width" || name === "length" || name === "height" ? parseInt(value, 10) : 
                        name === "price" ? parseFloat(value) : value;

    setProductFormData(prevState => ({...prevState, [name]: parsedValue}))
  };

  const handleImageChange = (e) => {
    const imgFile = e.target.files[0];
    const err = checkImage(imgFile)
    if (err) {
      toast.error(err)
    } else {
      setProductFormData(prevState => ({...prevState, image: imgFile})) 
    }
  }


  const handleSubmitData = async(e) => {
    e.preventDefault();

    
    try {
      if (created) {
        if (productFormData.img !== "") {

          const formData = new FormData();
          for (const key in productFormData) {
            formData.append(key, productFormData[key]);
          }
  
          const response = await postDataAPI("product/create", formData)
          console.log(response.data)
          if (response.data) {
            setProductData((preData) => ([...preData, {
              id: response.data.id,
              title: response.data.title,
              image: response.data.image,
              product_description: response.data.product_description,
              category: response.data.category,
              price: response.data.price,
              width: response.data.width ,
              length: response.data.length,
              height: response.data.height,
              seller: response.data.seller
  
            }]))

            toast.success("Create Product Successfully!")
          }
        } else {
          toast.error("You need to choose image!")
        }
        
        
      } 
      else if (edited) {
        const response = await putDataAPI(`product/update/${editedProductData.id}`, productFormData)
        if (response.data) {
          setProductData((preData) => (preData.map(obj => {
            if(obj.id === editedProductData.id) {
                return {
                    ...obj,
                    title: productFormData.title,
                    image: productFormData.image,
                    product_description: productFormData.product_description,
                    category: productFormData.category,
                    price: productFormData.price,
                    width: productFormData.width,
                    length: productFormData.length ,
                    height: productFormData.height ,
                }
            }
            return obj;
          })))

          toast.success(`Edit product ${editedProductData.id} successfully`)
        }
      }
    } catch (error) {
      toast.error("Error: ", error)
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
    <div className="popup_container p-4" style={{top: "-10%", width:"1050px"}}>
      <form onSubmit={handleSubmitData}>
        <div className="container_fluid">
          <div className="row">
            <div className="col-7 row">
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
            <div className="col-5">
              <div className="d-flex flex-column mb-3">
                <div className="">
                  <label className="form-label">Product Image</label>
                  <input type="file" className="form-control"
                        name="image" accept="image/*" onChange={handleImageChange}
                  />
                </div>
                <div className="image_container border border-secondary mt-2" style={{width: "100%", height: "250px"}}>
                  {
                    image && (
                      <img src={image ? (image instanceof File ? URL.createObjectURL(image) : image) : ""} 
                      alt="" 
                      className="w-100 h-100" 
                      style={{objectFit: "cover"}}
                      />
                    )
                  }
                </div>
                
              </div>
            </div>
          </div>
          
          <div className="submit_btn">
            <span className="btn" onClick={handleClosePopUpForm}>Cancel</span>
            <button className="btn btn-outline-primary ms-2" type="submit">{created ? "Create" : "Edit"}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

Product.propTypes = {
  compData: PropTypes.shape({
    created: PropTypes.bool.isRequired,
    edited: PropTypes.bool.isRequired,
    categoryData: PropTypes.array.isRequired,
    editedProductData: PropTypes.object
  }).isRequired,

  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setProductData: PropTypes.func.isRequired,
  })
};

export default Product;
