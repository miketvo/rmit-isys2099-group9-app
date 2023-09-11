import { useState, useEffect } from "react";

import { getDataAPI } from "../../api/apiRequest";

const ProfileComponent = () => {
  const [userName, setUserName] = useState("");
  const [shopName, setShopName] = useState("");

  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role;
  const username = JSON.parse(localStorage.getItem("userInfo"))?.username;

  useEffect(() => {
    if (username && userRole === "buyer") {
      setUserName(username);
    } else {
      const fetchSellerData = async () => {
        const response = await getDataAPI(`user/seller/${username}`);
        if (response.status === 200 || response.status === 201) {
          setUserName(response.data.username);
          setShopName(response.data.shop_name);
        }
      };

      fetchSellerData();
    }
  }, [userRole, username]);

  return (
    <div className="profile_wrapper mt-5">
      <div className="container">
        <table className="table">
          <tbody>
            <tr>
              <th>User name: </th>
              <td>{userName}</td>
            </tr>

            <tr>
              <th>User role: </th>
              <td>{userRole}</td>
            </tr>

            {userRole === "seller" && (
              <tr>
                <th>Shop name: </th>
                <td>{shopName}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileComponent;
