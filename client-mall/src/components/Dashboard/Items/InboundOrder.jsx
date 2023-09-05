import PropTypes from "prop-types";

// Icon Imported
import { BiEdit } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";

import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";

const InboundOrder = ({ data, compFunction }) => {
  const { handleDeleteData } = compFunction;
  return (
    <div className="product_table d-flex mt-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="position-relative" style={{width: "125px", minWidth: "1050px"}}>
              <span>ID</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>

            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>ProductID</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>

            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>Quantity</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>

            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>Fulfilled Time</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>

            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>Fulfilled Date</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>

            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>Created Time</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>

            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>Created Date</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>
            
            <th className="position-relative" style={{width: "200px", minWidth: "1050px"}}>
              <span>Seller</span>
              <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div>
            </th>
            
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.product_id}</td>
                <td>{item.quantity}</td>
                <td>{item.fulfilled_time}</td>
                <td>{item.fulfilled_date}</td>
                <td>{item.created_time}</td>
                <td>{item.created_date}</td>
                <td>{item.seller}</td>
                
                <td className="sticky_action">
                  <span className="btn btn-primary">
                    <BiEdit />
                  </span>
                  <span
                    className="btn btn-warning ms-2"
                    onClick={() => handleDeleteData(item.id, "product")}
                  >
                    <ImBin2 />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

InboundOrder.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    created_time: PropTypes.string.isRequired,
    created_date: PropTypes.string.isRequired,
    fulfilled_time: PropTypes.string,
    fulfilled_date: PropTypes.string,
    seller: PropTypes.string.isRequired,
  })).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,
  }).isRequired,
};

export default InboundOrder;

