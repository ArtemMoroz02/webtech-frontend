import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = (props) => {
    return(
        <Footer
            style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'center'
            }}>
            (c) 2023 Created by Artem Moroz
        </Footer>
    )
};

export default FooterComponent;