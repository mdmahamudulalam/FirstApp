import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';


const ListItem = (props) => {
  return (



    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.imgView}
        source={{uri: props.singleMedia.thumbnails.w160}}
      />

      <View style={styles.childContainer}>
        <Text style={styles.title}>{props.singleMedia.title}</Text>
        <Text style={styles.description}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 2,
    padding: 4,
    backgroundColor: '#7FFFD4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'},

  childContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12},

  title: {
    flex: 1,
    flexDirection: 'row',
    color: '#DC143C',
    fontWeight:'bold',
    fontFamily: 'Roboto',
    fontSize: 21,
    margin: 2,
    padding: 2},

  imgView: {
    margin:'auto',
    width: 150,
    height: 150,
    borderRadius: 150/2},

  description:{
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 17,
  }
});





