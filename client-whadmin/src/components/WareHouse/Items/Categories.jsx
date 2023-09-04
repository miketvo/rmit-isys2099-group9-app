const Categories = ({compData, compFunction}) => {
  // const {handleDeleteData} = compFunction
  return (
    <div className="product_attribute_table d-flex mt-4">
      <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Category Name</th>
                <th>Parent Category</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {/* {
            data?.map((item) => {
                return(
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.title}</td>
                        <td>
                          <img src={TestImg} alt="" />
                        </td>
                        <td>{item.product_description}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.width}</td>
                        <td>{item.height}</td>
                        <td>{item.length}</td>
                        <td>{item.seller}</td>
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
          } */}
        </tbody>
      </table>
    </div>
  )
}

// Product.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     image: PropTypes.string,
//     product_description: PropTypes.string,
//     category: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     width: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//     length: PropTypes.number.isRequired,
//     seller: PropTypes.string.isRequired
//   })).isRequired,
//   compFunction: PropTypes.shape({
//     handleDeleteData: PropTypes.func.isRequired
//   }).isRequired
// };

export default Categories