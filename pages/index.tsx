import type { NextPage } from "next";
import { auth } from "../db/firebase-config";
import { useState, ChangeEvent, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
} from "firebase/auth";
import { addDoc, setDoc, collection, doc } from "@firebase/firestore";
import { db } from "../db/firebase-config";

const Home: NextPage = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const [todoItem, setToDoItem] = useState({
    title:"",
    description:"",
    deadline:"",
    location:""
  })
  const [user, setUser] = useState<User>();
  const register = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    );
    const uid = user.user.uid;
    var count = 0;
    const maxTries = 3;
    var success = false;
    while (count <= maxTries && !success) {
      try {
        const set = await setDoc(doc(db, "users", uid), {
          fname: registerData.fname,
          lname: registerData.lname,
          email: registerData.email,
        }).then((res) => {
          success = true;
          console.log("successful user creation");
        });
        break;
      } catch (e) {
        if (count > maxTries) {
          count++;
          throw e;
        }
      }
    }
  };
  const login = async () => {
    const user = await signInWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    );
  };
  const TestDocCreate = async () => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      // const userRef = collection(db, "users");
      // // create the user doc tomorrow
      // setDoc(doc(userRef, uid), { fname: registerData.fname });
      const set = await setDoc(doc(db, "users", uid), {
        fname: registerData.fname,
      });
    }
  };
  const createToDoItem = async() => {
    const uid = auth.currentUser?.uid;
    const todoRef = collection(db,"todos");
    if (uid) {
      const set = await addDoc(todoRef,{
        uid:uid,
        title:todoItem.title,
        description:todoItem.description,
        deadline:todoItem.deadline,
        location:todoItem.location,
        complete:false
      }).then(res => setToDoItem({
        title:"",
        description:"",
        deadline:"",
        location:""
      }))
    }
  }
  const logout = async () => {
    await signOut(auth);
  };
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };
  const onFNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      fname: e.target.value,
    }));
  };
  const onLNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      lname: e.target.value,
    }));
  };
  const onToDoTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToDoItem((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const onToDoDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToDoItem((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const onToDoDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToDoItem((prev) => ({
      ...prev,
      deadline: e.target.value,
    }));
  };
  const onToDoLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToDoItem((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });
  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "1px solid black" }}>
        {user?.email}
        {user?.uid}
        <p>Email</p>
        <input value={registerData.email} onChange={onEmailChange}></input>
        <p>Password</p>
        <input
          value={registerData.password}
          onChange={onPasswordChange}
        ></input>
        <p>fname</p>
        <input value={registerData.fname} onChange={onFNameChange}></input>
        <p>lname</p>
        <input value={registerData.lname} onChange={onLNameChange}></input>
        <br/>
        <button onClick={register}>register</button>
        <br/>
        <button onClick={login}>LOGIN</button>
        <br/>
        <button onClick={TestDocCreate}>TESTCreate</button>
        <br/>
        <button onClick={logout}>Logout</button>
      </div>
      <div style={{ border: "1px solid black" }}>
        <p>Title</p>
        <input value={todoItem.title} onChange={onToDoTitleChange}></input>
        <p>Description</p>
        <input value={todoItem.description} onChange={onToDoDescriptionChange}></input>
        <p>Deadline?</p>
        <input type="datetime-local" value={todoItem.deadline} onChange={onToDoDeadlineChange}></input>
        <p>Location</p>
        <input value={todoItem.location} onChange={onToDoLocationChange}></input>
        <br/>
        <button onClick={createToDoItem}>Create</button>
      </div>
    </div>
  );
};

export default Home;
