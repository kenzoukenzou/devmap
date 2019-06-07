import Firebase from "../../Firebase";

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

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

export const loginwithGoogle = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth()
      .signInWithRedirect(provider)
      .then(response => {
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            name: response.displayName
          })
          .then(() => {
            dispatch({ type: "SIGNUP_WITH_GOOGLE_SUCCESS" });
          })
          .catch(err => {
            dispatch({ type: "SIGNUP_WITH_GOOGLE_ERROR", err });
          });
      });
  };
};

export const unsubscribe = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const ownProjects = firestore
      .collection("projects")
      .where("authorID", "==", id);

    firestore
      .collection("users")
      .doc(id)
      .delete()
      .then(() => {
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            // ownProjects.forEach(project => {
            //   project.delete();
            // });
            dispatch({ type: "DELETE_USER", id });
          });
      })
      .catch(err => {
        dispatch({ type: "DELETE_USER_ERROR", err });
      });
  };
};
