import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/EditProfile.scss";
import { User } from "types";

const Player = ({ user }: { user: User }) => {

  const handleEditUsername = () => {
    // Implement logic to enable editing username
  };

  const handleEditBirthday = () => {
    // Implement logic to enable editing birthday
  };
  
  return (
    <div className="player container">
      <div className="player info">
        <div className="player info-item">
          <span style={{ marginRight: "10px" }}>Username: {user.username}</span>
          <Button onClick={handleEditUsername} style={{ fontSize: "10px", padding: "3px", height: "30px"}}>Edit Username</Button>
        </div>
        <div className="player info-item">
          <span style={{ marginRight: "10px" }}>Birthday: {user.birthday}</span>
          <Button onClick={handleEditBirthday} style={{ fontSize: "10px", padding: "3px", height: "30px" }}>Edit Birthday</Button>
        </div>
      </div>
    </div>
  );
};
  
Player.propTypes = {
  user: PropTypes.object.isRequired,
};

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("id"));
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get(`/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(`Error fetching user data: \n${handleError(error)}`);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleSaveChanges = async () => {
    try { 
      
      // Send a request to the logout endpoint with the authentication token in the headers
      await api.put(`/user/${userId}`);

      navigate(`/profile/${userId}`)

      // Navigate to the login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <BaseContainer>
      <div className="editprofile container">
        <div className="editprofile form">
          <ul className="editprofile user-list">
            <li className="player list-item">
              <Player user={user} />
            </li>
          </ul>
          <Button style={{ marginBottom: "35px" }} width="100%" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default EditProfile;
