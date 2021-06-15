import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Platform, SafeAreaView, 
    StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, FAB, Icon, ListItem, Overlay, SearchBar } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import { ChatRoomScreen } from './ChatRoomScreen';
import db from '../../firebase/firestore';

const ChatScreen = ( {navigation} ) => {
    const [initialChats, setInitialChats] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [visible, setVisible] = useState(false);
    const [newChat, setNewChat] = useState('');

    const filtering = (text) => {
        setSearch(text);
        if (text) {
            const filtered = initialChats.filter(
                function (item) {
                    const newChats = item.name 
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textMsg = text.toUpperCase();
                    return newChats.indexOf(textMsg) > -1;
                }
            )
            setChats(filtered);
        } else {
            setChats(initialChats);
        }
    }

    const handleDeletePress = ( id )  => {
        db
            .collection('THREADS')
            .doc(id)
            .delete();
    };

    const rightAction = ( id ) => (
        <Button
            buttonStyle={styles.rectButton}
            containerStyle={styles.rectButton}
            icon={
                <Icon
                    name='trash-2'
                    type='feather'
                    color='#ffffff'
                    size={35}
                />
            }
            onPress={ () => handleDeletePress(id) }
        >     
        </Button>
    )

    const add = () => (
        <Icon
            name='plus'
            type='feather'
            color='#ffffff'
        />
    )

    const renderChat = ({ item }) => (
        <Swipeable
            renderRightActions={ () => rightAction(item._id) }
        >
            <TouchableOpacity
                onPress={() => navigation.navigate('ChatRoom', { thread: item })}
            >
            <ListItem
                bottomDivider='true'
                containerStyle={styles.chat}
            >
                <Avatar 
                    source={require('../../assets/images/user.png')}
                    rounded='true'
                    size='medium'
                />

                <ListItem.Content style={styles.content}>
                    <ListItem.Title
                        style={styles.name}
                    >
                        {item.name}
                    </ListItem.Title>
                    
                    <ListItem.Subtitle
                        style={styles.latestMessage}
                    >
                        {item.latestMessage.text}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            </TouchableOpacity>
        </Swipeable>
    );

    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const handleCreatePress = () => {
        if (newChat.length > 0) {
          db
            .collection('THREADS')
            .add({
              name: newChat,
              latestMessage: {
                  text: `You have joined the room ${newChat}.`,
                  createdAt: new Date().getTime()
              }
            })
            .then((docRef) => {
                docRef
                    .collection('MESSAGES')
                    .add({
                        text: `You have joined the room ${newChat}.`,
                        createdAt: new Date().getTime(),
                        system: true
                    });

                toggleOverlay();
            })
            .catch(error => {
                console.error("Error creating chat: ", error);
            })

            setNewChat('');
        }
    }

    // to comment here after
    useEffect(() => {
        const unsubscribe = db
            .collection('THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                const threads = querySnapshot.docs.map((queryDocumentSnapshot) => {
                    return {
                        _id: queryDocumentSnapshot.id,
                        name: '',
                        latestMessage: {
                            text: '',
                            createdAt: new Date().getTime()
                        },
                        ...queryDocumentSnapshot.data()
                    }
                });

                setInitialChats(threads);
                setChats(initialChats);

                if (loading) {
                    setLoading(false);
                }
            });
        
        return () => unsubscribe();
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={{justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='#be75e4' />
                </View>
            ) : (
                <View>
                    {Platform.OS === 'ios' ? (
                        <SearchBar
                        placeholder='Search'
                        onChangeText={(text) => filtering(text)}
                        value={search}
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.textInputBar}
                        round='true'
                        platform='ios'
                    />) : (
                        <SearchBar
                        placeholder='Search'
                        onChangeText={(text) => filtering(text)}
                        value={search}
                        containerStyle={styles.searchBar}
                        inputContainerStyle={styles.textInputBar}
                        round='true'
                    />)}

                    <FlatList
                        data={chats}
                        renderItem={renderChat}
                        keyExtractor={item => item._id}
                    />

                    <FAB
                        icon={add}
                        placement='right'
                        onPress={toggleOverlay}
                    />

                    <Overlay
                        isVisible={visible}
                        onBackdropPress={toggleOverlay}
                        overlayStyle={styles.overlay}
                    >
                        <Text style={styles.room}>Create a new chat room</Text>
                        <TextInput 
                            placeholder='Room name'
                            maxLength={40}
                            onChangeText={setNewChat}
                            value={newChat}
                            style={styles.roomName}
                        />
                        <TouchableOpacity
                            disabled={newChat.length === 0}
                            onPress={handleCreatePress}
                            style={styles.createButton}
                        >
                            <Text style={styles.create}>CREATE</Text>
                        </TouchableOpacity>
                    </Overlay>
                </View>
            )}
        </SafeAreaView>
    )
}

const Stack = createStackNavigator();

export const ChatHomeScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName='Chats'
        >
            <Stack.Screen 
                name='Chats' 
                component={ChatScreen}
                options={
                    {headerShown: false}
                }
            />
            <Stack.Screen 
                name='ChatRoom' 
                component={ChatRoomScreen} 
                options={({route}) => ({
                    title: route.params.thread.name
                })}
            />
        </Stack.Navigator>
    )

}

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffd966'
    },
    chat: {
        width: fullWidth,
        height: 70
    },
    content: {
        justifyContent: 'flex-start'
    },
    latestMessage: {
        color: '#888888',
    },
    rectButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0000'
    },
    searchBar: {
        backgroundColor: '#ffd966',
        borderBottomColor: '#efefef',
        borderTopColor: 'transparent',
        width: fullWidth,
        height: 55
    }, 
    textInputBar: {
        backgroundColor: '#efefef',
        height: 40
    },
    name: {
        fontWeight: 'bold',
    },
    overlay: {
        height: 150,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    room: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 15
    },
    roomName: {
        alignSelf: 'flex-start',
        fontSize: 15,
        marginBottom: 20,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderBottomColor: '#be75e4',
        width: 260,
        padding: 5
    },
    createButton: {
        borderRadius: 30,
        backgroundColor: '#be75e4',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    create: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    }
})