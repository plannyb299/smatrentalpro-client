import { useEffect, useState, useContext } from "react";
import {  upload } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const currentUser = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.avatar);
    }
  }, [currentUser])

  return (
    <div className="fields">
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      <img src={photoURL} alt="Avatar" className="avatar" />
    </div>
  );
}