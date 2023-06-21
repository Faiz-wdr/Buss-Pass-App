/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import FCardBg from '../assets/images/fCard.png';
import Btn from '../components/Btn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import {AppContext} from '../context/AppProvider';
import QRIco from '../assets/icons/qr.png';

const StudentHomeScreen = ({navigation}) => {
  const {user, setUser} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  // const [students, setStudents] = useState([])

  const getUserDetails = async () => {
    const email = auth().currentUser.email;
    console.log(email);
    await firestore()
      .collection('Students')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          // Alert.alert('Please Try again')
          navigation.navigate('AdminHome');
        }
        querySnapshot.forEach(doc => {
          setUser({id: doc.id, ...doc.data()});
        });
      });

    setLoading(false);
  };

  const onBackPress = () => {
    Alert.alert('Logout', 'Are you sure want to logout', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => auth().signOut()},
    ]);
  };

  const RightIco = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('QrCodeScreen', {
          link: 'https://www.buspass/student/' + user.id,
        })
      }>
      <Image source={QRIco} style={{width: 25, height: 25}} />
    </TouchableOpacity>
  );

  const FacultyCard = () => {
    return (
      <ImageBackground
        source={FCardBg}
        resizeMode="contain"
        style={styles.fCard}>
        <Text style={styles.fName}>{user?.name}</Text>
        <Text style={styles.busNo}>
          Bus No: <Text style={{color: 'white'}}>{user?.busNo}</Text>
        </Text>
        <Text style={styles.loc}>{user?.from} - KMCT</Text>
        <View style={styles.fLine} />
      </ImageBackground>
    );
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header
        onBackPress={onBackPress}
        title={'TripSpark'}
        right={<RightIco />}
      />

      <FacultyCard />
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Text style={styles.txtBtn}>Where is my bus?</Text>
      </TouchableOpacity>
      <View style={{flex: 1}} />
      <Btn
        onPress={() => navigation.navigate('StudentFeePayment')}
        label={'Fee Payment'}
        containerStyle={{marginVertical: 25}}
      />
    </View>
  );
};

export default StudentHomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#F6F6F6',
    flex: 1,
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
    color: 'white',
  },
  busNo: {
    marginVertical: 8,
  },
  loc: {
    marginTop: 15,
    fontSize: 18,
    color: 'white',
  },
  fLine: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 8,
  },
  nameWrpr: {
    marginTop: 35,
  },
  nContainer: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  nName: {
    color: 'black',
    fontSize: 16,
  },
  nDot: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  txtBtn: {
    color: '#2A4341',
    fontWeight: '700',
    fontSize: 18,
  },
});
