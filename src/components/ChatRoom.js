import { Col, Row } from "react-bootstrap";
import MessageContainer from './MessageContainer';
import SendMessage from "./SendMessage";
import axios from "axios";
import { useState, useEffect } from "react";


const ChatRoom = ({ roomID, messages, sendMessage }) => {
  
      const [allMessages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://localhost:7262/api/Message/${roomID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("Protected data:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };
  useEffect(() => {
    if (roomID) {
      fetchData();
    }
  }, [roomID]);

  return (
    <div>
      <Row className="px-5 py-5">
        <Col sm={10}>
          <h2>ChatRoom</h2>
        </Col>
      </Row>
      <Row className="px-5 py-5">
        <Col sm={12}>
          <MessageContainer messages={allMessages} />
        </Col>
        <Col sm={12}>
          <MessageContainer messages={messages} />
        </Col>
        <Col sm={12}>
          <SendMessage chatRoom={roomID} sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
};

export default ChatRoom;