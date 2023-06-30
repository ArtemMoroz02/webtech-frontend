import React, { useContext, useState } from "react"
import { Form, Select, InputNumber, Button, Card, Input, Row, Col, notification} from 'antd'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../contexts/AppContext";

const { Option } = Select;

const PropertyEdit = () => {
    const [nameError, setNameError] = useState(false);
    const [name, setName] = useState('name to edit');
    const [price, setPrice] = useState(100);
    const [surface, setSurface] = useState(50);
    const [type, setType] = useState('defaultType');
    const [status, setStatus] = useState('defaultStatus');
    const { properties, addProperty } = useContext(AppContext);

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
    };

    const handlePriceChange = (value) => {
        const newPrice = value;
        setPrice(newPrice);
    };
    
    const handleSurfaceChange = (value) => {
        const newSurface = value;
        setSurface(newSurface);
    };
    
    const handleTypeChange = (value) => {
        const newType = value;
        setType(newType);
    };
    
    const handleStatusChange = (value) => {
        const newStatus = value;
        setStatus(newStatus);
    };

    const handleButtonClick = () => {
        if (!name) {
            setNameError(true);
            notification.error({
                message: 'Edit Property Failed',
                description: 'Property must have a name.',
                placement: 'topRight',
                duration: 3
            });
            return;
        }
        if (properties.some(property => property.key === name)) {
            setNameError(true);
            notification.error({
                message: 'Add Property Failed',
                description: 'Property name is already taken.',
                placement: 'topRight',
                duration: 3
            });
        }
        else
        {
            const newProperty = { key: name, price: price, surface: surface, type: type, status: status };
            addProperty(newProperty);
            navigate("/properties");
            notification.success({
                message: 'Edit Property Successful',
                description: 'The property {name} has been edited.'.replace('{name}', name),
                placement: 'topRight',
                duration: 3
            });
        }
    };

    const selectAfter = (
        <Select
          defaultValue="USD"
          style={{
            width: 60,
          }}
        >
          <Option value="USD">$</Option>
          <Option value="EUR">€</Option>
          <Option value="GBP">£</Option>
          <Option value="CNY">¥</Option>
        </Select>
    );

    return(
        <Row justify="center">
            <Col>
                <Card>
                    <Form>
                        <Form.Item name="name">
                            Name:<Input status={nameError ? "error" : ""} onChange={handleNameChange} defaultValue={"name to edit"} />
                        </Form.Item>
                        <Form.Item name="price">
                            Price: <InputNumber type="number" min="1" oninput="validity.valid||(value='');" addonAfter={selectAfter} onChange={handlePriceChange} onStep={handlePriceChange} defaultValue={100} />
                        </Form.Item>
                        <Form.Item name="surface">
                            Surface: <InputNumber type="number" min="1" oninput="validity.valid||(value='');" addonAfter="m^2" onChange={handleSurfaceChange} onStep={handlePriceChange} defaultValue={50} />
                        </Form.Item>
                        <Form.Item name="type">
                            Type: <Select defaultValue="defaultType" style={{width: 120}} onChange={handleTypeChange}
                                options={[
                                    {
                                        value: 'defaultType',
                                        label: 'DefaultType',
                                    },
                                    {
                                        value: 'type1',
                                        label: 'Type1',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="status">
                            Status: <Select defaultValue="defaultStatus" style={{width: 120}} onChange={handleStatusChange}
                                options={[
                                    {
                                        value: 'defaultStatus',
                                        label: 'DefaultStatus',
                                    },
                                    {
                                        value: 'status1',
                                        label: 'Status1',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Row justify="center">
                                <Button type="primary" onClick={handleButtonClick}>Edit</Button>
                                <Button type="link" href="/properties">Cancel</Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default PropertyEdit;