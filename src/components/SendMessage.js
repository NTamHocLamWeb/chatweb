import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const SendMessage = ({ chatRoom, sendMessage }) => {
  const [msg, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post(`https://localhost:7105/api/business/business-get-list-profile?index=1&pageSize=10`, {roomId: chatRoom, content: msg}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      //console.log(response.data);
      sendMessage(response.data.messageId);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <Form.Control onChange={e => setMessage(e.target.value)} value={msg} placeholder="Type a message" />
        <Button variant="primary" type="submit" disabled={!msg}>Send</Button>
      </InputGroup>
    </Form>
  );
}

export default SendMessage;