import firebase from 'firebase';
import 'firebase/firestore';
import app from './config';

export const db = firebase.firestore(app);

db.settings({ experimentalForceLongPolling: true });

export const createChat = async (pin, displayName) => {
    try {
        await db.collection('THREADS')
                .doc(pin)
                .set({
                    name: 'Room',
                    latestMessage: {
                        text: `A new room is created by ${displayName}.`,
                        createdAt: new Date().getTime()
                    },
                    creator: displayName
                })
        
        await db.collection('THREADS')
                .doc(pin)
                .collection('MESSAGES')
                .add({
                    text: `A new room is created by ${displayName}.`,
                    createdAt: new Date().getTime(),
                    system: true
                });
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

export const sendSystemMessage = async (pin, join, displayName) => {
    // join === true if someone joins the chat
    // join === false if someone deletes the chat and leaves the group
    let msg;

    if (join) {
        msg = `${displayName} has joined the chat.`;
    } else {
        msg = `${displayName} has left the chat.`;
    }

    await db.collection('THREADS')
            .doc(pin)
            .collection('MESSAGES')
            .add({
                text: msg,
                createdAt: new Date().getTime(),
                system: true
            })
            .catch(error => {
                alert(error);
            });

    await db.collection('THREADS')
            .doc(pin)
            .set({
                    latestMessage: {
                        msg,
                        createdAt: new Date().getTime()
                    }},
                { merge: true }
            )
            .catch(error => {
                alert(error);
            });
}

export const sendMessage = async (pin, msg, user) => {
    const text = msg[0].text;

    await db.collection('THREADS')
            .doc(pin)
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

    await db.collection('THREADS')
            .doc(pin)
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

export const renameChat = async (pin, newName) => {
    await db.collection('THREADS')
            .doc(pin)
            .update({
                name: newName
            })
            .catch(error => {
                alert(error);
            });
};

export const deleteChat = async (pin, userId) => {
    await db.collection('THREADS')
            .doc(pin)
            .delete()
            .catch(error => {
                alert(error);
            });

    await db.collection('USERS')
        .doc(userId)
        .collection('chats')
        .doc(pin)
        .delete()
        .catch(error => {
            alert(error);
        });
};

export const addHistory = async (userId, restaurant) => {
    await db.collection('USERS')
        .doc(userId)
        .collection('history')
        .doc(restaurant.name)
        .set({
            name: restaurant.name,
            location: restaurant.location,
            favourited: false,
            addedAt: new Date().getTime()
        })
        .catch(error => {
            alert(error);
        });``
};

export const addFavourites = async (userId, restaurant) => {
    await db.collection('USERS')
        .doc(userId)
        .collection('history')
        .doc(restaurant.name)
        .update({
            favourited: true
        })
        .catch(error => {
            alert(error);
        });
};

export const removeFavourites = async (userId, restaurant) => {
    await db.collection('USERS')
        .doc(userId)
        .collection('history')
        .doc(restaurant.name)
        .update({
            favourited: false
        })
        .catch(error => {
            alert(error);
        });
};