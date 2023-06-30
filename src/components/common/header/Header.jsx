import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponent = (props) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    
    return(
        <Header style={{color: 'white', textAlign: 'center'}}>
            {username ? (
                <span>Welcome, {username}!</span>
            ) : (
                <span>Not authorised.</span>
            )}
        </Header>
    );
};

export default HeaderComponent;