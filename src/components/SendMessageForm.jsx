import { useState } from "react"
import { Button, InputGroup, Form } from "react-bootstrap";

const SendMessageForm = ({ sendMessage}) => {
    const[msg, setMessage] = useState('');

    return <Form onSubmit={ e=> {
        e.preventDefault();
        sendMessage(msg);
        setMessage('');
    }}>
        <InputGroup className="mb-3">
            <InputGroup.Text>Chat</InputGroup.Text>
            <Form.Control onChange={e => setMessage(e.target.value)} value={msg} placeholder ="type a message"></Form.Control>
            <Button variant="primary" type="submit" disable={!msg}>Send</Button>
        </InputGroup>
    </Form>
}

export default SendMessageForm;
