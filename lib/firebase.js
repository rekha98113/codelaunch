import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDST2wTNoWvlUP02gvAfXq1EdHM77d2uJw",
  authDomain: "codelaunch-909b9.firebaseapp.com",
  projectId: "codelaunch-909b9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);