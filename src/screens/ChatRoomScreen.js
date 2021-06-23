import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GiftedChat, Avatar, Bubble} from 'react-native-gifted-chat';

import * as Authentication from "../../firebase/auth";
import db from '../../firebase/firestore';

export const ChatRoomScreen = ({ route, navigation }) => {
    const currentUser = Authentication.getCurrentUserObject();
    const { thread } = route.params;

    const [messages, setMessages] = useState([]);

    async function handleSend(msg) {
        const text = msg[0].text;

        db
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email,
                    photo: currentUser.photoURL
                }
            })
            .catch(error => {
                console.error("Error sending message: ", error);
            });

        await db
            .collection('THREADS')
            .doc(thread._id)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime()
                    }
                },
                // updates fields in a document or creates that document if it doesn’t exist, does not overwrite entire document
                { merge: true }
            )
            .catch(error => {
                console.error("Error sending message: ", error);
            });
    }
    
    useEffect(() => {
        const messagesListener = db
            .collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            // check to use name/displayName/email/username
                            email: firebaseData.user.email
                        }
                    }

                    return data;
                });

                setMessages(messages);
            });

            return () => messagesListener();
    }, []);
    
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#be75e4'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#ffffff'
                    }
                }}
            />
        )
    }

    const renderLoading = () => {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator 
                    size='large'
                    color='#be75e4'
                />
            </SafeAreaView>
        )
    }

    const scrollToBottom = () => {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#ffffff'}]}>
                <Icon 
                    name='chevron-down-outline'
                    type='ionicon'
                    size={20}
                    color='#be75e4'
                />
            </SafeAreaView>
        )
    }

    return (
        <GiftedChat 
            alwaysShowSend
            listViewProps={{
                style: {backgroundColor: '#ffd966'}
            }}
            messages={messages}
            onSend={handleSend}
            renderBubble={renderBubble}
            renderLoading={renderLoading}
            scrollToBottom
            scrollToBottomComponent={scrollToBottom}
            user={{ _id: currentUser.uid, name: currentUser.displayName, avatar: currentUser.photoURL }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#ffd966'
    },
})