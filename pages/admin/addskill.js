import { async } from "@firebase/util";
import {
  MDBContainer,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React, { useState } from "react";

const addskill = () => {
  const [name, setName] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    return;
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="customFile">
            Icon
          </label>
          <input type="file" className="form-control" id="customFile" />
          <br />
          <MDBInput type="submit" />
        </form>
      </div>
    </>
  );
};

export default addskill;
