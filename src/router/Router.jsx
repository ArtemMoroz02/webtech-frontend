import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate }  from 'react-router-dom';
import { Layout, Button, Space, Row, notification } from 'antd';

import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';

import { createBrowserHistory } from 'history';

import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Properties from '../components/properties/Properties';
import Users from '../components/users/Users';
import PropertyAdd from '../components/properties/PropertyAdd';
import PropertyEdit from '../components/properties/PropertyEdit';

function DefaultLayout() {
  const isAuthenticated = sessionStorage.getItem('username');
  const navigate = useNavigate();

  const handlePropertiesClick = () => {
    if (isAuthenticated) {
      navigate("/properties");
    } else {
      notification.error({
          message: 'Not authorised',
          description: 'Authentication is required to access properties.',
          placement: 'topRight',
          duration: 3
      });
    }
  };

  return (
    <Layout>
        <Header />
        <Routes>
            {isAuthenticated ? (
              <Route path="/properties" element={<Properties />} />
            ) : (
              <Route />
            )}
            <Route path="/users" element={<Users />} />
        </Routes>
        <Row justify={"center"}>
          <Space>
            <Button type="primary" href="/login">
              Login
            </Button>
            <Button type="primary" href="/signup">
              Signup
            </Button>
            <Button type="link" onClick={handlePropertiesClick}>
              Properties
            </Button>
            <Button type="link" href="/users">
              Users
            </Button>
          </Space>
        </Row>
        <Footer />
    </Layout>
  );
}

function Router() {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/properties/add" element={<PropertyAdd />} />
            <Route path="/properties/edit" element={<PropertyEdit />} />
            <Route path="*" element={<DefaultLayout />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
