import React from 'react';
import './MessageContainer.css';

//Detail message

const MessageContainer = ({ messages }) => {
    console.log(messages)
    return (
        <div className="message-container">

          {messages.map((msg, index) => 
              <li key={msg.messageId} className="message">
                  <img avatar={msg.avatar} alt="avatar" className="avatar" />
                  <div className="message-content">
                      <strong>{msg.fullName}</strong>: {msg.content} - {msg.time}
                      
                  </div>
                  </li>
          )}
      </div>
    );
};

export default MessageContainer;