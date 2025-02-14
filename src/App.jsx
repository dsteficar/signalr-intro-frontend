import { Col, Row, Container} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import ChatRoom from './components/ChatRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


function App() {
  const[conn, setConnection] = useState();
  const[messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try{
      //initiate a connection
      const conn = new HubConnectionBuilder()
                  .withUrl("https://localhost:44329/Chat")
                  .configureLogging(LogLevel.Information)
                  .build();

      //set up handler
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
      });

      conn.on("RecieveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}])
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});

      setConnection(conn);

    } catch(e) {
      console.log(e);
    }
  }

  const sendMessage = async(message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <div>
        <main>
          <Container>
            <Row className="px-5 my-5">
              <Col sm={12}>
                <h1 className="font-weight-light">Welcome to the ChatApp</h1>
              </Col>
            </Row>
            { !conn 
              ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
              : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
            }
          </Container>
        </main>
      </div>
    </>
  )
}

export default App

