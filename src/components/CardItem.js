import React, { useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Options } from '../components/Options.js';

export const CardItem = ({
  address,
  contact,
  image,
  name,
  operation, 
  options,
  reviews,
  website
}) => {
  const [information, setInformation] = useState(true);

  return (
    <View style={styles.containerCardItem}>
      <Image source={image} style={styles.image}/>

      <TouchableOpacity 
        style={styles.info}
        onPress={() => setInformation(information => !information)}>
        <Icon
          name='info'
          type='feather'
          color='#434343'
        />
      </TouchableOpacity>

      <Text style={styles.name}>{name}</Text>

      {information ? (
        <ScrollView style={styles.description}>
          <Text style={styles.padding}>{address}</Text>

          <Text style={[styles.contact, styles.padding]}>
            <Text style={{color: '#000000', fontWeight: 'normal'}}>Phone: </Text>

            {contact}
          </Text>

          <Text style={[styles.operation, styles.padding]}>
            <Text style={{fontWeight: 'normal'}}>Operation hours: </Text>

             {operation} 
          </Text>

          <Options arr={options}/>
        </ScrollView>
      ) : (
          <ScrollView
            style={styles.description}
            contentContainerStyle={{justifyContent: 'center'}}
          >
            <View style={[styles.padding, {flexDirection: 'row'}]}>
              <Text>Website: </Text>

              <TouchableOpacity 
                onPress={() => Linking.openURL(website)}>
                <Text style={styles.website}>{website}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.padding}>
              <Text>Reviews:</Text>

              <Text style={styles.reviews}>{reviews}</Text>
            </View>
            
          </ScrollView>
      )}
      
    </View>
  );
};

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contact: {
      color: '#1a0dab',
      fontWeight: 'bold',
    },
    containerCardItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 20,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: 'rgb(0,0,0.5)',
        shadowOffset: { height: 0, width: 0 },
        width: fullWidth - 60,
        height: fullHeight - 230,
    },
    description: {
      marginLeft: 15
    },
    image: {
      borderRadius: 10,
      width: fullWidth - 60,
      height: 420,
    },
    info: {
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 250,
      right: 5
    },
    name: {
      paddingBottom: 7,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 7,
      color: '#363636',
      fontSize: 35,
      fontWeight: 'bold',
    }, 
    operation: {
      fontWeight: 'bold',
    },
    op: {
      paddingTop: 1,
    },
    padding: {
      padding: 1,
    },
    reviews: {
      color: '#434343'
    },
    website: {
      color: '#1155cc',
      textDecorationLine: 'underline',
    }
})