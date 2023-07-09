import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import Alert from "./Alert";

const AddContact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState("");

  const { addContactHandler } = useContactsCrud();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      // alert("All the fields are mandatory!");
      setDesc("All the fields are mandatory!");
      setShow(true);
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      // alert("Invalid email");
      setDesc("Invalid email id! Please provide valid email");
      setShow(true);
      return;
    }
    addContactHandler({ name, email });
    setEmail("");
    setName("");
    navigate("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
      {show ? (
        <Alert setShow={setShow} Description={desc} Header={"Alert!!!"} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AddContact;
