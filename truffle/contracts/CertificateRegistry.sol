// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        address issuer;
        string recipient;
        bool validated;
    }

    mapping (uint256 => Certificate) public certificates;
    uint256 public certificateCount;

    event CertificateIssued(uint256 indexed certificateId, address indexed issuer, string recipient);
    event CertificateValidated(uint256 indexed certificateId);

    function issueCertificate(string memory recipient) public {
        certificateCount++;
        certificates[certificateCount] = Certificate(msg.sender, recipient, false);
        emit CertificateIssued(certificateCount, msg.sender, recipient);
    }

    function validateCertificate(uint256 certificateId) public {
        require(certificateId <= certificateCount, "Certificate does not exist");
        require(certificates[certificateId].issuer == msg.sender, "You are not the issuer");
        require(!certificates[certificateId].validated, "Certificate already validated");
        
        certificates[certificateId].validated = true;
        emit CertificateValidated(certificateId);
    }
}
