import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';


const ListItem = (props) => {
  return (
    <TouchableOpacity style={{flex: 1,flexDirection: 'row',margin: 4,padding: 5,backgroundColor: 'orange', borderRadius: 8, alignItems: 'center',
      justifyContent: 'center'}}>

      <Image
        style={{margin:'auto', paddingTop: 10, width: 150, height: 150, borderRadius: 150/2}}
        source={{uri: props.singleMedia.thumbnails.w160}}
      />
      <View style={{flex: 1, flexDirection: 'column', margin: 5}}>
        <Text style={{flex: 1,flexDirection: 'row', color: 'green', fontWeight:'bold', fontSize: 20, margin: 2, padding: 2}}>{props.singleMedia.title}</Text>
        <Text style={{color: 'black'}}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;

