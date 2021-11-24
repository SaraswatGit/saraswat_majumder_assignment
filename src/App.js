import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Modal from "react-modal";
function App() {
  const [users, setusers] = useState([]);
  const [name, setname] = useState("");
  const [displayid, setDisplayId] = useState("");
  const [ModalisOpen, setIsOpen] = useState(false);
  const [showMessages, setshowMessages] = useState(false);
  const [message, setmessage] = useState("");
  const [messageArr, setmessageArr] = useState([]);
  const [messageDisp, setmessageDisp] = useState([]);
  const [id, setuid] = useState(0);
  const [nameDisplay, setnameDisplay] = useState("");

  const [sent, setsend] = useState(true);
  function toggleModal() {
    setIsOpen(!ModalisOpen);
  }

  return (
    <div
      style={{
        height: "100vh",
        widht: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Modal
        isOpen={ModalisOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {},
          content: {
            height: "20vh",
            width: "25vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            backgroundColor: "aquamarine",
          },
        }}
      >
        <label for="username" style={{ width: "20vw", textAlign: "left" }}>
          Name of new user:
        </label>
        <br />
        <input
          type="text"
          style={{ width: "20vw", textAlign: "left" }}
          onChange={(event) => {
            setname(event.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            setuid(id + 1);
            setusers((prev) => [...prev, { name: name, id: id }]);

            toggleModal();
          }}
        >
          New Conversation
        </button>
      </Modal>
      <div
        style={{
          width: "100vw",
          height: "15vh",
          backgroundColor: "rgb(51, 255, 210)",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "85vh",
          width: "100vw",
        }}
      >
        <div className="sidebar">
          {users.map((val, key) => {
            return (
              <div
                className="contactlist"
                onClick={() => {
                  setDisplayId(val.id);

                  const newDisplay = messageArr.filter((val2) => {
                    return val2.id === val.id;
                  });
                  setmessageDisp(newDisplay);
                  setnameDisplay(val.name);
                  setshowMessages(true);
                }}
              >
                {val.name}
              </div>
            );
          })}
          <div className="addbutton" onClick={toggleModal}>
            New Conversation
          </div>
        </div>
        <>
          {showMessages ? (
            <div className="messagebox">
              <div className="heading">You're chatting with {nameDisplay}</div>
              <div className="chathistory">
                {messageDisp.map((val, key) => {
                  return <div className="chatbox">{val.message}</div>;
                })}
              </div>
              <div className="bottombar">
                <input
                  type="text"
                  className="messageinput"
                  onChange={(event) => {
                    setmessage(event.target.value);
                    setsend(true);
                  }}
                  onClick={() => {
                    setsend(true);
                  }}
                  value={sent ? message : ""}
                />
                <button
                  style={{ marginLeft: "1vw" }}
                  onClick={() => {
                    const newMessages = [
                      ...messageArr,
                      { id: displayid, message: message },
                    ];
                    setsend(false);
                    console.log(messageArr);
                    setmessageArr(newMessages);
                    setmessage("");
                    setmessageDisp(
                      newMessages.filter((val) => {
                        return val.id === displayid;
                      })
                    );
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="welcomepage">Click on User to see chat history</div>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
