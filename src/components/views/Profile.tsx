import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import { User } from "types";

const Player = ({ user }: { user: User }) => (
  <div className="player container">
    <div className="player username">Username: {user.username}</div>
  </div>
);

Player.propTypes = {
 user: PropTypes.object,
};

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User>(null);

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
  }, []);

  const doHome = () => {
    navigate("/game");
  }

  return (
    <BaseContainer>
      <div className="profile container">
        <div className="profile form">

          <Button
            width="100%"
            onClick={() => doHome()}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
}

export default Profile;
