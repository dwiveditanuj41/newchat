import React, { useState } from "react";
import { Button, Grid, Form } from "semantic-ui-react";
import io from "socket.io-client";
const socket = io("http://localhost:80");

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState();
  const [message, setMessage] = useState();
  socket.on("result", data => {
    setMessages([...messages, data]);
  });
  console.log(messages);
  return (
    <Grid>
      <Grid.Row>
        {messages.map(message => {
          return (
            <div>
              {message.username}:{message.message}
            </div>
          );
        })}
      </Grid.Row>
      <Grid.Row>
        <Form>
          <Form.Field>
            <Grid.Row>
              <Grid.Column>Name</Grid.Column>
              <Grid.Column>
                <input
                  placeholder="First Name"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Form.Field>
          <Form.Field>
            <Grid.Row>
              <Grid.Column>Message</Grid.Column>
              <Grid.Column>
                <input
                  placeholder="Message"
                  onChange={e => {
                    setMessage(e.target.value);
                  }}
                />
              </Grid.Column>
              <Grid.Column>
                <Button
                  type="submit"
                  onClick={() => {
                    socket.emit("message", { username, message });
                  }}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Form.Field>
        </Form>
      </Grid.Row>
    </Grid>
  );
}

export default App;
