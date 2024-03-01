import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import { User } from "types";

const Player = ({ user }: { user: User }) => (
  <div className="player container">
    <div className="player-info">
      <div className="player-info-item">Username: {user.username}</div>
      <div className="player-info-item">Birthday: {user.birthday}</div>
      <div className="player-info-item">Creation Date: {user.creationDate}</div>
      <div className="player-info-item">Status: {user.status}</div>
    </div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object.isRequired,
};

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get(`/user/${userId}`);
        console.log("Response data:", response.data); // Log response data
        setUser(response.data);
      } catch (error) {
        console.error(`Error fetching user data: \n${handleError(error)}`);
      }
    }

    fetchUserData();
  }, [userId]);

  const doHome = () => {
    navigate("/game");
  };

  return (
    <BaseContainer>
      <div className="profile container">
        <div className="profile form">
          <ul className="profile user-list">
            <li className="player list-item">
              <Player user={user} />
            </li>
          </ul>
          <Button width="100%" onClick={() => doHome()}>
            Back to Homepage
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Profile;