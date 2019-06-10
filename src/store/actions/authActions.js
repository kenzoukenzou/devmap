export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signup = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            name: newUser.name
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const unsubscribe = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore
      .collection("users")
      .doc(id)
      .delete()
      .then(() => {
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            // firestore
            //   .collection("overviews")
            //   .where("authorID", "==", id)
            //   .delete()
            //   .then(() => {
            dispatch({ type: "DELETE_USER", id });
            // });
          });
      })
      .catch(err => {
        dispatch({ type: "DELETE_USER_ERROR", err });
      });
  };
};

// Login with authentification
export const loginAuth = res => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // const authorId = getState().firebase.auth.uid;
    firestore
      .collection("users")
      .doc(res.user.uid)
      .set({
        // id: res.user.uid,
        displayName: res.user.displayName,
        avatarUrl: res.user.photoURL
      })
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};
