import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

// Icon Imported
import { AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";
import { putDataAPI } from "../../../api/apiRequest";

import { IconSetting } from "../../../utils/IconSetting";

// import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";

const InboundOrder = ({ data, compFunction }) => {
  const { handleOpenEdited, handleDeleteData, setInboundOrdersData } =
    compFunction;

  const handleFulfilledOrder = async id => {
    try {
      const response = await putDataAPI(`inbound-order/fulfill/${id}`);
      if (response.status === 200 || response.status === 201) {
        setInboundOrdersData(preData =>
          preData.map(obj => {
            if (obj.id === id) {
              return {
                ...obj,
                fulfilled_time: response.data.fulfilled_time,
                fulfilled_date: response.data.fulfilled_date,
              };
            }
            return obj;
          }),
        );

        toast.success("Successfully fulfilled order");
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };
  return (
    <div className="inboundOrder_table d-flex mt-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="" style={{ width: "125px", minWidth: "125px" }}>
              <span>ID</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>ProductID</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>Quantity</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>Fulfilled Time</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>Fulfilled Date</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>Created Time</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>Created Date</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "200px", minWidth: "200px" }}>
              <span>Seller</span>
              {/* <div className="position-absolute ms-2" style={{top: "5px", right: "7px"}}>
                <FaSortAmountDownAlt/> <FaSortAmountUp/>
              </div> */}
            </th>

            <th className="" style={{ width: "100px", minWidth: "100px" }}>
              <span>Fulfilled ?</span>
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
                <td>
                  {item.fulfilled_time && item.fulfilled_date ? (
                    <span>
                      Success
                      {IconSetting(
                        <AiFillCheckCircle />,
                        "",
                        "30px",
                        "text-success fw-bold",
                      )}
                    </span>
                  ) : (
                    <span
                      className="btn btn-info"
                      onClick={() => handleFulfilledOrder(item.id)}
                    >
                      <AiOutlineCheck />
                    </span>
                  )}
                </td>
                <td className="sticky_action">
                  {!item.fulfilled_time && !item.fulfilled_date && (
                    <span
                      className="btn btn-primary"
                      onClick={() => handleOpenEdited(item.id, "inbound order")}
                    >
                      <BiEdit />
                    </span>
                  )}

                  <span
                    className="btn btn-warning ms-2"
                    onClick={() => handleDeleteData(item.id, "inbound order")}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      product_id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      created_time: PropTypes.string.isRequired,
      created_date: PropTypes.string.isRequired,
      fulfilled_time: PropTypes.string,
      fulfilled_date: PropTypes.string,
      seller: PropTypes.string.isRequired,
    }),
  ).isRequired,
  compFunction: PropTypes.shape({
    handleOpenEdited: PropTypes.func.isRequired,
    handleDeleteData: PropTypes.func.isRequired,
    setInboundOrdersData: PropTypes.func,
  }).isRequired,
};

export default InboundOrder;
