import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import {
  MDBBadge,
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";

const index = () => {
  const [skillsets, setSkillsets] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      // get skillsets from firestore database
      const skillsetsData = await getDocs(collection(db, "skills"));
      const skillsData = skillsetsData.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      // update skillsets state with skillsets data thiss will be mapped into a skillset list in the skillsets div
      if (mounted) {
        setSkillsets(skillsData);
      }

      // get projects from firestore database
      const allprojects = await getDocs(collection(db, "projects"));
      const projectsData = allprojects.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      if (mounted) {
        setProjects(projectsData);
      }
    };

    getData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>Admin</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className="container">
        <div>
          <h2>Skillsets</h2>
          <MDBListGroup style={{ minWidth: "22rem" }}>
            {skillsets.map((skill) => (
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center"
                key={skill.id}
              >
                <div className="d-inline-flex justify-content-center">
                  <img src={skill.data.image} alt={`${skill.data.name} icon`} />
                  {skill.data.name}
                </div>
                <MDBBadge pill>edit</MDBBadge>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
          <MDBBadge pill color="secondary">
            <MDBIcon fas icon="plus" />
          </MDBBadge>
        </div>

        <div>
          <h2>Projects</h2>
          <MDBListGroup style={{ minWidth: "22rem" }}>
            {projects.map((project) => (
              <MDBListGroupItem
                className="d-flex justify-content-between align-items-center"
                key={project.id}
              >
                {project.data.name}
                <MDBBadge pill>edit</MDBBadge>
              </MDBListGroupItem>
            ))}
          </MDBListGroup>
          <MDBBadge pill color="secondary">
            <MDBIcon fas icon="plus" />
          </MDBBadge>
        </div>
      </div>
    </>
  );
};

export default index;
