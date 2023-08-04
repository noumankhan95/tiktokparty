import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { storage } from "../firebase";
import { auth } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeprofileUrl } from "../reducers/authslice";
import { useCallback } from "react";

const useImageFbaseHandler = () => {
  const [isimguploading, setisimguploading] = useState(false);
  const [isErroruploading, setisErroruploading] = useState(false);
  const [isimgloading, setisimgloading] = useState(false);
  const [isErrorimgloading, setisErrorimgloading] = useState(false);
  const dispatch = useDispatch();
  const [profile, setprofile] = useState(
    "https://i1.sndcdn.com/avatars-000373844735-9n06kq-t240x240.jpg"
  );
  const currentUser = auth.currentUser?.uid;
  useEffect(() => {
    getimgUrl()
      .then((r) => r)
      .catch((e) => e);
  }, [currentUser]);
  const uploadImgHandler = useCallback(
    async (imgurl, file) => {
      const res = await fetch(file.uri);
      const blob = await res.blob();
      if (!currentUser) return "Authentication Error";
      const uref = ref(storage, `users/${currentUser}/${currentUser}.profile`);
      try {
        setisimguploading((p) => true);
        const snapshot = await uploadBytes(uref, blob, {
          contentType: "image/jpeg",
        });
        const nursef = doc(db, "users", currentUser);

        await setDoc(
          nursef,
          { profileUrl: `${currentUser}/${currentUser}.profile` },
          { merge: true }
        );
        dispatch(
          changeprofileUrl({
            profileUrl: `${currentUser}/${currentUser}.profile`,
          })
        );
        await getimgUrl();
      } catch (e) {
        setisErroruploading((p) => true);
        console.log(e);
      } finally {
        setisimguploading((p) => false);
      }
    },
    [currentUser]
  );

  const getimgUrl = useCallback(async () => {
    try {
      setisimgloading((p) => true);
      console.log(profileref);
      const profileref = doc(db, "users", currentUser);
      const u = await getDoc(profileref);
      const iref = ref(storage, `users/${u.data().profileUrl}`);
      const url = await getDownloadURL(iref);
      setprofile((p) => url);
      return url;
    } catch (e) {
      setisErrorimgloading((p) => true);
      return e;
    } finally {
      setisimgloading((p) => false);
    }
  }, [currentUser]);

  const closeimgloadingpopup = useCallback(() => {
    setisErroruploading((p) => false);
    setisErrorimgloading((p) => false);
  }, []);
  return {
    uploadImgHandler,
    getimgUrl,
    isimguploading,
    isErroruploading,
    isimgloading,
    isErrorimgloading,
    profile,
    closeimgloadingpopup,
  };
};

export default useImageFbaseHandler;
