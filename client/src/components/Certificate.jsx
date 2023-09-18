import { useEffect } from "react";
import { useState } from "react";
import { CertificateRenderer } from "./CertificateViewer";

export default function Certificate() {
  const [certId, setCertId] = useState();
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

  return <div>{certId}</div>;
}
