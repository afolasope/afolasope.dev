import {
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Link from "next/link";

const AdminHeader = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <Link href="/admin">
          <MDBNavbarBrand>Admin</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <Link href="/admin/addskill">
                <MDBNavbarLink className="admin-nav-link">
                  Add skill
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link href="/admin/addproject">
                <MDBNavbarLink className="admin-nav-link">
                  Add project
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdminHeader;
