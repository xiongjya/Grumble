import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Linking, SafeAreaView, ScrollView, StyleSheet,Text,TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Overlay } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';

import * as Authentication from '../../../firebase/auth';
import * as Firestore from '../../../firebase/firestore';

import text from '../../styles/text';

export const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({});

  // for viewing the profile picture in large and giving the option to Change Profile Photo
  const [profile, setProfile] = useState(false);

  // for the Change Profile Photo overlay
  const [change, setChange] = useState(false);

  // for the Upload Photo overlay
  const [upload, setUpload] = useState(false);

  // url when user types in the new url for their display photo
  const [url, setUrl] = useState('');

  const [photo, setPhoto] = useState(null);

  const [history, setHistory] = useState([]);

  const [favourited, setFavourited] = useState([]);

  const History = ({ item }) => {
    const [star, setStar] = useState(item.favourited);

    const onPress = () => {
      if (star) {
        Firestore.removeFavourites(user.uid, item);
      } else {
        Firestore.addFavourites(user.uid, item);
      }
      setStar(!star);
    }

    return (
      <TouchableOpacity
        onPress={() => googleRestaurant(item)}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={text.bold}>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
          </ListItem.Content>

          <Icon
            name={star ? 'star' : 'staro'}
            type='antdesign'
            size={20}
            color='#ffd996'
            onPress={(onPress)}
          />
        </ListItem>
      </TouchableOpacity>
    );
  }

  const Favourite = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => googleRestaurant(item)}
        >
          <ListItem
          >
            <ListItem.Content>
              <ListItem.Title style={text.bold}>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      )
  }

  const googleRestaurant = (restaurant) => {
    let url = 'https://www.google.com/search?q=';

    const name = restaurant.name.replace(' ', '+');
    url += name;

    const location = restaurant.location.replace(' ', '+');
    url += '+';
    url += location;

    return Linking.openURL(url);
  }

  const onLogoutPress = () => Authentication.logout(
    () => navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }]
    })),
    (error) => {
      return alert(error);
    }
  );

  const uploadPhoto = (url) => {
    // only allow valid change when the url ends with .jpg or .png
    if (!url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      url = 'https://img.flaticon.com/icons/png/512/149/149071.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF';
    }

    return Authentication.changePhoto(
      { photo: url }, 
      () => {
        setUpload(!upload);
        setUrl('');
      },
      (error) => {
        return alert(error);
      }
    );
  }

  const removePhoto = () => Authentication.changePhoto(
    { photo: 'https://img.flaticon.com/icons/png/512/149/149071.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF' }, 
    () => setChange(!change),
    (error) => {
      return alert(error);
    }
  );

  useEffect(() => {
    const user = Authentication.getCurrentUserObject();

    const displayPhoto = user.photoURL;
    setPhoto(displayPhoto);

    const userId = user.uid;

    const historyListener = Firestore.db 
        .collection('USERS')
        .doc(userId)
        .collection('history')
        .onSnapshot((querySnapshot) => {
          const restaurants = querySnapshot.docs.map((doc) => {
            const firebaseData = doc.data();

            const data = {
              _id: doc.id,
              ...firebaseData
            }

            return data;
          })

          const favourites = restaurants.filter(res => res.favourited);

          setUser(user);
          setHistory(restaurants);
          setFavourited(favourites);
        })

    return () => historyListener();
  }, [profile, change, upload, url, photo]);
  
    return (
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={onLogoutPress}
            >
              <Icon
                name='log-out'
                type='feather'
                color='#434343'
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => setProfile(!profile)}
            style={styles.avatarContainer}
          >
            <Image 
              style={[styles.avatar, {borderWidth: 4, borderColor: "white"}]} 
              source={{ uri: photo}}
            />
          </TouchableOpacity>

          <Overlay
            isVisible={profile} 
            onBackdropPress={() => setProfile(!profile)}
            overlayStyle={styles.photoContainer}
          >
            <Image 
              style={[styles.avatar, {marginBottom: 20}]} 
              source={{ uri: photo }}
            />

            <TouchableOpacity
              onPress={() => { setProfile(!profile); setChange(!change); }}
            >
              <Text style={styles.photoText}>
                Change Profile Photo
              </Text>
            </TouchableOpacity>
            
          </Overlay>

          <Overlay
            isVisible={change} 
            onBackdropPress={() => setChange(!change)}
            overlayStyle={[styles.photoContainer, {height: 150}]}
          >
            <Text style={[styles.photoText, {color: 'dimgray', fontSize: 20}]}>
                Change Profile Photo
            </Text>

            <View style={{width: 270, borderBottomColor: 'lightgray', borderBottomWidth: 1, margin: 10}}>
            </View>

            <TouchableOpacity
              onPress={() => { setUpload(!upload); setChange(!change) }}
            >
              <Text style={styles.photoText}>
                Upload Photo
              </Text>
            </TouchableOpacity>

            <View style={{width: 270, borderBottomColor: 'lightgray', borderBottomWidth: 1, margin: 10}}>
            </View>

            <TouchableOpacity
              onPress={removePhoto}
            >
              <Text style={[styles.photoText, {color: '#ff0000'}]}>
                Remove Current Photo
              </Text>
            </TouchableOpacity>
          </Overlay>

          <Overlay
            isVisible={upload} 
            onBackdropPress={() => Keyboard.dismiss()}
            overlayStyle={[styles.photoContainer, {height: 150}]}
          >
            <TextInput
              placeholder='Enter the url of your desired image...'
              value={url}
              onChangeText={setUrl}
            />

            <View style={{alignItems: 'center', justifyContent: 'center-between', flexDirection: 'row'}}>
              <TouchableOpacity 
                onPress={() => setUpload(!upload)}
                style={{marginHorizontal: 30, marginTop: 30}}
              >
                <Text style={[styles.photoText, {color: 'dimgray', fontWeight: 'normal'}]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                disabled={url.length === 0}
                onPress={() => uploadPhoto(url)}
                style={{marginHorizontal: 30, marginTop: 30}}
              >
                <Text style={styles.photoText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
          
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{Authentication.getCurrentUserObject().displayName}</Text>

              <View style={{margin: 10}}>
                <Text style={[styles.section, text.bold]}>Favourites</Text>  
                <View style={styles.buttonContainer}>
                  <ScrollView style={{borderRadius: 30}}>
                    {favourited.map((item, index) => 
                      (<Favourite
                        item={item}
                        key={index}
                      />))}
                  </ScrollView>
                </View>
              </View>

              <View style={{margin: 10}}>            
                <Text style={[styles.section, text.bold]}>History</Text>               
                <View style={[styles.buttonContainer, {height: 195}]}>
                  <ScrollView style={{borderRadius: 30}}>
                    {history.map((item, index) => 
                      (<History
                        item={item}
                        key={index}
                      />))}
                  </ScrollView>
                </View>
              </View> 
            </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#ffd966",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63
  },
  avatarContainer: {
    flex: 1, 
    alignSelf: 'center', 
    position: 'absolute', 
    marginBottom: 10, 
    marginTop: 130
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 230,
    borderRadius: 30
  },
  photoText: {
    fontWeight: 'bold',
    color: '#be75e4'
  },
  logoutButton: {
    marginTop: 7,
    marginRight: 7,
    alignSelf: 'flex-end',
  },
  name:{
    fontSize:22,
    fontWeight:'600',
    color: "#ffffff",
    shadowColor: "#696969",
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowOpacity:0.8,
    marginBottom: 5
  },
  bodyContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  },
  section: {
    marginLeft: 20
  },
  buttonContainer: {
    margin: 10,
    height: 135,
    width: 350,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#696969",
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowOpacity:0.8,
  },
});