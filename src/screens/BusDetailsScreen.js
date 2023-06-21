import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from '../context/AppProvider';

const BusDetailsScreen = ({route}) => {
  const {user} = useContext(AppContext);

  const {bus} = route.params;

  const [loading, setLoading] = useState(true);
  const [studs, setStuds] = useState([]);

  const getStudents = async () => {
    let tmpData = [];
    await firestore()
      .collection('Students')
      .where('adminId', '==', user.id)
      .where('busNo', '==', bus.busNo)
      .get()
      .then(docSnap => {
        docSnap.forEach(doc => {
          tmpData.push({id: doc.id, ...doc.data()});
        });
      });
    setStuds(tmpData);
    setLoading(false);
  };
  const BusItem = () => {
    return (
      <View style={styles.bWrpr}>
        <Text style={styles.bTxt}>Bus {bus.busNo}</Text>
        <Text style={styles.bRoute}>{bus.route}</Text>
      </View>
    );
  };

  const StudItem = ({student}) => {
    return (
      <View style={styles.sWrpr}>
        <Text style={styles.sTxt}>{student.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Bus Details" />
      <BusItem />
      <Text style={styles.title}>Students</Text>
      <FlatList
        data={studs}
        renderItem={({item}) => <StudItem student={item} />}
      />
    </View>
  );
};

export default BusDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  bWrpr: {
    marginTop: 10,
    paddingVertical: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2A4341',
  },
  bTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  bRoute: {
    marginTop: 25,
    color: 'white',
  },
  title: {
    marginTop: 25,
    fontSize: 18,
    color: '#2A4341',
    fontWeight: '700',
  },
  sWrpr: {
    marginTop: 10,
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  sTxt: {
    color: 'black',
  },
});
