import { useEffect } from "react";
import { useState } from "react";
import { CertificateRenderer } from "./CertificateViewer";
import Logout from "./Logout";

export default function Certificate() {
  const [certId, setCertId] = useState([]);
  // console.log("Certificate", certId);
  useEffect(() => {
    const url =
      "http://localhost:3000/certificates?user_id=" +
      localStorage.getItem("userId");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        let certs = data.map(({ id }) => {
          console.log(id);
          return <CertificateRenderer key={id} id={id} />;
        });
        setCertId(certs);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <Logout />
      {certId.length > 0 ? (
        certId
      ) : (
        <h1>Yout don't have any certificates issued to you yet.</h1>
      )}
    </div>
  );
}
