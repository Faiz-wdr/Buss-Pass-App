import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import TextInputComp from '../components/TextInputComp'
import ProfImagePicker from '../components/ProfImagePicker'
import Btn from '../components/Btn'
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../context/AppProvider'
import { uploadPic } from '../helpers/uploadPic'

const AddStudentScreen = ({ navigation }) => {
    const { user } = useContext(AppContext)

    const [profImg, setProfImg] = useState()
    const [name, setName] = useState('')
    const [Dpt, setDpt] = useState('')
    const [year, setYear] = useState('')
    const [busNo, setBusNo] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const submitHandler = async () => {

        if (!name || !Dpt || !year || !busNo || !email) return Alert.alert('Fill all details.')
        setLoading(true)
        let profUrl = ''
        if (profImg) {
            profUrl = await uploadPic('email' + new Date().toString(), profImg)
        }

        // await auth().createUserWithEmailAndPassword(email, 'ans12345')
        await firestore()
            .collection('Students')
            .add({
                busNo, name, Dpt, year, adminId: user.id, busNo, email,
                profUrl, timestamp: new Date()
            })
            .then(() => {
                console.log('User added!');
                setLoading(false)
                navigation.goBack()
            });
    }
    return (
        <View style={styles.container}>
            <Header title={'TripSpark'} />

            <Text style={styles.title} >Add Student</Text>
            <View style={styles.sub} >

                <ProfImagePicker profileImg={profImg} setProfileImg={setProfImg} />


                <TextInputComp placeholder='Full Name' onChangeText={(e) => setName(e)} />
                <View style={{ marginTop: 10, flexDirection: 'row' }} >
                    <TextInputComp placeholder='Departmemt' containerStyle={{ flex: 1 }} onChangeText={(e) => setDpt(e)} />
                    <TextInputComp keyboardType={'numeric'} placeholder='Year' containerStyle={{ marginLeft: 10, flex: 1 }} onChangeText={(e) => setYear(e)} />
                </View>
                <TextInputComp placeholder='Bus No.' keyboardType={'numeric'} containerStyle={{ marginVertical: 10 }} onChangeText={(e) => setBusNo(e)} />
                <TextInputComp placeholder='Email' onChangeText={(e) => setEmail(e)} />
            </View>
            <Btn label={loading ? 'Loading...' : 'submit'} onPress={submitHandler} disabled={loading} />
        </View>
    )
}

export default AddStudentScreen

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: "#F6F6F6",
        flex: 1
    },
    title: {
        marginTop: 25,
        fontSize: 18,
        color: '#2A4341',
        fontWeight: '700'
    },
    sub: {
        marginTop: 25,
        flex: 1,
    }
})