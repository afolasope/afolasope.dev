import { getAuth } from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import Alert from "../../components/Alert";
import Login from "../../components/Login";
import Spinner from "../../components/Spinner";
import db, { storage } from "../../firebase";

const AddSkill = () => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [tech, setTech] = useState("");
  const [icon, setIcon] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let mounted = true;
    const auth = getAuth();
    auth.onAuthStateChanged((response) => {
      if (mounted) {
        setUser(response);
        setLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!tech) return;
    if (!icon) return;

    // upload icon to firebase storage then get icon url which is then saved in the firestore database with the form
    const iconRef = ref(storage, `${Date.now()} ${icon.name}`);
    const upload = uploadBytes(iconRef, icon);
    getDownloadURL((await upload).ref).then((downloadUrl) => {
      // save form to firestore
      try {
        addDoc(collection(db, "skills"), {
          tech,
          icon: downloadUrl,
        });
        setAlert({
          message: "Skill added",
          type: "success",
        });
      } catch (error) {
        setAlert({
          message: error,
          type: "danger",
        });
      }
    });
    setTech("");
  };

  if (user && loaded)
    return (
      <>
        <AdminHeader />
        <div className="container">
          <form onSubmit={submitForm}>
            <MDBInput
              label="Technology"
              id="tech"
              type="text"
              value={tech}
              onChange={(e) => {
                setTech(e.target.value);
              }}
            />
            <label className="form-label" htmlFor="customFile">
              Icon
            </label>
            <input
              type="file"
              className="form-control"
              id="customFile"
              onChange={(e) => {
                setIcon(e.target.files[0]);
              }}
            />
            <br />
            <MDBInput type="submit" />
          </form>
          <br />
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              close={() => {
                setAlert(null);
              }}
            />
          )}
        </div>
      </>
    );

  if (loaded) return <Login />;

  return <Spinner />;
};

export default AddSkill;
