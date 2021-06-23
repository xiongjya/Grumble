import firebase from "./config";

export const database = firebase.database();

//string sessionCode, int usersJoined (ppl in room),
// int usersDone (ppl done swiping), int[] userIDs
export const createRoom = async (sessionCode, userID,
            location) => {
    try {
        await database
            .ref('rooms/' + sessionCode)
            .set({
                usersJoined: 1,
                usersDone: 0,
                userIDs: [userID],
                location: location
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
            firebase
            .database()
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

export const updateRestaurants = async (sessionCode, restaurants) => {
    for (let i = 0, len = restaurants.length; i < len; i++) {
      await firebase
        .database()
        .ref('rooms/' + sessionCode + '/restaurants/' + restaurants[i].id)
        .set({ ...restaurants[i], yes: 0, no: 0 });
    }
}
