import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import {
  DonutLarge,
  Chat,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";

import { useState, useEffect } from "react";
import { useStateValue } from "../Contextapi/StateProvider";
import SideBarChat from "../SideBarChat/SideBarChat";
import axios from "axios";
import Pusher from "pusher-js";

const Sidebar = () => {
  const [{ user }] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const getRooms = async () => {
    try {
      var response = await axios.get(
        "https://whatsappclonewebsite.herokuapp.com/all/rooms"
      );
      setRooms(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("6fbb654a0e0b670de165", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("room");
    channel.bind("inserted", function (room) {
      // alert(JSON.stringify(newMessage));
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__Search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SideBarChat addNewChat />
        {rooms.map((room) => (
          <SideBarChat key={room._id} id={room._id} name={room.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

// key={room._id}
