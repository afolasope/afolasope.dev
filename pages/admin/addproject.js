import {
  MDBContainer,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React from "react";

const addproject = () => {
  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>Admin</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className="container">
        <form>
          <MDBInput label="Project name" id="projectName" type="text" />
          <br />
          <MDBInput label="Description" id="projectDescription" type="text" />
          <br />
          <MDBInput label="Github link" id="githubLink" type="url" />
          <br />
          <MDBInput label="Demo link" id="demoLink" type="url" />
          <br />
          <MDBInput label="Text input" id="typeText" type="text" />
          <br />
        </form>
      </div>
    </>
  );
};

export default addproject;
