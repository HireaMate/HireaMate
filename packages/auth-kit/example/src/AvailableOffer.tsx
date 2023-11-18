import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface Offer {
  name: string;
  creator: string;
  creationDate: number;
  expirationDate: string;
  description: string;
  price: number;
  links: string[];
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
          links: job.links,
        });
      }

      setOffers(offers);
	  console.log('offers', offers);
    }
  };

  return (
    <div>
      <h1>Available Offers</h1>
      {offers.map((offer, index) => (
        <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>{offer.name}</h2>
          <p>Creator: {offer.creator}</p>
          <p>Creation Date: {new Date(offer.creationDate * 1000).toLocaleDateString()}</p>
          <p>Expiration Date: {offer.expirationDate}</p>
          <p>Description: {offer.description}</p>
          <p>Price: {offer.price}</p>
          
        </div>
      ))}
    </div>
  );
};

export default ContractInteractionComponent;