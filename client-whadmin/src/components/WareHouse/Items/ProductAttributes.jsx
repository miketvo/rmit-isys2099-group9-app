import PropTypes from 'prop-types';

import { BiEdit } from "react-icons/bi"
import { ImBin2 } from "react-icons/im"

const ProductAttributes = ({compData, compFunction}) => {
  const {handleOpenEditedMode, handleDeleteData} = compFunction
  return (
    <div className="product_attribute_table d-flex mt-3">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Attribute Name</th>
            <th>Attribute Type (Number, String, Boolean)</th>
            <th>Required</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            compData?.map((item) => {
              console.log(item.required)
                return(
                    <tr key={item.attribute_name}>
                        <td>{item.attribute_name}</td>
                        <td>{item.attribute_type}</td>
                        <td>{item.required === false ? "No" : "Yes"}</td>
                        <td>{item.category ? item.category : ""}</td>
                        
                        <td className="sticky_action">
                            <span className="btn btn-primary"
                            onClick={() => handleOpenEditedMode({attribute_name: item.attribute_name, place: "product_attribute"})}>
                                <BiEdit />
                            </span>
                            <span className="btn btn-warning ms-2"
                            onClick={() => handleDeleteData({attribute_name: item.attribute_name, place: "product_attribute"})}>
                                <ImBin2 />
                            </span>
                        </td>

                    </tr>
                )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

ProductAttributes.propTypes = {
  compData: PropTypes.arrayOf(
    PropTypes.shape({
      attribute_name: PropTypes.string.isRequired,
      attribute_type: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired,
      category: PropTypes.string,

    })
  ).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,
    handleOpenEditedMode: PropTypes.func.isRequired
  }).isRequired,
};


export default ProductAttributes