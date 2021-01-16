import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View} from 'react-native';
import List from './components/List';
import GlobalStyles from './GlobalStyles';


const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List />

  <StatusBar backgroundColor='#00BFFF' barStyle ='light-content' />
    </SafeAreaView>
  );
 }



 export default App;
