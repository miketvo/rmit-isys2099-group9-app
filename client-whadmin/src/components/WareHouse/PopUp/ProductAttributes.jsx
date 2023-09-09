import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {toast} from "react-hot-toast";
import {postDataAPI, putDataAPI} from "../../../api/apiRequest";

const ProductAttributes = ({compData, compFunction}) => {
    const {created, edited, productCategoryData, editedProductAttributeData} = compData;
    const {setPopUpState, setProductAttributesData} = compFunction;

    const categoryNameArray = productCategoryData.map((item) => item.category_name);

    const AttributeState = {
        attribute_name: "",
        attribute_type: "",
        required: false
    }

    const [productAttributeData, setProductAttributeData] = useState(AttributeState);
    const [categoryList, setCategoryList] = useState([])
    const {attribute_name, attribute_type, required, category} = productAttributeData;

    
    useEffect(() => {
        if(edited) {
            setProductAttributeData(preData => ({
                ...preData,
                attribute_name: editedProductAttributeData.attribute_name ? editedProductAttributeData.attribute_name : "",
                attribute_type: editedProductAttributeData.attribute_type ? editedProductAttributeData.attribute_type : "",
                required: editedProductAttributeData.required ? editedProductAttributeData.required  : false,
            }))

            setCategoryList(editedProductAttributeData.categories ? editedProductAttributeData.categories : [])
        }
    }, [edited, editedProductAttributeData.attribute_name, editedProductAttributeData.attribute_type, editedProductAttributeData.categories, editedProductAttributeData.required])


    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        const parseValue = name === "required" ? (value === "true" ? true : false) : value
        setProductAttributeData((preState) => ({...preState, [name]: parseValue}))
         
    }

    const handleCheckboxChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setCategoryList(prevState => [...prevState, value])
        } else {
            setCategoryList(prevState => [...prevState.filter(item => item !== value)])
        }
    }

    const handleSubmitData = async(e) => {
        e.preventDefault();

        try {
            if (created) {
                if (categoryList.length > 0) {
                    const response = await postDataAPI("attribute/create", {
                        attribute_name: productAttributeData.attribute_name,
                        attribute_type: productAttributeData.attribute_type,
                        required: productAttributeData.required,
                        categories: categoryList
                    })

                    if (response.data) {
                        const categoryObjects = categoryList.map((categoryItem) => ({
                            attribute_name: productAttributeData.attribute_name,
                            attribute_type: productAttributeData.attribute_type,
                            required: productAttributeData.required,
                            category: categoryItem,
                        }));
            
                        setProductAttributesData((preData) => ([...preData, ...categoryObjects]))   
                        toast.success("Create Attribute Successfully")
                    }
                }
                else {
                    toast.error("You need to select at least 1 category")
                }
            } 
            else if (edited) {
                const editedData = {
                    attribute_name: productAttributeData.attribute_name,
                    attribute_type: productAttributeData.attribute_type,
                    required: productAttributeData.required,
                    categories: categoryList,
                }

            
                const response = await putDataAPI(`attribute/update/${editedProductAttributeData.attribute_name}`, {
                    new_attribute_name: productAttributeData.attribute_name,
                    categories: categoryList
                })

                if (response.data) {
                    setProductAttributesData((preData) => {
                        const clonedData = [...preData]
                        const matchingObjects = clonedData.filter(item => item.attribute_name === editedData.attribute_name);

                        // Update the category property based on the index
                        matchingObjects.forEach((item, index) => {
                        if (editedData.categories[index]) {
                            item.category = editedData.categories[index];
                        }
                        });

                        return clonedData; 
                    })

                    toast.success(`Edit Attribute "${editedProductAttributeData.attribute_name}" with ${category} Successfully`)
                } 
            }
        } catch (error) {
            toast.error("Error: ", error)
        }
        

        handleClosePopUpForm();
    }

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
    }
    return (
        <div className="popup_container p-4" style={{top: created ? "-10%": "10%"}}>
            <form onSubmit={handleSubmitData}>
                <div className="container_fluid">
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Attribute Name</label>
                                <input type="text" className="form-control"
                                    name="attribute_name" value={attribute_name} onChange={handleChangeInput}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Attribute Type</label>
                                <select className="form-select" name="attribute_type" value={attribute_type} onChange={handleChangeInput}>
                                    <option value="">-- None --</option>
                                    <option value="Number">Number</option>
                                    <option value="String">String</option>
                                    <option value="Boolean">Boolean</option>
                                    
                                </select>
                            </div>
                        </div>
                        
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Category</label>            
                                <div className="w-100 p-2" style={{height: "200px", overflowX: "auto"}}>
                                    {
                                        categoryNameArray?.map((item) => (
                                            <div className="form-check" key={item}>
                                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" 
                                                value={item} checked={categoryList.includes(item) ? true : false} onChange={handleCheckboxChange}/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    {item}
                                                </label>
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            {
                                edited
                            }
                            <div className="mb-3">
                                <label className="form-label">Required</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="required" 
                                    value={true} checked={required === true} onChange={handleChangeInput}/>
                                    <label className="form-check-label">
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="required" 
                                    value={false} checked={required === false} onChange={handleChangeInput}/>
                                    <label className="form-check-label">
                                        No
                                    </label>
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
    )
}

ProductAttributes.propTypes = {
    compData: PropTypes.shape({
        created: PropTypes.bool.isRequired,
        edited: PropTypes.bool.isRequired,
        productCategoryData: PropTypes.arrayOf(
            PropTypes.shape({
            category_name: PropTypes.string.isRequired,
            })
        ).isRequired,
        editedProductAttributeData: PropTypes.object
    }).isRequired,
    compFunction: PropTypes.shape({
        setPopUpState: PropTypes.func.isRequired,
        setProductAttributesData: PropTypes.func.isRequired,
    }).isRequired,
  };

export default ProductAttributes