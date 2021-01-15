import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import List from './components/List';
import GlobalStyles from './GlobalStyles';


const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <List />
  <StatusBar style="auto" />
    </SafeAreaView>
  );
 }



 export default App;
