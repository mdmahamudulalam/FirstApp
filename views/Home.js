import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import List from '../components/List';
import GlobalStyles from '../GlobalStyles';
import PropTypes from 'prop-types';

const Home = ({navigation} ) => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation}/>


  <StatusBar backgroundColor='#00BFFF' barStyle ='light-content' />
    </SafeAreaView>
  )
};
Home.protoTypes ={
 navigation: PropTypes.object,
};

export default Home;
