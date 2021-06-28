import React, { useEffect, useState } from 'react';
import {
  Keyboard, 
  SafeAreaView, 
  StyleSheet,
  Text,
  TextInput, 
  TouchableOpacity, 
  View,
} from 'react-native';
import { Icon, Image, Overlay } from 'react-native-elements';
import { CommonActions } from "@react-navigation/native";
import * as Authentication from "../../firebase/auth";

const Dietary = (props) => {
    const {diets} = props;
    return (
        <View style = {styles.info}>
            {diets.map((diet, index) =>
                <View 
                  style = {styles.infoContainer}
                  key={index}
                >
                    <Text style = {styles.infoText}>{diet}</Text>
                </View>
            )}
        </View>
    );
}

const exampleDiet = ["vegan", "gluten-free"];

export const ProfileScreen = ({navigation}) => {
  // for viewing the profile picture in large and giving the option to Change Profile Photo
  const [profile, setProfile] = useState(false);

  // for the Change Profile Photo overlay
  const [change, setChange] = useState(false);

  // for the Upload Photo overlay
  const [upload, setUpload] = useState(false);

  // url when user types in the new url for their display photo
  const [url, setUrl] = useState('');

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const displayPhoto = Authentication.getCurrentUserPhoto();

    setPhoto(displayPhoto);
  })

  const onLogoutPress = () => Authentication.logout(
    () => navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }]
    })),
    (error) => {
      return alert(error);
    }
  );

  const uploadPhoto = (url) => Authentication.changePhoto(
    { photo: url }, 
    () => {
      setUpload(!upload);
      setUrl('');
    },
    (error) => {
      return alert(error);
    }
  );

  const removePhoto = () => Authentication.changePhoto(
    { photo: 'https://img.flaticon.com/icons/png/512/149/149071.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF' }, 
    () => setChange(!change),
    (error) => {
      return alert(error);
    }
  );
  
    return (
        <SafeAreaView style={styles.container}>
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
                onPress={() => uploadPhoto(url)}
                style={{marginHorizontal: 30, marginTop: 30}}
              >
                <Text style={styles.photoText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
          
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{Authentication.getCurrentUserName()}</Text>
              <Dietary diets={exampleDiet}/>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Favourite Restaurants</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text></Text> 
              </TouchableOpacity>
            </View>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#ffd966",
    height:200,
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
    color: "#ffffff",
    shadowColor: "#696969",
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowOpacity:0.8,
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:30,
  },
  info: {
    marginTop:10,
    height:20,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom:10,
    width:300,
  },
  infoContainer: {
    height:25,
    alignItems: 'center',
    justifyContent: 'center',
    width:90,
    borderRadius:20,
    marginHorizontal:10,
    backgroundColor: "#ffd966",
  },
  infoText: {
    fontSize:12,
    color: "#696969",
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width:350,
    borderRadius:20,
    backgroundColor: "#ffffff",
    shadowColor: "#696969",
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowOpacity:0.8,
  },
});
