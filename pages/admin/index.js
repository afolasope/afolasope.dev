import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

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

  const Skill = ({ skill }) => {
    return (
      <div className="skill">
        <img src={skill.data.image} alt={`${skill.data.name} icon`} />
        <h4>{skill.data.name}</h4>
      </div>
    );
  };

  const Project = ({ project }) => {
    return (
      <div className="project">
        <img src={project.data.image} alt={`${project.data.name} icon`} />
        <h4>{project.data.name}</h4>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <h1>Admin</h1>
      </div>
      <div className="container">
        <h2>Skillsets</h2>
        <div className="skillsets">
          {skillsets.map((skill) => (
            <Skill skill={skill} key={skill.id} />
          ))}
        </div>
        <p>manage</p>
      </div>
      <div className="container">
        <h2>Projects</h2>
        <div className="projects">
          {projects.map((project) => (
            <Project project={project} key={project.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default index;
