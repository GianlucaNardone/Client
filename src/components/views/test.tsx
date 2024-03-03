import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/EditProfile.scss";
import { User } from "types";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
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

  const handleEditUsername = () => {
    // Implement logic to enable editing username
  };

  const handleEditBirthday = () => {
    // Implement logic to enable editing birthday
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes
  };

  return (
    <BaseContainer>
      <div className="editprofile container">
        <div className="editprofile form">
          <ul className="editprofile user-list">
            <li className="player list-item">
              <div className="player info">
                <div className="player info-item">
                  Username: {user.username}
                  <Button onClick={handleEditUsername}>Edit Username</Button>
                </div>
                <div className="player info-item">
                  Birthday: {user.birthday}
                  <Button onClick={handleEditBirthday}>Edit Birthday</Button>
                  <span className="player blur-text">Format: DD/MM/YYYY</span>
                </div>
                <div className="player info-item">Creation Date: {user.creationDate}</div>
                <div className="player info-item">Status: {user.status}</div>
              </div>
            </li>
          </ul>
          <Button width="100%" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default EditProfile;
