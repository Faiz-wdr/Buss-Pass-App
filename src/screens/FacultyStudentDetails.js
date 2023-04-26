import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import FCardBg from '../assets/images/fCard.png'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import Btn from '../components/Btn';
import { AppContext } from '../context/AppProvider';

const FacultyStudentDetails = ({ route, navigation }) => {
    // console.log(route.params)
    const { studentCode } = route.params


    const { students, setStudents } = useContext(AppContext)

    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(true)

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    const onAdmit = () => {
        students.forEach((s, idx) => {
            if (s.id == studentCode) {

                students[idx].entered = true
                setStudents([...students])
                navigation.navigate('BusFacultyHome')
            }
        })
    }

    const getStudent = async () => {
        students.forEach((s, idx) => {
            if (s.id == studentCode) {

                // students[idx].entered = true
                setStudent(s)
                console.log(student)
            }
        })

        // await firestore()
        //     .collection('Students')
        //     .doc(studentCode)
        //     .get()
        //     .then(documentSnapshot => {
        //         console.log('User exists: ', documentSnapshot.exists);

        //         if (documentSnapshot.exists) {
        //             console.log('User data: ', documentSnapshot.data());
        //             setStudent(documentSnapshot.data())
        //         } else {
        //             Alert.alert('No User Present')
        //         }
        //     });

        setLoading(false)
    }

    const FacultyCard = () => {
        return (
            <ImageBackground source={FCardBg} resizeMode='contain' style={styles.fCard} >
                <Text style={styles.fName}>{student?.name}</Text>
                <Text style={styles.busNo}>Bus No: <Text style={{ color: 'white' }} >{student?.busNo}</Text></Text>
                <Text style={styles.loc}>{student?.from}- KMCT</Text>
                <View style={styles.fLine} />
            </ImageBackground>
        )
    }
    useEffect(() => {
        getStudent()
    }, [])


    if (loading) return <Loader />
    return (
        <ScrollView style={styles.container} >
            <Header title={'TripSpark'} />

            <FacultyCard />

            <View>
                <Text style={styles.feeTitle}>Fee Details</Text>
                <View style={styles.tWrpr}>
                    {
                        months.map((m, id) => <View style={[styles.tRow, { backgroundColor: id % 2 == 0 ? '#EDEDED' : '#F6F6F6' }]}>
                            <Text style={styles.text}>{m}</Text>
                            <Text style={styles.text}>10,000</Text>
                            {student?.FeesPaid?.includes(m) ? <Text style={[styles.tRow, { color: '#23B70B' }]}>Paid</Text> : <Text style={[styles.tRow, { color: '#B70B0B' }]}>Pending</Text>}
                        </View>
                        )
                    }
                </View>
            </View>
            <Btn onPress={onAdmit} label={'Admit'} containerStyle={{ marginVertical: 25, }} />
        </ScrollView>
    )
}

export default FacultyStudentDetails

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    fCard: {
        marginTop: 25,
        padding: 22,
        paddingVertical: 28,
        // backgroundColor: '#2A4341',
        borderRadius: 10,
    },
    fName: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white'
    },
    busNo: {
        marginVertical: 8
    },
    loc: {
        marginTop: 15,
        fontSize: 18,
        color: 'white'
    },
    fLine: {
        height: 1,
        backgroundColor: 'white',
        marginVertical: 8
    },
    feeTitle: {
        marginTop: 30,
        color: '#2A4341',
        fontWeight: '700'
    },
    tWrpr: {
        marginTop: 20
    },
    tRow: {
        padding: 3,
        flexDirection: 'row'
    },
    text: {
        width: '30%',
        color: '#000000'
    }
})