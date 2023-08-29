import PropTypes from "prop-types";

// Icon Imported
import { BiEdit } from "react-icons/bi";
import { ImBin2 } from "react-icons/im";

const WareHouse = ({ data, compFunction }) => {
  const { handleDeleteData } = compFunction;

  return (
    <div className="dashboard_table mt-4">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Warehouse Name</th>
            <th>Volume</th>
            <th>Province</th>
            <th>City</th>
            <th>District</th>
            <th>Street</th>
            <th>Street Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.warehouse_name}</td>
                <td>{item.volume}</td>
                <td>{item.province}</td>
                <td>{item.city}</td>
                <td>{item.district}</td>
                <td>{item.street}</td>
                <td>{item.street_number}</td>
                <td>
                  <span className="btn btn-primary">
                    <BiEdit />
                  </span>
                  <span
                    className="btn btn-warning ms-2"
                    onClick={() => handleDeleteData(item.id, "warehouse")}
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

WareHouse.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      warehouse_name: PropTypes.string.isRequired,
      volume: PropTypes.number,
      province: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      street: PropTypes.string,
      street_number: PropTypes.number,
    }),
  ).isRequired,
  compFunction: PropTypes.shape({
    handleDeleteData: PropTypes.func.isRequired,
  }).isRequired,
};

export default WareHouse;
