/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React from "react";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDatabase, ref, set, child, get, push } from "firebase/database";
import { Table } from "../../utils/interfaces/tables/tables";

export const Hero = () => {
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

  function addTables(amount: number, lastTableId: number){
     setload(true);
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, 'tablesMock');
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    let nextId = lastTableId + 1;
    for (let i=0; i<amount; i++){
      const newTable:Table = {id: nextId, open:true, order:[]}
      set(newTableRef, {
      ocupped: newTable.open,
      order:newTable.order,
    }
    );
    nextId++;
    console.log("id: ", nextId)
    console.log("table onChildAdded :",newTable)
    }
    
    setload(false);
  }

  function addTable(table: Table){
    setload(true);
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, 'tablesMock');
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    set(newTableRef, {
      ocupped: table.open,
      order:table.order,
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
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center">
        {load && <h1>cargando</h1>}

        <h1>{count.username}</h1>

        <button
          onClick={() => addTables(2, 1)}
        >
          createUser
        </button>
      </div>
    </div>
  );
};
