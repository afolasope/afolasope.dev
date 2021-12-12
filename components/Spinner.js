import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <MDBSpinner className="ms-2" color="dark">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Spinner;
