import firebase from "./config";

export const database = firebase.database();

// string sessionCode, int usersJoined (ppl in room),
// int usersDone (ppl done swiping), int[] userIDs
export const createRoom = async (sessionCode, userNum) => {
    try {
        await database.ref('rooms/' + sessionCode)
                      .set({
                          usersTotal: userNum,
                          usersJoined: 0,
                          usersDone: 0,
                          priceCeil: 1
                      })
    } catch (error) {
        alert(error)
    }
}

export const checkRoomExists = async (sessionCode, onSuccess) => {
    const roomRef = database.ref('rooms/' + sessionCode);
    try {
        await roomRef
        .once('value', (snap) => {
            if (snap.exists()) { 
                    onSuccess();
                } else {
                    alert("Room does not exist.")
                }
            }
        );
    } catch (error) {
        alert(error)
    }
}

export const joinRoom = async (sessionCode, userID, onFailure) => {
    const roomRef = database.ref('rooms/' + sessionCode);
    const userRef = database.ref('users/' + userID);
    try {
        await roomRef
        .once('value', (snap) => {
            if (snap.exists()) { //check if room exists, if it does add to user history 
                userRef.once(
                    'value',
                    (snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            if (data.rooms) {
                                //return and dont add to room capacity if user alr in room
                                if (data.rooms.includes(sessionCode)) return;
                                //else update user history and increase room capacity
                                userRef.update({
                                    rooms: [...data.rooms, sessionCode],
                                });
                            }
                        } else {
                            userRef.set({
                            rooms: [sessionCode],
                            });
                        }
                        roomRef
                        .update({
                            usersJoined: ++snap.val().usersJoined,
                            userIDs: [...snap.val().userIDs, userID],
                        })
                    });
                } else {
                    alert("Room does not exist.")
                    onFailure();
                }
            }
        );
    } catch (error) {
        alert(error)
    }
}

export const updateCategories = async (sessionCode, categories) => {
    try {
        const catRef = database
                        .ref('rooms/' + sessionCode + '/categories');
        await catRef.once('value', snap => {
            let obj = {};
            if (snap.exists()) {
                obj = snap.val();
                for (let i = 0, len = categories.length; i < len; i++) {
                    const cat = categories[i];
                    if (!snap.hasChild(cat)) {
                        obj = {...obj, [cat] : true};
                    }
                }
            } else {
                for (let i = 0, len = categories.length; i < len; i++) {
                    const cat = categories[i];
                    obj = {...obj, [cat] : true};
                }
            }
            catRef.set(obj);
        })
    } catch (err) {
        alert(err);
    }
}

export const getDietaryOptions = async (sessionCode) => {
    
}

export const getPriceCeil = async (sessionCode) => {
    const roomRef = database.ref('rooms/' + sessionCode);
    try {
        const priceCeil = await roomRef.child('priceCeil').get();

        return priceCeil;
    } catch (err) {
        alert(err);
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
