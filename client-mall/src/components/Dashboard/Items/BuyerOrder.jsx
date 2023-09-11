import PropTypes from "prop-types";
import { Fragment } from "react";
import { toast } from "react-hot-toast";

import { AiOutlineCheck } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { putDataAPI } from "../../../api/apiRequest";

const BuyerOrder = ({ data, compFunction }) => {
  const { handleDeleteData, handleOpenEdited, setBuyerOrdersData } =
    compFunction;

  const handleBuyerOrderStatus = async (status, id) => {
    try {
      if (status === "accepted") {
        const response = await putDataAPI(`buyer-order/${id}/accept`);
        if (response.status === 200 || response.status === 201) {
          setBuyerOrdersData(prevData =>
            prevData.map(object => {
              if (object.id === parseInt(id, 10)) {
                return { ...object, order_status: "A" };
              }
              return object;
            }),
          );
        }
      } else if (status === "rejected") {
        const response = await putDataAPI(`buyer-order/${id}/reject`);
        if (response.status === 200 || response.status === 201) {
          setBuyerOrdersData(prevData =>
            prevData.map(object => {
              if (object.id === parseInt(id, 10)) {
                return { ...object, order_status: "R" };
              }
              return object;
            }),
          );
        }
      } else {
        toast.error("Only accepted and rejected status is required");
      }
    } catch (error) {
      toast.error("Error: ", error);
    }
  };

  return (
    <div className="dashboard_table d-flex mt-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th
              className="position-relative"
              style={{ width: "125px", minWidth: "1050px" }}
            >
              <span>ID</span>
            </th>

            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>ProductID</span>
            </th>

            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>Quantity</span>
            </th>

            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>Order Status</span>
            </th>
            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>Fulfilled Time</span>
            </th>
            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>Fulfilled Date</span>
            </th>
            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>Created Time</span>
            </th>
            <th
              className="position-relative"
              style={{ width: "200px", minWidth: "1050px" }}
            >
              <span>Created Date</span>
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
                <td>
                  {item.order_status === "P"
                    ? "Pending"
                    : item.order_status === "A"
                    ? "Accepted"
                    : item.order_status === "R"
                    ? "Rejected"
                    : ""}
                </td>
                <td>{item.fulfilled_time}</td>
                <td>{item.fulfilled_date}</td>
                <td>{item.created_time}</td>
                <td>{item.created_date}</td>
                <td className="sticky_action">
                  {item.order_status === "P" ? (
                    <Fragment>
                      <span
                        className="btn btn-success"
                        onClick={() =>
                          handleBuyerOrderStatus("accepted", item.id)
                        }
                      >
                        <AiOutlineCheck />
                      </span>
                      <span
                        className="btn btn-danger ms-2"
                        onClick={() =>
                          handleBuyerOrderStatus("rejected", item.id)
                        }
                      >
                        <RxCross2 />
                      </span>
                    </Fragment>
                  ) : (
                    <span className="fw-bold">Closed</span>
                  )}
                </td>
                <td className="sticky_action">
                  {item.order_status === "P" && (
                    <span
                      className="btn btn-primary"
                      onClick={() => handleOpenEdited(item.id, "buyer order")}
                    >
                      <BiEdit />
                    </span>
                  )}

                  <span
                    className="btn btn-warning ms-2"
                    onClick={() => handleDeleteData(item.id, "buyer order")}
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

BuyerOrder.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      product_id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      order_status: PropTypes.string.isRequired,
      created_time: PropTypes.string.isRequired,
      created_date: PropTypes.string.isRequired,
      fulfilled_time: PropTypes.string,
      fulfilled_date: PropTypes.string,
    }),
  ).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,
    handleOpenEdited: PropTypes.func.isRequired,
    setBuyerOrdersData: PropTypes.func.isRequired,
  }).isRequired,
};

export default BuyerOrder;
