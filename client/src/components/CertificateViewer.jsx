import { useEffect } from "react";
import "./certificate.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useCont } from "../contexts/MyContext";
import { useRef } from "react";

export async function loader({ params: { id } }) {
  // Define the API URL
  const apiUrl = `http://localhost:3000/certificates/${id}`;
  let resp = {};
  // Send the API request
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resp = data;
    })
    .catch((error) => console.error("Error fetching data:", error));

  return resp;
}

function CertificateViewer() {
  let certData = useLoaderData();
  let {
    certificate_id,
    user_name,
    user_eth_address,
    issuer_name,
    issuer_organization,
    event,
    date,
  } = certData;

  const { contract, hashes, addHash, getAllHashes } = useCont();
  const bgRef = useRef();
  const verifyCertificate = async (jsonString) => {
    await getAllHashes();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(jsonString)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash =
      "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log("hash verify", hash);
    if (hashes.includes(hash)) {
      console.log("hashes", hashes, "Certificate is valid.");
      bgRef.current.style.backgroundColor = "green";
    } else {
      console.log("hashes", hashes, "Certificate is invalid.");
      bgRef.current.style.backgroundColor = "red";
    }
  };

  return (
    <>
      <div ref={bgRef} className="container pm-certificate-container">
        <div className="outer-border"></div>
        <div className="inner-border"></div>

        <div className="pm-certificate-border col-xs-12">
          <div className="row pm-certificate-header">
            <div className="pm-certificate-title cursive col-xs-12 text-center">
              <center>
                <h2>Certification</h2>
              </center>
            </div>
          </div>

          <div className="row pm-certificate-body">
            <div className="pm-certificate-block">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                    <center>
                      <span className="pm-name-text bold">{user_name}</span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-earned col-xs-8 text-center">
                    <center>
                      <span className="pm-earned-text padding-0 block cursive">
                        has earned
                      </span>
                      <span className="pm-credits-text block bold sans">
                        a certificate of completion by
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                  <div className="col-xs-12"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-course-title col-xs-8 text-center">
                    <center>
                      <span className="pm-earned-text block cursive">
                        completing the training course entitled
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-course-title underline col-xs-8 text-center">
                    <center>
                      <span className="pm-credits-text block bold sans">
                        {event}
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="pm-certificate-footer">
                  <span className="col-xs-8 pm-certified col-xs-4 text-center">
                    <p className="pm-credits-text block sans">
                      Oranised by:{" "}
                      <span className="tab1">{issuer_organization}</span>
                      Date Complete: <span className="tab1">{date}</span>
                    </p>
                    {/* <span className="pm-credits-text block sans">D</span> */}

                    <span className="bold block">
                      Issuer Name: {issuer_name}
                    </span>
                    <span className="bold block">
                      ETH_Addr: {user_eth_address}
                    </span>

                    <span className="bold block">
                      Certificate ID: {certificate_id}
                    </span>
                    <span className="bold block"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          verifyCertificate(certData);
        }}
        style={{ width: "100px" }}
      >
        Verify
      </button>
    </>
  );
}

export function CertificateRenderer({ id }) {
  const bgRef = useRef();
  const [cert, setCert] = useState({});

  const { contract, hashes, addHash, getAllHashes } = useCont();
  const verifyCertificate = async (jsonString) => {
    await getAllHashes();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(jsonString)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash =
      "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log("hash verify", hash);
    if (hashes.includes(hash)) {
      console.log("hashes", hashes, "Certificate is valid.");
      bgRef.current.style.backgroundColor = "green";
    } else {
      console.log("hashes", hashes, "Certificate is invalid.");
      bgRef.current.style.backgroundColor = "red";
    }
  };

  useEffect(() => {
    // Define the API URL
    const apiUrl = `http://localhost:3000/certificates/${id}`;
    // Send the API request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCert(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // return resp;
  }, [id]);

  const verifyHandler = () => {
    verifyCertificate(JSON.stringify(cert));
  };

  return (
    <>
      <div ref={bgRef} className="container pm-certificate-container">
        <div className="outer-border"></div>
        <div className="inner-border"></div>

        <div className="pm-certificate-border col-xs-12">
          <div className="row pm-certificate-header">
            <div className="pm-certificate-title cursive col-xs-12 text-center">
              <center>
                <h2>Certification</h2>
              </center>
            </div>
          </div>

          <div className="row pm-certificate-body">
            <div className="pm-certificate-block">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                    <center>
                      <span className="pm-name-text bold">
                        {cert["user_name"]}
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-earned col-xs-8 text-center">
                    <center>
                      <span className="pm-earned-text padding-0 block cursive">
                        has earned
                      </span>
                      <span className="pm-credits-text block bold sans">
                        a certificate of completion by
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                  <div className="col-xs-12"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-course-title col-xs-8 text-center">
                    <center>
                      <span className="pm-earned-text block cursive">
                        completing the training course entitled
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>

              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="pm-course-title underline col-xs-8 text-center">
                    <center>
                      <span className="pm-credits-text block bold sans">
                        {cert["event"]}
                      </span>
                    </center>
                  </div>
                  <div className="col-xs-2"></div>
                </div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="pm-certificate-footer">
                  <span className="col-xs-8 pm-certified col-xs-4 text-center">
                    <p className="pm-credits-text block sans">
                      Oranised by:{" "}
                      <span className="tab1">
                        {cert["issuer_organization"]}
                      </span>
                      <br />
                      Date Complete:{" "}
                      <span className="tab1">{cert["date"]}</span>
                    </p>
                    {/* <span className="pm-credits-text block sans">D</span> */}

                    <span className="bold block">
                      Issuer Name: {cert["issuer_name"]}
                    </span>
                    <span className="bold block">
                      ETH_Addr: {cert["user_eth_address"]}
                    </span>

                    <span className="bold block">
                      Certificate ID: {cert["certificate_id"]}
                    </span>
                    <span className="bold block"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={verifyHandler} style={{ width: "100px" }}>
        Verify
      </button>
    </>
  );
}

export default CertificateViewer;
