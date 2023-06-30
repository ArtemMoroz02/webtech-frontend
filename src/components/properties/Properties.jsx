import React, { useContext } from "react"
import { AppContext } from '../../contexts/AppContext';
import { Table, Space, Empty, Form, Button, Card, Input, Row, Col, notification, Popconfirm } from 'antd'

const { Search } = Input;

const Properties = () => {
    const { properties } = useContext(AppContext);
    const notEmpty = properties.length !== 0;

    const columns = [{
        title: 'Name',
        dataIndex: 'key',
        key: 'key',
      }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      }, {
        title: 'Surface',
        dataIndex: 'surface',
        key: 'surface',
      }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      }];
    
    const confirm = () => {
        notification.success({
            message: 'Delete Successful',
            description: 'Deleted.',
            placement: 'topRight',
            duration: 3
        });
    }

    const onSearch = () => {
        notification.success({
            message: 'Search',
            description: 'Search.',
            placement: 'topRight',
            duration: 3
        });
    }

    return(
        <Row justify={"center"}>
            <Col>
                <Card>
                    <Form>
                        {notEmpty ? (
                            <Form.Item name="propertiesTable">
                                <Table columns={columns} dataSource={properties} pagination={false} />
                            </Form.Item>
                        ) : (
                            <Form.Item name="empty"><Empty /></Form.Item>
                        )}
                        <Form.Item name="buttons">
                            <Row justify={"center"}>
                                <Space>
                                    <Button href="/properties/add">Add</Button>
                                    <Button href="/properties/edit">Edit</Button>
                                    <Popconfirm
                                        title="Delete the property"
                                        description="Are you sure to delete this property?"
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger>Delete</Button>
                                    </Popconfirm>
                                </Space>
                            </Row>
                        </Form.Item>
                        <Form.Item name="searchBar">
                            <Search
                                placeholder="search name"
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

export default Properties;