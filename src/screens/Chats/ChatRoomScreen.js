import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { Loading } from '../../components/Loading';

import * as Authentication from '../../../firebase/auth';
import * as Firestore from '../../../firebase/firestore';

export const ChatRoomScreen = ({ route, navigation }) => {
    const [currentUser, setCurrentUser] = useState({});
    const { thread } = route.params;

    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        const user = Authentication.getCurrentUserObject();

        setCurrentUser(user);

        const messagesListener = Firestore.db
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

    const renderLoading = () => (
        <Loading />
    );

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
            onSend={(msg) => Firestore.sendMessage(thread._id, msg, currentUser)}
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