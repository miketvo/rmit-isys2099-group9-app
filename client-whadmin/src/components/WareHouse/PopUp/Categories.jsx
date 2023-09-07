import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Categories = ({compData, compFunction}) => {
    const {created, edited, productCategoryData, editedProductCategoryData} = compData;
    const {setPopUpState, setProductCategoryData} = compFunction;

    const categoryNameArray = productCategoryData.map((item) => item.category_name);

    const categoryState = {
        category_name: "",
        parent: "",
    }
    const [categoryData, setCategoryData] = useState(categoryState)
    const {category_name, parent} = categoryData

    useEffect(() => {
        if(edited) {
            setCategoryData(preData => ({
                ...preData,
                category_name: editedProductCategoryData.category_name !== null ? editedProductCategoryData.category_name : "",
                parent: editedProductCategoryData.parent !== null ? editedProductCategoryData.parent : ""
            }))
        }
    }, [edited, editedProductCategoryData.category_name, editedProductCategoryData.parent])

    const handleChangeInput = (e) => {
        const {name, value} = e.target;

        setCategoryData((preState) => ({...preState, [name]: value}))
    }

    function updateCategoryAndRelatedParent(data, oldCategoryName, newCategoryName) {
        return data.map(item => ({
          ...item,
          category_name: item.category_name === oldCategoryName ? newCategoryName : item.category_name,
          parent: item.parent === oldCategoryName ? newCategoryName : item.parent,
        }));
    }

    const handleSubmitData = (e) => {
        e.preventDefault();
        if (created) {
            setProductCategoryData((preData) => ([...preData, categoryData]))
        }
        else if (edited) {
            setProductCategoryData(prevData => prevData.map(item =>
                item.category_name === editedProductCategoryData.category_name
                  ? { ...item, ...categoryData }
                  : item
            ))
            setProductCategoryData((preData) => updateCategoryAndRelatedParent(preData, editedProductCategoryData.category_name, categoryData.category_name))
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
        <div className="popup_container p-4" style={{top: "20%"}}>
            <form onSubmit={handleSubmitData}>
                <div className="container_fluid">
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Category Name</label>
                                <input type="text" className="form-control"
                                    name="category_name" value={category_name} onChange={handleChangeInput}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Parent Category</label>
                                <select className="form-select" name="parent" value={parent} onChange={handleChangeInput}>
                                    <option value="">-- None --</option>
                                    {
                                        categoryNameArray?.map((item) => (
                                            <option value={item} key={item}>{item}</option>
                                        ))
                                    }
                                </select>
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

Categories.propTypes = {
    compData: PropTypes.shape({
      created: PropTypes.bool.isRequired,
      edited: PropTypes.bool.isRequired,
      productCategoryData: PropTypes.arrayOf(PropTypes.object),
      editedProductCategoryData: PropTypes.object,

    }).isRequired,
    compFunction: PropTypes.shape({
      setPopUpState: PropTypes.func.isRequired,
      setProductCategoryData: PropTypes.func.isRequired,
    }).isRequired,
};

export default Categories