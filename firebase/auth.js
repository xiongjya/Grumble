import firebase from "./config";

const auth = firebase.auth();

export const login = async ({ email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return onSuccess(user);
  } catch (error) {
    return onError(error);
  }
}

export const createAccount = async ({ name, email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      await user.updateProfile({ displayName: name, photoURL: 'https://img.flaticon.com/icons/png/512/149/149071.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF' });
      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
}

export const logout = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const forgotPassword = async ( {email} , onSuccess, onError) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const changePhoto = async ({ photo }, onSuccess, onError) => {
  try {
    await auth.currentUser.updateProfile({
      displayName: auth.currentUser.displayName,
      photoURL: photo
    })
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const getCurrentUserObject = () => auth.currentUser ? auth.currentUser.toJSON() : null;

export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) => auth.onAuthStateChanged((user) => {
  if (user) {
    return onUserAuthenticated(user);
  } else {
    return onUserNotFound(user);
  }
});