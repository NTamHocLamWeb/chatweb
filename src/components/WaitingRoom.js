import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState();
  const [chatRoom, setChatRoom] = useState();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7105/api/business/business-get-list-profile?index=1&pageSize=10", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("Protected data:", response.data);
      setRooms(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Form onSubmit={ e => {
        e.preventDefault();
        joinChatRoom(username, chatRoom);
    }}>
      <h2>Available Chat Rooms</h2>
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((item) => (
            <li key={item.conversationId}>
              <p><strong>Conversation ID:</strong> {item.conversationId || "N/A"}</p>
              <p><strong>Account ID:</strong> {item.accountId || "N/A"}</p>
              <p><strong>Avatar:</strong> {item.avatar || "N/A"}</p>
              <p><strong>Name:</strong> {item.name || "N/A"}</p>
              <p>{item.lastMessage || "N/A"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No data available</div>
      )}

      <Row className="ps-5 py-5">
        <Col sm={12}>
          <Form.Group>
            <Form.Control placeholder="Username" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="Chat Room" onChange={e => setChatRoom(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <hr />
          <Button variant="success" type="submit">Join</Button>
        </Col>
      </Row>
    </Form>
};

export default WaitingRoom;