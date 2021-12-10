import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import {
  MDBContainer,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Alert from "../../components/Alert";
import db, { storage } from "../../firebase";

const AddSkill = () => {
  const [tech, setTech] = useState("");
  const [icon, setIcon] = useState(null);
  const [alert, setAlert] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!tech) return;
    if (!icon) return;

    // upload icon to firebase storage then get icon url which is then saved in the firestore database with the form
    const iconRef = ref(storage, icon.name);
    const upload = uploadBytes(iconRef, icon);
    getDownloadURL((await upload).ref).then((downloadUrl) => {
      console.log(downloadUrl);
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
  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>Admin</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
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
};

export default AddSkill;
