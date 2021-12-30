import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { getAuth } from "firebase/auth";
import Login from "../../components/Login";
import {
  MDBBadge,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import AdminHeader from "../../components/AdminHeader";
import Spinner from "../../components/Spinner";
import Link from "next/link";
import Alert from "../../components/Alert";

const Index = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [skillsets, setSkillsets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged((response) => {
      if (mounted) {
        setUser(response);
        setLoaded(true);
      }
    });

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

  const deleteSkill = async (id) => {
    try {
      const docRef = doc(db, "skills", id);
      // Delete skill from firestore database
      await deleteDoc(docRef);

      // remove deleted skill from skillsets state
      const newSkills = skillsets.filter((skill) => {
        return skill.id !== id;
      });
      setSkillsets(newSkills);

      setAlert({ message: "Deleted", type: "success" });
    } catch (error) {
      setAlert({ message: error, type: "danger" });
    }
  };

  if (loaded && user)
    return (
      <>
        <AdminHeader />
        <div className="container">
          <div>
            <h2>Skillsets</h2>
            <MDBListGroup style={{ minWidth: "22rem" }}>
              {skillsets.map((skill) => (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center"
                  key={skill.id}
                >
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={skill.data.icon}
                      alt={`${skill.data.tech} icon`}
                      width="30px"
                      height="30px"
                    />
                    <div>{skill.data.tech}</div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <MDBBadge className="link" pill>
                      edit
                    </MDBBadge>
                    <MDBBadge
                      className="link"
                      pill
                      color="danger"
                      onClick={() => deleteSkill(skill.id)}
                    >
                      delete
                    </MDBBadge>
                  </div>
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
                  <Link
                    href={"/admin/projects/[id]"}
                    as={`/admin/projects/${project.id}`}
                  >
                    <MDBBadge className="link" pill>
                      edit
                    </MDBBadge>
                  </Link>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
            <MDBBadge pill color="secondary">
              <MDBIcon fas icon="plus" />
            </MDBBadge>
          </div>
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
export default Index;
