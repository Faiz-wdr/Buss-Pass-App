import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = props => {

    const [students, setStudents] = useState([{ name: 'Isabella Kimon', entered: false, code: 12345 },
    { name: 'Sebastin Varghese', entered: true, code: 586 },
    { name: 'Emma Mathew', entered: false, code: 5648 },
    { name: 'Amelia Nolan', entered: true, code: 789 },
    { name: 'name', entered: false, code: 235 },
    { name: 'name', entered: true, code: 12 },])

    const contextValue = { students, setStudents }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider
