const ProfileComponent = () => {

    const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role
    const username = JSON.parse(localStorage.getItem("userInfo"))?.username



    return (
        <div className="profile_wrapper mt-5">
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>User name: </th>
                            <td>{username}</td>
                        </tr>

                        <tr>
                            <th>User role: </th>
                            <td>{userRole}</td>
                        </tr>                
                    </tbody>
                </table>           
            </div>
        </div>
    )
}

export default ProfileComponent