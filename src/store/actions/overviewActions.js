export const createOverview = overview => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("overviews")
      .add({
        ...overview,
        authorName: profile.displayName,
        authorImage: profile.avatarUrl,
        authorID: authorId,
        eyeCatchImg: `https://res.cloudinary.com/dynugozpy/image/upload/l_text:Sawarabi%20Gothic_50_bold:${
          overview.title
        },co_rgb:333,w_500,c_fit/v1560056946/Dinamic_OGP_t8joyp.png`,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_OVERVIEW", overview });
      })
      .catch(err => {
        dispatch({ type: "CREATE_OVERVIEW_ERROR", err });
      });
  };
};

export const editOverview = overview => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("overviews")
      .doc(overview.key)
      .set({
        ...overview,
        createdAt: new Date(),
        eyeCatchImg: `https://res.cloudinary.com/dynugozpy/image/upload/l_text:Sawarabi%20Gothic_50_bold:${
          overview.title
        },co_rgb:333,w_500,c_fit/v1560056946/Dinamic_OGP_t8joyp.png`
      })
      .then(() => {
        dispatch({ type: "EDIT_OVERVIEW", overview });
      })
      .catch(err => {
        dispatch({ type: "EDIT_OVERVIEW_ERROR", err });
      });
  };
};

export const deleteOverview = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("overviews")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_OVERVIEW", id });
      })
      .catch(err => {
        dispatch({ type: "DELETE_OVERVIEW_ERROR", err });
      });
  };
};
