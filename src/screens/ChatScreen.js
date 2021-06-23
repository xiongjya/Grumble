import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Platform, SafeAreaView, 
    StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Icon, ListItem, Overlay, SearchBar } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import { ChatRoomScreen } from './ChatRoomScreen';
import * as Authentication from '../../firebase/auth';
import db from '../../firebase/firestore';

const ChatScreen = ( {navigation} ) => {
    const [chatnames, setChatnames] = useState([]);
    const [initialChats, setInitialChats] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState('');

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

    const rightAction = ( id ) => {
        const handleDeletePress = () => {
            db
                .collection('THREADS')
                .doc(id)
                .delete();

            db 
                .collection('USERS')
                .doc(Authentication.getCurrentUserId())
                .collection('chats')
                .doc(id)
                .delete();

            setSearch('');
        };

        return (
            <Button
                buttonStyle={styles.deleteButton}
                containerStyle={styles.deleteButton}
                icon={
                    <Icon
                        name='trash-2'
                        type='feather'
                        color='#ffffff'
                        size={35}
                    />
                }
                onPress={handleDeletePress}
            />
        )    
    };

    const leftAction = ( oldname, id ) => {
        const handleRenamePress = () => {
            db
                .collection('THREADS')
                .doc(id)
                .update({
                    name: newName
                });

            setNewName('');
            setVisible(!visible);
        };
        
        return (
            <View>
                <Button
                    buttonStyle={styles.renameButton}
                    containerStyle={styles.renameButton}
                    icon={
                        <Icon
                            name='edit'
                            type='feather'
                            color='#ffffff'
                            size={35}
                        />
                    }
                    onPress={ () => setVisible(true)}
                />

                <Overlay
                    isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                    overlayStyle={styles.overlay}
                >
                    <Text style={styles.room}>Rename this chat</Text>
                    <TextInput 
                        placeholder={`Old name: ${oldname}`}
                        maxLength={40}
                        onChangeText={setNewName}
                        value={newName}
                        style={styles.roomName}
                    />
                    <TouchableOpacity
                        disabled={newName.length === 0}
                        onPress={handleRenamePress}
                        style={styles.renameContainer}
                    >
                        <Text style={styles.rename}>RENAME</Text>
                    </TouchableOpacity>
                </Overlay>
            </View>
        )
    };

    const renderChat = ({ item }) => (
        <Swipeable
            renderRightActions={ () => rightAction(item._id) }
            renderLeftActions={ () => leftAction(item.name, item._id) }
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

    useEffect(() => {
        const uid = Authentication.getCurrentUserId();

        const unsubscribe = db
            .collection('THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                db.collection('USERS')
                    .doc(uid)
                    .collection('chats')
                    .onSnapshot((query) => {
                        setChatnames(query.docs.map((queryDoc) => queryDoc.id));
                    })

                const threads = querySnapshot.docs
                    .filter((queryDocumentSnapshot) => chatnames.includes(queryDocumentSnapshot.id))
                    .map((queryDocumentSnapshot) => {
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
    }, [search]);
    
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
    deleteButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0000'
    },
    renameButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#83c9f7'
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
    renameContainer: {
        borderRadius: 30,
        backgroundColor: '#be75e4',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    rename: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    }
})