import React, { useState, useEffect } from "react";
import "./SideBarChat.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const SideBarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState();

  const createChat = async () => {
    const RoomName = prompt("please enter name");
    if (RoomName) {
      try {
        await axios.post(
          "https://whatsappclonewebsite.herokuapp.com/group/create",
          {
            groupName: RoomName,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2> addNewChat</h2>
    </div>
  );
};

export default SideBarChat;
