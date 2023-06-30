import React, { useContext, useState } from "react"
import { Form, Button, Card, Input, Row, Col, notification} from 'antd'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../contexts/AppContext";

const Signup = () => {
    const [signupError, setSignupError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { users, addUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
    };

    const handleButtonClick = () => {
        if (!(password === confirmPassword)) {
            setSignupError(true);
            notification.error({
                message: 'Signup Failed',
                description: 'Passwords do not match.',
                placement: 'topRight',
                duration: 3
            });
            return;
        }
        if (users.some(user => user.key === username)) {
            setSignupError(true);
            notification.error({
                message: 'Signup Failed',
                description: 'Username is already taken.',
                placement: 'topRight',
                duration: 3
            });
        }
        else {
            const newUser = { key: username, password: password };
            addUser(newUser);
            sessionStorage.setItem('username', username);
            navigate("../");
            notification.success({
                message: 'Signup Successful',
                description: 'Welcome, {username}!'.replace('{username}', username),
                placement: 'topRight',
                duration: 3
            });
        }
    };

    return(
        <Row justify="center">
            <Col>
                <Card>
                    <Form>
                        <Form.Item name="username">
                            Username: <Input status={signupError ? "error" : ""} onChange={handleUsernameChange} />
                        </Form.Item>
                        <Form.Item name="password">
                            Password: <Input.Password status={signupError ? "error" : ""} onChange={handlePasswordChange} />
                        </Form.Item>
                        <Form.Item name="confirmPassword">
                            Confirm password: <Input.Password status={signupError ? "error" : ""} onChange={handleConfirmPasswordChange} />
                        </Form.Item>
                        <Form.Item>
                            <Row justify="center">
                                <Button type="primary" onClick={handleButtonClick}>Sign up</Button>
                                <Button type="link" href="/">Cancel</Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Signup;