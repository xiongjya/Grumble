import firebase from "./config";

export const database = firebase.database();

//string sessionCode, int usersJoined (ppl in room),
// int usersDone (ppl done swiping), int[] userIDs
export const createRoom = async (sessionCode, userID) => {
    try {
        await database
            .ref('rooms/' + sessionCode)
            .set({
                usersJoined: 1,
                usersDone: 0,
                userIDs: [userID]
            });
    } catch (error) {
        alert(error);
    }
    
    
}

export const joinRoom = async (sessionCode, userID) => {
    try {
        await database
        .ref('rooms/' + sessionCode)
        .once('value', (snap) => {
        if (snap.exists()) {
            database
            .ref('rooms/' + sessionCode)
            .update({
                usersJoined: ++snap.val().usersJoined,
                userIDs: [...snap.val().userIDs, userID],
            })
        } else {
            alert("Room does not exist.")
        }
        })
    } catch (error) {
        alert(error)
    }
}

export const updateRestaurants = async (sessionCode, restaurants, onSuccess) => {
    try {
        for (let i = 0, len = restaurants.length; i < len; i++) {
            await database
                .ref('rooms/' + sessionCode + '/restaurants/' + restaurants[i].id)
                .set({ ...restaurants[i], yes: 0, no: 0 });
        }
        onSuccess();
    } catch (err) {
        alert(err)
    }
}

export const swipeRestaurant = (sessionCode, restaurant, isLast, isAYes, onSuccess) => {
    const resRef = database
                    .ref('rooms/' + sessionCode + '/restaurants/' + restaurant);
    try {
        resRef.once('value', (snap) => {
            if (isAYes) {
                resRef.update({
                    yes: ++snap.val().yes,
                });
            } else {
                resRef.update({
                    no: ++snap.val().no,
                });
            }
        })
        if (isLast) markUserDone(sessionCode, onSuccess)
    } catch (err) {
        alert(err)
    }
}

const markUserDone = async (sessionCode, onSuccess) => {
    const roomRef = database.ref('rooms/' + sessionCode);
    try {
        await roomRef.once('value', snap => {
            if (snap.exists()) {
                roomRef.update({
                    usersDone: ++snap.val().usersDone
                });
            }
        });
        onSuccess();
    } catch (error) {
        alert(error);
    }
}
