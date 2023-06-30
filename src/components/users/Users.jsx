import React, { useContext } from "react"
import { AppContext } from '../../contexts/AppContext';
import { Table, Form, Card, Input, Row, Col, notification } from 'antd'

const { Search } = Input;

const Users = () => {
    const { users } = useContext(AppContext);

    const onSearch = () => {
        if (!sessionStorage.getItem('username')) {
            notification.error({
                message: 'Not authorised',
                description: 'Authentication is required to access the search by username.',
                placement: 'topRight',
                duration: 3
            });
        }
        else {
            notification.success({
                message: 'Search',
                description: 'Search.',
                placement: 'topRight',
                duration: 3
            });
        }
    }

    const columns = [{
        title: 'Username',
        dataIndex: 'key',
        key: 'key',
      }, {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
      }];

    return(
        <Row justify={"center"}>
            <Col>
                <Card>
                    <Form>
                        <Form.Item name="usersTable">
                            <Table columns={columns} dataSource={users} pagination={false} />
                        </Form.Item>
                        <Form.Item name="searchBar">
                            <Search
                                placeholder="search username"
                                allowClear
                                enterButton="Search"
                                onSearch={onSearch}
                            />
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default Users;