import { createContext, useState } from 'react';

export const AppContext = createContext({});

const AppContextProvider = (props) => {
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([
        {key: 'admin', password: "password"},
        {key: 'Artem', password: "artem"}
    ]);

    const addProperty = (property) => {
        setProperties((prevProperties) => [...prevProperties, property]);
    };

    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <AppContext.Provider value={{properties, addProperty, users, addUser}}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;