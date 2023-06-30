import React, { useContext, useState } from "react"
import { Form, Button, Card, Input, Row, Col, notification} from 'antd'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../contexts/AppContext";


const Login = () => {
    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { users } = useContext(AppContext);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const handleButtonClick = () => {
        let found = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].key === username) {
                found = true;
                if (users[i].password === password) {
                    sessionStorage.setItem('username', username);
                    navigate("/");
                    notification.success({
                        message: 'Login Successful',
                        description: 'Welcome, {username}!'.replace('{username}', username),
                        placement: 'topRight',
                        duration: 3
                    });
                }
                else {
                    setLoginError(true);
                    notification.error({
                        message: 'Login Failed',
                        description: 'Incorrect password.',
                        placement: 'topRight',
                        duration: 3
                    });
                }
                break;
            }
        }
        if (!found) {
            setLoginError(true);
            notification.error({
                message: 'Login Failed',
                description: 'Incorrect username.',
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
                            Username: <Input status={loginError ? "error" : ""} onChange={handleUsernameChange} />
                        </Form.Item>
                        <Form.Item name="password">
                            Password: <Input.Password status={loginError ? "error" : ""} onChange={handlePasswordChange} />
                        </Form.Item>
                        <Form.Item>
                            <Row justify="center">
                                <Button type="primary" onClick={handleButtonClick}>Log in</Button>
                                <Button type="link" href="../">Cancel</Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;