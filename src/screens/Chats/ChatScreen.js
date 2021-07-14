import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, SafeAreaView, 
    StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, FAB, Icon, ListItem, Overlay, SearchBar } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import { ChatRoomScreen } from './ChatRoomScreen';
import { Loading } from '../../components/Loading';

import * as Authentication from '../../../firebase/auth';
import * as Firestore from '../../../firebase/firestore';

const ChatScreen = ( {navigation} ) => {
    const [chatnames, setChatnames] = useState([]);
    const [initialChats, setInitialChats] = useState([]);
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [pressed, setPressed] = useState(false);

    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState('');

    const refresh = () => (
        <Icon
            name='refresh-cw'
            type='feather'
            color='#ffffff'
        />
    )

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
           Firestore.deleteChat(id, Authentication.getCurrentUserId());
           
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
           Firestore.renameChat(id, newName);
           
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
                    onPress={ () => setVisible(true) }
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
        <TouchableOpacity
            onPress={() => navigation.navigate('ChatRoom', { thread: item })}
        >
            <ListItem
                bottomDivider='true'
                containerStyle={styles.chat}
            >
                <ListItem.Swipeable
                    leftContent={ () => leftAction(item.name, item._id) }
                    rightContent={ () => rightAction(item._id) }
                >
                    <Avatar 
                        source={require('../../../assets/images/user.png')}
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
                </ListItem.Swipeable>
            </ListItem>
        </TouchableOpacity>
    );

    useEffect(() => {
        const uid = Authentication.getCurrentUserId();

        const unsubscribe = Firestore.db
            .collection('THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                Firestore.db.collection('USERS')
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

                if (isLoading) {
                    setIsLoading(false);
                }
            });

        return () => unsubscribe();
    }, [pressed]);
    
    return isLoading
            ? (<Loading />)
            : (<SafeAreaView style={styles.container}>
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

                <FAB 
                    color='#be75e4'
                    placement='right'
                    size='large'
                    icon={refresh}
                    onPress={() => setPressed(!pressed)}
                />
            </SafeAreaView>)
};

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