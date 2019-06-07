export const createStep = step => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorID = getState().firebase.auth.uid;
    firestore
      .collection("steps")
      .add({
        ...step,
        authorID: authorID,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_STEP", step });
      })
      .catch(err => {
        dispatch({ type: "CREATE_STEP_ERROR", err });
      });
  };
};

export const editStep = step => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("steps")
      .doc(step.key)
      .set({
        ...step
        // createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "EDIT_STEP", step });
      })
      .catch(err => {
        dispatch({ type: "EDIT_STEP_ERROR", err });
      });
  };
};

export const deleteStep = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("steps")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_STEP", id });
      })
      .catch(err => {
        dispatch({ type: "DELETE_STEP_ERROR", err });
      });
  };
};
