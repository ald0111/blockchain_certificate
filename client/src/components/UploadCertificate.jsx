import React, { useState } from "react";

export default function UploadCertificate() {
  const [userId, setuserId] = useState("");
  const [date, setdate] = useState("");
  const [event, setevent] = useState("");

  const register = (e) => {
    console.log("register");
    e.preventDefault();
    fetch("http://localhost:3000/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        issuer_id: localStorage.getItem("userId"),
        date: date,
        event: event,
      }),
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Certificate uploaded successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Issue new certificate</h1>
      <form action="">
        <div className="headingsContainer">
          <h3>Enter your details</h3>
          <p>Sign up and create your account</p>
        </div>

        <div className="mainContainer">
          <label htmlFor="User Id">Your User Id</label>
          <input
            type="text"
            placeholder="Enter User Id"
            name="User Id"
            onChange={(e) => {
              setuserId(e.target.value);
            }}
            required
          />

          <br />
          <br />

          <label htmlFor="date">Your Date</label>
          <input
            type="date"
            placeholder="Enter Date"
            name="date"
            onChange={(e) => {
              setdate(e.target.value);
            }}
            required
          />

          <br />
          <br />
          <label htmlFor="event">Your event</label>
          <input
            type="text"
            placeholder="Enter event"
            name="event"
            onChange={(e) => {
              setevent(e.target.value);
            }}
            required
          />

          <br />
          <br />

          <button type="submit" onClick={register}>
            Issue Certificate
          </button>
        </div>
      </form>
    </div>
  );
}
