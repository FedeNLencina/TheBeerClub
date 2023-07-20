import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import { getDatabase, ref, set, child, get } from "firebase/database";
import { Navbar } from './components/navBar/Navbar';
function App() {
  const [count, setCount] = useState(0)

  const readData = (userId: string) => {
    console.log("ADAS")

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    useEffect(() => {

      readData("1")

    }, [])

  }


  function writeUserData(userId: string, name: any, email: any, imageUrl: any) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  const test = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div>
        <Navbar />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => writeUserData("1", "Fede", "sddsds", "asassa")}>
          createUser
        </button>
        <button onClick={() => writeUserData("1", "Fede", "sddsds", "asassa")}>
          readUser
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
