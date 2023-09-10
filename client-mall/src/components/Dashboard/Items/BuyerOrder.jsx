import {AiOutlineCheck} from "react-icons/ai"
import { BiEdit } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";
import {RxCross2} from "react-icons/rx"
import {FaSortAmountDownAlt, FaSortAmountUp} from "react-icons/fa"
import PropTypes from 'prop-types';

const BuyerOrder = ({data, compFunction}) => {
  const { handleDeleteData } = compFunction;
  return (
    <div className="dashboard_table d-flex mt-2">
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
              <span>Order Status</span>
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
            <th>
              <span>Accept/Decline</span>
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
                <td>{item.order_status}</td>
                <td>{item.created_time}</td>
                <td>{item.created_date}</td>
                <td>{item.fulfilled_time}</td>
                <td>{item.fulfilled_date}</td>
                <td className="sticky_action">
                  <span className="btn btn-success">
                    <AiOutlineCheck />
                  </span>
                  <span
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteData(item.id, "product")}
                  >
                    <RxCross2 />
                  </span>
                </td>
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
}

BuyerOrder.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    order_status: PropTypes.string.isRequired,
    created_time: PropTypes.string.isRequired,
    created_date: PropTypes.string.isRequired,
    fulfilled_time: PropTypes.string,
    fulfilled_date: PropTypes.string,
  })).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,
  }).isRequired,
};

export default BuyerOrder