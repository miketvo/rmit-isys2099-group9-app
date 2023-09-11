import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { postDataAPI, putDataAPI } from "../../../api/apiRequest";
import { toast } from "react-hot-toast";

const WareHouse = ({ compData, compFunction }) => {
  const { created, edited, editedWarehouseData } = compData;
  const { setPopUpState, setWareHouseData } = compFunction;

  const WareHouseState = {
    warehouse_name: "",
    volume: "",
    province: "",
    city: "",
    district: "",
    street: "",
    street_number: "",
  };

  const [wareHouseFormData, setWareHouseFormData] = useState(WareHouseState);
  const {
    warehouse_name,
    volume,
    province,
    city,
    district,
    street,
    street_number,
  } = wareHouseFormData;

  useEffect(() => {
    if (edited) {
      setWareHouseFormData(preData => ({
        ...preData,
        warehouse_name:
          editedWarehouseData.warehouse_name !== null
            ? editedWarehouseData.warehouse_name
            : "",
        volume:
          editedWarehouseData.volume !== null ? editedWarehouseData.volume : "",
        province:
          editedWarehouseData.province !== null
            ? editedWarehouseData.province
            : "",
        city: editedWarehouseData.city !== null ? editedWarehouseData.city : "",
        district:
          editedWarehouseData.district !== null
            ? editedWarehouseData.district
            : "",
        street:
          editedWarehouseData.street !== null ? editedWarehouseData.street : "",
        street_number:
          editedWarehouseData.street_number !== null
            ? editedWarehouseData.street_number
            : "",
      }));
    }
  }, [
    edited,
    editedWarehouseData.city,
    editedWarehouseData.district,
    editedWarehouseData.province,
    editedWarehouseData.street,
    editedWarehouseData.street_number,
    editedWarehouseData.volume,
    editedWarehouseData.warehouse_name,
    setWareHouseData,
  ]);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    const parsedValue =
      name === "volume" || name === "street_number"
        ? parseInt(value > 0 ? value : 0, 10)
        : value;

    setWareHouseFormData(prevState => ({ ...prevState, [name]: parsedValue }));
  };

  const handleSubmitData = async e => {
    e.preventDefault();

    if (created) {
      // Handle call create warehouse here
      try {
        const response = await postDataAPI(
          "warehouse/create",
          wareHouseFormData,
        );
        if (response.status === 200 || response.status === 201) {
          // handle add data into setWareHouseData
          setWareHouseData(prevState => [...prevState, { ...response.data }]);

          toast.success("Create A Warehouse Successfully!");
        }
      } catch (error) {
        toast.error("Error: ", error);
      }
    } else if (edited) {
      // Handle call update warehouse here
      try {
        const response = await putDataAPI(
          `warehouse/update/${editedWarehouseData.id}`,
          wareHouseFormData,
        );
        if (response.status === 200 || response.status === 201) {
          // handle update into setWareHouseData by API response
          setWareHouseData(preData =>
            preData.map(obj => {
              if (obj.id === editedWarehouseData.id) {
                return {
                  ...obj,
                  ...wareHouseFormData,
                };
              }
              return obj;
            }),
          );
        }
      } catch (error) {
        toast.error("Error: ", error.response?.data?.error);
      }

      setWareHouseData(preData =>
        preData.map(obj => {
          if (obj.id === editedWarehouseData.id) {
            return {
              ...obj,
              ...wareHouseFormData,
            };
          }
          return obj;
        }),
      );
    }
    handleClosePopUpForm();
  };

  const handleClosePopUpForm = () => {
    if (created) {
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        created: false,
      }));
    } else if (edited) {
      setPopUpState(prevState => ({
        ...prevState,
        state: !prevState.state,
        edited: false,
      }));
    }

    setWareHouseFormData(WareHouseState);
  };

  return (
    <div className="popup_container p-4" style={{ top: "-10%" }}>
      <form onSubmit={handleSubmitData}>
        <div className="container_fluid">
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Warehouse Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="warehouse_name"
                  value={warehouse_name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Volume</label>
                <input
                  type="text"
                  className="form-control"
                  name="volume"
                  value={volume}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Province</label>
                <input
                  type="text"
                  className="form-control"
                  name="province"
                  value={province}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Street Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="street_number"
                  value={street_number}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={street}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">District</label>
                <input
                  type="text"
                  className="form-control"
                  name="district"
                  value={district}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="submit_btn">
            <span className="btn" onClick={handleClosePopUpForm}>
              Cancel
            </span>
            <button className="btn btn-outline-primary ms-2" type="submit">
              {created ? "Create" : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

WareHouse.propTypes = {
  compData: PropTypes.shape({
    created: PropTypes.bool.isRequired,
    edited: PropTypes.bool.isRequired,
    editedWarehouseData: PropTypes.object,
  }).isRequired,
  compFunction: PropTypes.shape({
    setPopUpState: PropTypes.func.isRequired,
    setWareHouseData: PropTypes.func.isRequired,
  }),
};

export default WareHouse;
