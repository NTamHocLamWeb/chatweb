import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7105/notificationHub?access_token=${token}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connect
      .start()
      .then(() => {
        console.log("Connected!");

        connect.on("ReceiveMessage", (user, message) => {
          setMessages((messages) => [...messages, { user, message }]);
        });
      })
      .catch((error) => console.error("Connection failed: ", error));

    setConnection(connect);
  }, []);

  const sendMessage = async () => {
    if (connection && message && user) {
      await connection.send("SendMessage", user, message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;