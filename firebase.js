import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
    apiKey: "AIzaSyBATAtyIl4Whdm62VgdxUWBc2xZhpd5NXQ",
    authDomain: "rn-todolist-prac.firebaseapp.com",
    projectId: "rn-todolist-prac",
    storageBucket: "rn-todolist-prac.appspot.com",
    messagingSenderId: "471125877919",
    appId: "1:471125877919:web:5cb61b1791b1e08543aeaa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);