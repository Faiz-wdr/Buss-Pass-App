import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import { AppContext } from '../context/AppProvider'
import CheckboxComp from '../components/CheckBoxComp'
import Btn from '../components/Btn'
const StudentFeePayment = () => {

    const { user } = useContext(AppContext)

    const [selectedMonths, setSelectedMonths] = useState([...user?.FeesPaid])

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const onSelectCheckbox = (month) => {
        if (selectedMonths.includes(month)) {
            // Remove the month from the array
            const updatedArray = selectedMonths.filter((item) => item !== month);
            setSelectedMonths(updatedArray);
        } else {
            // Add the element to the array
            const updatedArray = [...selectedMonths, month];
            setSelectedMonths(updatedArray);
        }
    }

    return (
        <View style={styles.container}>
            <Header title='TripSpark' />

            <Text style={styles.title}>Fee Payment</Text>
            <ScrollView style={styles.sub}>
                <Text style={styles.subTitle}>
                    Select Months
                </Text>

                <View style={{marginTop:10}} >
                    {months.map(month =>
                        <View style={styles.monWrpr} >
                            <Text style={styles.mTitle} >{month}</Text>
                            <CheckboxComp onPress={() => onSelectCheckbox(month)} disabled={user.FeesPaid.includes(month)} checked={selectedMonths.includes(month)} />
                        </View>
                    )}
                </View>

                <View style={styles.totalWrpr} >
                    <Text style={styles.tTitle}>Total</Text>
                    <Text style={styles.total}>{(selectedMonths.length - user.FeesPaid.length) * 1000}</Text>
                </View>

                <Btn label='Proceed' containerStyle={{marginBottom:20}} />

            </ScrollView>

        </View>
    )
}

export default StudentFeePayment

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    title: {
        marginTop: 15,
        color: "#2A4341",
        fontWeight: '700'
    },
    sub: {
        padding: 10
    },
    subTitle: {
        color: "#2A4341"
    },
    monWrpr: {

        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 5
    },
    mTitle: {
        color: 'black'
    },
    totalWrpr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EBEBEB',
        padding: 10
    },
    tTitle: {
        color: 'black',

    },
    total: {
        color: 'black',
        fontWeight: '700'
    }

})