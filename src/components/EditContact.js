import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import Alert from "./Alert";

const EditContact = () => {
  const { updateContactHandler } = useContactsCrud();
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      setDesc("All the fields are mandatory!");
      setShow(true);
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail)) {
      setDesc("Invalid email id! Please provide valid email");
      setShow(true);
      return;
    }
    updateContactHandler({ id, name: newName, email: newEmail });
    setNewName("");
    setNewEmail("");
    navigate("/");
  };
  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>

      {show ? (
        <Alert setShow={setShow} Description={desc} Header={"Alert!!!"} />
      ) : (
        ""
      )}
    </div>
  );
};

export default EditContact;
