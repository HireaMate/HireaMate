import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';



interface Offer {
  name: string;
  creator: string;
  creationDate: number;
  expirationDate: string;
  description: string;
  price: number;
  id : number;
  submissionTime: number; // New field for submission time
}

const ContractInteractionComponent: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Connect to the Ethereum provider
    const provider = new ethers.providers.InfuraProvider("sepolia", "5b7465b67f684d79be59b0289fbb6ac9");

    // Replace 'YourContractAddress' and 'YourContractABI' with your actual contract address and ABI
    const contractAddress = '0x005D4715867F008b4161147E8DBD2F51638fD09D';
    const contractABI = [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "changeOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "creator",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "creationDate",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "expirationDate",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "description",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "price",
							"type": "uint256"
						},
						{
							"internalType": "string[]",
							"name": "links",
							"type": "string[]"
						}
					],
					"internalType": "struct Form",
					"name": "newJob",
					"type": "tuple"
				}
			],
			"name": "createOffer",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getSize",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "jobs",
			"outputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "creator",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "creationDate",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "expirationDate",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "description",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    //setContract(myContract);
    // Fetch offers when the component mounts
    fetchOffers(contract);
  }, []);

  const fetchOffers = async (contract) => {
    if (contract) {
      // Call the 'jobs' mapping in the smart contract
      const jobsLength = await contract.getSize();
      const offers: Offer[] = [];
	console.log(jobsLength);
      for (let i = 0; i < jobsLength; i++) {
        const job = await contract.jobs(i);
        offers.push({
          name: job.name,
          creator: job.creator,
          creationDate: job.creationDate.toNumber(),
          expirationDate: job.expirationDate,
          description: job.description,
          price: job.price.toNumber(),
          id:i,
        });
      }

      setOffers(offers);
	  console.log('offers', offers);
    }
  };

// const fetchOffers = async (contract) => {
//     if (contract) {
//       // Call the 'jobs' mapping in the smart contract
//       const jobsLength = await contract.getSize();
//       const offers: Offer[] = [];
//       console.log(jobsLength);
//       for (let i = 0; i < jobsLength; i++) {
//         const job = await contract.jobs(i);
//         offers.push({
//           name: job.name,
//           creator: job.creator,
//           creationDate: job.creationDate.toNumber(),
//           expirationDate: job.expirationDate,
//           description: job.description,
//           price: job.price.toNumber(),
//           id: i,
//           submissionTime: Math.floor(Date.now() / 1000), // Automatically set to current timestamp
//         });
//       }

//       // Sort the offers array based on the absolute difference between current time and submissionTime
//       offers.sort((a, b) => Math.abs(Date.now() / 1000 - a.submissionTime) - Math.abs(Date.now() / 1000 - b.submissionTime));

//       setOffers(offers);
//       console.log('offers', offers);
//     }
//   };

	const [jobIdInput, setJobIdInput] = useState('');

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    // Add other fields here if needed
  });

  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    // Clear errors when the modal is closed
    setErrors({
      name: '',
      // Clear other fields here if needed
    });
  };

  const handleSave = async () => {
	// Validate and save form data
	handleClose();
  };


  
  return (
    <div>
      <h1>Available Offers</h1>
      {offers.map((offer, index) => (
        <div key={index} style={{ border: '1px solid green', margin: '10px', padding: '10px' }}>
          <h2>{offer.name}</h2>
          <p>Creator: {offer.creator}</p>
          <p>Creation Date: {new Date(offer.creationDate * 1000).toLocaleDateString()}</p>
          <p>Expiration Date: {offer.expirationDate}</p>
          <p>Description: {offer.description}</p>
          <p>Price: {offer.price}</p>
		  <p>Id: {offer.id}</p>

		  <div>
		  <Button style={{ color : 'green',fontSize:'18px',border: '0.7px solid green' }} onClick={handleOpen} >Apply!</Button>
		  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Job Application</DialogTitle>
        <DialogContent>
		
		<p>Are you sure you want to apply to this job?</p>
                  <TextField
                    label="Input Job ID for confirmaton"
                    value={jobIdInput}
                    onChange={(e) => setJobIdInput(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
	  </div>
        </div>
      ))}
    </div>
  );
};

export default ContractInteractionComponent;