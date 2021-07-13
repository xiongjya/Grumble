import firebase from 'firebase';
import 'firebase/firestore';
import app from './config';

export const db = firebase.firestore(app);

db.settings({ experimentalForceLongPolling: true });

export const createChat = async (pin, userId, displayName) => {
    try {
        await db.collection('THREADS')
                .doc(pin)
                .set({
                    name: 'Room',
                    latestMessage: {
                        text: `You have joined a new room created by ${displayName}.`,
                        createdAt: new Date().getTime()
                    },
                    creator: displayName
                })
        
        await db.collection('THREADS')
                .doc(pin)
                .collection('MESSAGES')
                    .add({
                        text: `You have joined a new room created by ${displayName}.`,
                        createdAt: new Date().getTime(),
                        system: true
                    });

        /*
        await db.collection('USERS')
                .doc(userId)
                .collection('chats')
                .doc(pin)
                .set({});
        */
    } catch (error) {
        alert(error);
    }
};

export const joinChat = async (pin, userId) => {
    try {
        await db.collection('USERS')
                .doc(userId)
                .collection('chats')
                .doc(pin)
                .set({});
    } catch (error) {
        alert(error);
    }
}

export const sendMessage = async (thread, msg, user) => {
    const text = msg[0].text;

    await db.collection('THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: user.uid,
                    name: user.displayName,
                    avatar: user.photoURL
                }
            })
            .catch(error => {
                alert(error);
            });

    await db
        .collection('THREADS')
        .doc(thread._id)
        .set({
                latestMessage: {
                    text,
                    createdAt: new Date().getTime()
                }},
            // updates fields in a document or creates that document if it doesn’t exist, does not overwrite entire document
            { merge: true }
        )
        .catch(error => {
            alert(error);
        });
};

export const renameChat = async (chatId, newName) => {
    await db.collection('THREADS')
            .doc(chatId)
            .update({
                name: newName
            })
            .catch(error => {
                alert(error);
            });
};

export const deleteChat = async (chatId, userId) => {
    await db.collection('THREADS')
            .doc(chatId)
            .delete()
            .catch(error => {
                alert(error);
            });

    await db.collection('USERS')
        .doc(userId)
        .collection('chats')
        .doc(chatId)
        .delete()
        .catch(error => {
            alert(error);
        });
};