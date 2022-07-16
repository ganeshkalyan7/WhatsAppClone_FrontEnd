import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import "./Chat.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../Contextapi/StateProvider";
import Pusher from "pusher-js";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [updateAt, setUpdatedAt] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  const [{ user }] = useStateValue();

  useEffect(() => {
    const getRoomId = async () => {
      if (roomId) {
        try {
          var res = await axios.get(
            `https://whatsappclonewebsite.herokuapp.com/room/${roomId}`
          );
          setRoomName(res.data.name);
          setUpdatedAt(res.data.updatedAt);

          var response = await axios.get(
            `https://whatsappclonewebsite.herokuapp.com/messages/${roomId}`
          );
          setMessages(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getRoomId();
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    try {
      await axios.post(
        "https://whatsappclonewebsite.herokuapp.com/messages/create",
        {
          message: input,
          name: user.displayName,
          timestamp: new Date(),
          uid: user.uid,
          roomId: roomId,
        }
      );
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const pusher = new Pusher("6fbb654a0e0b670de165", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (message) {
      // alert(JSON.stringify(newMessage));
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3> {roomName ? roomName : "Welcome to Whatsapp"}</h3>
          <p>last seen {new Date(updateAt).toString().slice(0, 25)}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((messages, index) => (
          <p
            className={`chat__message ${
              messages.uid === user.uid && "chat_receiver"
            }`}
            key={messages._id}
          >
            <span className="chat__name">{messages.name}</span>
            {messages.message}
            <span className="chat__timestamp">
              {new Date(messages.timestamp).toString().slice(0, 25)}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="enter a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}> send message</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
