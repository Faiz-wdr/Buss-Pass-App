import { createContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
export const AppContext = createContext();

const AppProvider = props => {

    // const [students, setStudents] = useState([{ name: 'Isabella Kimon', entered: false, code: 12345 },
    // { name: 'Sebastin Varghese', entered: true, code: 586 },
    // { name: 'Emma Mathew', entered: false, code: 5648 },
    // { name: 'Amelia Nolan', entered: true, code: 789 },
    // { name: 'name', entered: false, code: 235 },
    // { name: 'name', entered: true, code: 12 },])

    const [students, setStudents] = useState([])

    const contextValue = { students, setStudents, getStudents: (e) => getStudents(e) }

    const getStudents = async (busNo) => {

        let tempData = []

        await firestore()
            .collection('Students')
            // Filter results
            .where('busNo', '==', busNo.toString())
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    tempData.push({ id: doc.id, ...doc.data() })
                })
            });
        setStudents(tempData)
    }



    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider
