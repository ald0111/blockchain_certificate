import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Blockchain-Based Certificate Management</h1>
        <p style={styles.subText}>
          Secure, decentralized, and transparent solutions for issuing, storing,
          and validating certificates.
        </p>
        <button
          style={styles.button}
          onClick={() => {
            navigate("/login");
          }}
        >
          Get Started
        </button>
      </header>

      <section style={styles.section}>
        <h2>Why Choose Us?</h2>
        <div style={styles.featuresContainer}>
          <div style={styles.feature}>
            <h3>Blockchain Security</h3>
            <p>
              Immutably store certificate records on a decentralized ledger,
              preventing fraud and tampering.
            </p>
          </div>
          <div style={styles.feature}>
            <h3>Real-time Validation</h3>
            <p>
              Validate certificates in real-time through secure blockchain
              transactions.
            </p>
          </div>
          <div style={styles.feature}>
            <h3>Digital Locker</h3>
            <p>
              Store and manage your certificates in a user-friendly digital
              locker system.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  header: {
    backgroundColor: "#3a6ea5",
    color: "#fff",
    padding: "50px",
    borderRadius: "10px",
  },
  subText: {
    fontSize: "18px",
    marginTop: "20px",
  },
  button: {
    marginTop: "30px",
    padding: "10px 20px",
    backgroundColor: "#ff5722",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  section: {
    marginTop: "50px",
  },
  featuresContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
  },
  feature: {
    width: "30%",
    textAlign: "left",
  },
};
