import { useState, useEffect } from "react";
import "./certificate.css";
import { useLoaderData } from "react-router-dom";

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

function Certificate() {
  const {
    certificate_id,
    user_name,
    user_eth_address,
    issuer_name,
    issuer_organization,
    event,
    date,
  } = useLoaderData();
  return (
    <div className="container pm-certificate-container">
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
                  <span className="pm-empty-space block underline"></span>
                  <span className="bold block">Issuer Name: {issuer_name}</span>
                  <span className="bold block">
                    ETH_Addr: {user_eth_address}
                  </span>

                  <span className="pm-empty-space block underline"></span>
                  <span className="bold block">Certificate ID: </span>
                  <span className="bold block">{certificate_id}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
