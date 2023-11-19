
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


struct Form {
	string name;
	string creator;
	uint creationDate;
	string expirationDate;
	string description;
	uint price;

}


contract Create_Offer {


    address private owner;
    uint256 internal jobId;

	mapping(uint256=>Form) public jobs;

     //mapping(address => mapping(address => uint256)) public sharesBalance;
    // mapping(address => mapping(uint => address)) public devAddress;

    // Modifier to restrict access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    mapping(address => mapping(uint => address)) public signInAccountMapping;

//     function addSignInAccountMapping(address signedInAccount, uint id, address creator_address) public {
//     // Add the mapping of SignedInAccount to jobId and creator
//     signInAccountMapping[signedInAccount][id] = creator_address;
// }

//     function getCreatorBySignInAccountAndJobId(address signedInAccount, uint ID) public view returns (address) {
//     // Retrieve the creator from the double mapping
//     return signInAccountMapping[signedInAccount][ID];
// }
    function addSignInAccountMapping(address signedInAccount, uint id, address creator_address) public {
    // Add the mapping of SignedInAccount to jobId and creator
    signInAccountMapping[creator_address][id] = signedInAccount;
}

    function getCreatorBySignInAccountAndJobId(address creator_address, uint ID) public view returns (address) {
    // Retrieve the creator from the double mapping
    return signInAccountMapping[creator_address][ID];
}

    mapping(address => uint) public creator_to_id;

    function getEmployerById(address _address) public view returns (uint) {
        return creator_to_id[_address];
    }

    function mapCreatorToId(address creator, uint Id) public {
    // Map the creator to the jobId
    creator_to_id[creator] = Id;
}

	function createOffer(Form memory newJob) public {
		jobs[jobId] = newJob;
        jobId++;
	}

    function getJob(uint256 Job) public view returns (Form memory) {
        return jobs[Job];
    }


    // Constructor to set the initial owner
    constructor(address _owner) {
        owner = _owner;
    }

    // Function to change the owner of the contract
    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
    }

    function getSize() public view returns (uint256) {
    return jobId;
    }


  function deleteJob(uint256 _jobId) public {
        // Do any necessary checks or conditions before deleting
        delete jobs[_jobId];
        jobId--;
    }
    // Add your other functions and logic here
}
