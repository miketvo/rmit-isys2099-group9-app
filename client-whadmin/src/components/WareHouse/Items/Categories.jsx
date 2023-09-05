import { BiEdit } from "react-icons/bi"
import { ImBin2 } from "react-icons/im"
import PropTypes from 'prop-types';

const Categories = ({compData, compFunction}) => {
  const {handleDeleteData} = compFunction
  return (
    <div className="product_category_table w-100 d-flex mt-3">
      <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Category Name</th>
                <th>Parent Category</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {
            compData?.map((item) => {
                return(
                    <tr key={item.category_name}>
                        <td>{item.category_name}</td>
                        <td>{item.parent}</td>
                        <td className="sticky_action">
                            <span className="btn btn-primary">
                                <BiEdit />
                            </span>
                            <span className="btn btn-warning ms-2"
                            onClick={() => handleDeleteData(item.id, "product")}>
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

Categories.propTypes = {
  compData: PropTypes.arrayOf(PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    parent: PropTypes.string,

  })).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,

  }).isRequired,
};

export default Categories