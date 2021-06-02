import React, { useState } from 'react';
import { Dimensions, FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Icon, ListItem, SearchBar } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';
import mockChats from '../../assets/data/mockChats.js';

export const ChatScreen = () => {
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState(mockChats);

    const filtering = (text) => {
        setSearch(text);
        if (text) {
            const filtered = mockChats.filter(
                function (item) {
                    const newChats = item.username 
                        ? item.username.toUpperCase()
                        : ''.toUpperCase();
                    const textMsg = text.toUpperCase();
                    return newChats.indexOf(textMsg) > -1;
                }
            )
            setChats(filtered);
        } else {
            setChats(mockChats);
        }
    }

    const rightAction = () => (
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
        >
            
        </Button>
    )

    const renderChat = ({ item }) => (
        <Swipeable
            renderRightActions={rightAction}>
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
                    style={styles.username}
                >
                    {item.username}
                </ListItem.Title>
                
                <ListItem.Subtitle
                    style={styles.message}
                >
                    {item.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        </Swipeable>
    );

    return (
        <SafeAreaView style={styles.container}>
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
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
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
    message: {
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
    username: {
        fontWeight: 'bold',
    }
})