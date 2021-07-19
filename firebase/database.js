import firebase from "./config";

export const database = firebase.database();

// string sessionCode, intusersTotal (room capacity), int usersJoined (ppl in room),
// int usersDone (ppl done swiping)
export const createRoom = async (sessionCode, userNum) => {
    try {
        await database.ref('rooms/' + sessionCode)
                      .set({
                          usersTotal: userNum,
                          usersJoined: 0,
                          usersDone: 0
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

export const joinRoom = async (sessionCode, userID, onSuccess) => {
    const roomRef = database.ref('rooms/' + sessionCode);
    const userRef = database.ref('users/' + userID);
    try {
        await roomRef
        .once('value', (snap) => {
            if (snap.exists()) { //check if room exists, if it does add to user history
                const roomData = snap.val();
                userRef.once(
                    'value',
                    (snapshot) => {
                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            if (userData.rooms) {
                                //return and dont add to room if user alr in room
                                if (userData.rooms.includes(sessionCode)) return;
                                //else update user history and add to room
                                userRef.update({
                                    rooms: [...userData.rooms, sessionCode],
                                });
                            }
                        } else {
                            userRef.set({
                            rooms: [sessionCode],
                            });
                        }
                        const updatedData = roomData.userIDs
                                        ? {
                                            usersJoined: ++roomData.usersJoined,
                                            userIDs: [...roomData.userIDs, userID],
                                        }
                                        : {
                                            usersJoined: 1,
                                            userIDs: [userID],
                                        };
                        roomRef.update(updatedData);
                    });
                    onSuccess(roomData.usersTotal);
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
            if (snap.exists()) {
                for (let i = 0, len = categories.length; i < len; i++) {
                    const cat = categories[i];
                    alert(cat);
                    if (!snap.hasChild(cat)) {
                        catRef.child(cat).set(true);
                    }
                }
            } else {
                for (let i = 0, len = categories.length; i < len; i++) {
                    const cat = categories[i];
                    database
                        .ref('rooms/' + sessionCode + '/categories/'+ cat)
                        .set(true);
                }
            }
        });
    } catch (err) {
        alert(err);
    }
}

export const getDietaryOptions = async (sessionCode, dietOps) => {
    try {
        await database
        .ref('rooms/' + sessionCode + '/categories')
        .once('value', snap => {
            snap.forEach(childSnap => {
                dietOps.push(childSnap.key);
            });
        });
    } catch (err) {
        alert("Error fetching category preferences.");
    }
}

export const getPriceCeil = async (sessionCode) => {
    let price;
    await database
        .ref('rooms/' + sessionCode + '/price')
        .once('value', snap => {
            price = snap.val();
        });
    return price;
}

export const pushRestaurantsToFb = async (sessionCode, restaurants, onSuccess) => {
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

export const updatePrice = async (sessionCode, price) => {
    const priceRef = database.ref('rooms/' + sessionCode + '/price');
    try {
        await priceRef
            .once('value', snap => {
                 if (snap.exists()) {
                    const currPrice = snap.val();
                    if (currPrice < price) {
                        priceRef.set(price);
                    }
                } else {
                    priceRef.set(price);
                }
            })
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

export const getRestaurants = async (sessionCode, navigation) => {
    try {
        const resies = [];
        const resRef = database.ref('rooms/' + sessionCode + '/restaurants');
        const handleData = (snap) => {
            snap.forEach((res) => {
                resies.push(res.val());
            });
        };
        await resRef.once('value', handleData);
        navigation.navigate('Swipe', {
            restaurants: resies
        });
    } catch {
        (error) => alert(error)
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
