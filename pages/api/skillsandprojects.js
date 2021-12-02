import { collection, getDocs } from "@firebase/firestore";
import db from "../../firebase";

export default async function handler(req, res) {
  // get skills from database
  const skillsref = await getDocs(collection(db, "skills"));
  const skills = skillsref.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  // get projects from firebase
  const projectsRef = await getDocs(collection(db, "projects"));
  const projects = projectsRef.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  res.status(200).json({
    skills,
    projects,
  });
}
