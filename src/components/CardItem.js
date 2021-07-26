import React, { useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Options } from '../components/Options';

export const CardItem = ({
  address,
  categories,
  contact,
  image_url,
  name,
  price,
  rating,
  //transactions,
  website
}) => {
  const [information, setInformation] = useState(true);
  const picture = image_url
  ? <Image source={{uri: image_url}} style={styles.image}/>
  : <Image source={require('../../assets/images/cactus_error.png')} style= {styles.image}/>

  return (
    <View style={styles.containerCardItem}>
      { picture }
      
      <TouchableOpacity 
        style={styles.info}
        onPress={() => setInformation(information => !information)}>
        <Icon
          name='info'
          type='feather'
          color='#ffffff'
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

          <Text style={[styles.hours, styles.padding]}>
            <Text style={{fontWeight: 'normal'}}>Hours: </Text>

          </Text>

          <Text style={[styles.hours, styles.padding, { paddingTop: 25}]}>
            <Text style={{fontWeight: 'normal'}}>Price: </Text>
            
            {price}
          </Text>

          <View style={styles.option}>
            <Text>Transactions: </Text>

            {/* <Options arr={transactions}/> */}
          </View>  

          <View style={styles.option}>
            <Text>Categories: </Text>

            <Text style={{fontWeight: 'bold'}}>{categories.map(item => item.title).join(', ')}</Text>
          </View> 

        </ScrollView>
      ) : (
          <ScrollView
            style={styles.description}
            contentContainerStyle={{justifyContent: 'center'}}
          >
            <Text style={[styles.hours, styles.padding]}>
              <Text style={{fontWeight: 'normal'}}>Rating: </Text>

              {rating}
            </Text>  

            <View style={[styles.padding, {flexDirection: 'row', flexWrap: 'wrap'}]}>
              <Text>Website: </Text>

              <TouchableOpacity 
                onPress={() => Linking.openURL(website)}>
                <Text style={styles.website}>{website}</Text>
              </TouchableOpacity>
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
    hours: {
      fontWeight: 'bold',
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
    op: {
      flexDirection: 'row',
      marginLeft: 1,
    },
    option: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 1
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