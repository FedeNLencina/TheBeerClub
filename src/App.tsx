/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import "./App.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { Navbar } from "./components/navBar/Navbar";
import { TableListContainer } from "./components/containers/tableListContainer/TableListContainer";
function App() {
  const [count, setCount] = useState(0);
  const [load, setload] = useState(false);

  const readData = (userId: string) => {
    // console.log("ADAS");

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setCount(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    readData("1");
  }, [load]);

  function writeUserData(userId: string, name: any, email: any, imageUrl: any) {
    setload(true);
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
    setload(false);
  }

  const test = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      {load && <h1>cargando</h1>}

      <h1>{count.username}</h1>

      <button onClick={() => writeUserData("1", "asaaaad", "sddsds", "asassa")}>
        createUser
      </button>
      <TableListContainer />
    </>
  );
}

export default App;
