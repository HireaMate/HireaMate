import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { SafeGetUserInfoResponse, Web3AuthModalPack } from '../../src';
import { EthHashInfo } from '@safe-global/safe-react-components'
import { Wallet, providers } from 'ethers';


type AppBarProps = {

	isLoggedIn: boolean
    // userInfo?: SafeGetUserInfoResponse<Web3AuthModalPack>;
	safeAuthSignInResponse?: SafeGetUserInfoResponse<Web3AuthModalPack>;
  }


interface Offer {
  name: string;
  creator: string;
  creationDate: number;
  expirationDate: string;
  description: string;
  price: number;
  id : number;

}

const ContractInteractionComponent: React.FC<AppBarProps> = ({ isLoggedIn, safeAuthSignInResponse }) => {
  const [contract, setContract] = useState<any>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Connect to the Ethereum provider
    const provider = new ethers.providers.InfuraProvider("sepolia", "5b7465b67f684d79be59b0289fbb6ac9");

    // Replace 'YourContractAddress' and 'YourContractABI' with your actual contract address and ABI
    const contractAddress = '0xF6B09E62ff2160D2672E4Dd7E1c820886413fDB2';
    const contractABI = 
		[
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "signedInAccount",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator_address",
						"type": "address"
					}
				],
				"name": "addSignInAccountMapping",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
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
				"inputs": [
					{
						"internalType": "uint256",
						"name": "_jobId",
						"type": "uint256"
					}
				],
				"name": "deleteJob",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "Id",
						"type": "uint256"
					}
				],
				"name": "mapCreatorToId",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
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
						"name": "",
						"type": "address"
					}
				],
				"name": "creator_to_id",
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
						"internalType": "address",
						"name": "creator_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ID",
						"type": "uint256"
					}
				],
				"name": "getCreatorBySignInAccountAndJobId",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					}
				],
				"name": "getEmployerById",
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
						"name": "Job",
						"type": "uint256"
					}
				],
				"name": "getJob",
				"outputs": [
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
							}
						],
						"internalType": "struct Form",
						"name": "",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
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
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "signInAccountMapping",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		]
 // Create a contract instance
 const contract = new ethers.Contract(contractAddress, contractABI, provider);
 setContract(contract);

 // Fetch offers when the component mounts
 fetchOffers(contract);

 // Set up an interval to fetch offers every 10 seconds (adjust as needed)
 const intervalId = setInterval(() => {
   fetchOffers(contract);
 }, 10000);

 // Clear the interval when the component unmounts
 return () => clearInterval(intervalId);
}, []); // Empty dependency array ensures the effect runs only once on mount

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
          id: i,
        });
      }

      // Sort the offers array based on creationDate in descending order
      offers.sort((a, b) => b.creationDate - a.creationDate);

      setOffers(offers);
      console.log('offers', offers);
    }
  };



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

//   const handleSave = async () => {




// 	// Validate and save form data
// 	handleClose();
//   };

// const handleSave = async (contract, isLoggedIn, safeAuthSignInResponse) => {
// 	try {
// 	  // Validate and save form data
// 	  handleClose();
  
// 	  // Convert jobIdInput to a number
// 	  const jobId = parseInt(jobIdInput);
  
// 	  if (isNaN(jobId)) {
// 		// Handle invalid input
// 		console.error('Invalid Job ID');
// 		return;
// 	  }

// 	  if (!isLoggedIn) {
// 		// Handle invalid input
// 		const signer = safeAuthSignInResponse.signer;
// 		console.error('error user',signer);
// 		return;
// 	  }

// 	  const signer = safeAuthSignInResponse?.signer;

//     if (!signer) {
//       // Handle the case where there's no signer
//       console.error('No signer available');
//       return;
//     }
	  
// 	  // Call the getJob function with jobIdInput
// 	  const job = await contract.getJob(jobId);
// 	  console.error('contrat info',contract);
  
// 	  // Access the creator from the job response
// 	  const creator = job.creator;
  
// 	  // Log the creator to the console
// 	  console.log('Creator:', creator);

// 	  const signedContract = contract.connect(signer);

// 	  await signedContract.mapCreatorToId(creator, jobId);
//       const mappedJobId = await signedContract.getEmployerById(creator);

// 	  console.log('Mapped Job ID for the creator:', mappedJobId);

// 	    // Create SignedInAccount variable based on safeAuthSignInResponse
// 		const SignedInAccount =
// 		safeAuthSignInResponse && (
// 		  <>
// 			<EthHashInfo
// 			  address={safeAuthSignInResponse.eoa}
// 			  showCopyButton
// 			  showPrefix
// 			  prefix={getPrefix('0x5')}
// 			/>
// 		  </>
// 		);

// 		console.log('SignedInAccount is :', SignedInAccount);

// 		await signedContract.addSignInAccountMapping(safeAuthSignInResponse.eoa, jobId, creator);

// 		const mappedDev = await signedContract.getCreatorBySignInAccountAndJobId(creator, jobId);

// 		console.log('Mapped Creator for SignedInAccount and Job ID:', mappedDev);
  
// 	  // You can use the 'creator' variable as needed in your application
// 	} catch (error) {
// 	  // Handle errors, e.g., if the jobIdInput is out of bounds
// 	  console.error('Error fetching job:', error.message);
// 	}
//   };



const handleSave = async (contract) => {
  try {
    // Validate and save form data
    handleClose();

	const privateKey = "040101657935985e61e34badc91210845de791ea652e9bc9d9bc65736ca0bb89";
	const providerUrl = 'https://sepolia.infura.io/v3/5b7465b67f684d79be59b0289fbb6ac9';
    // Convert jobIdInput to a number
    const jobId = parseInt(jobIdInput);

    if (isNaN(jobId)) {
      // Handle invalid input
      console.error('Invalid Job ID');
      return;
    }

	const provider = new providers.JsonRpcProvider(providerUrl);

    // Create a signer using the private key and the provider
    const signer = new Wallet(privateKey, provider);


    // Call the getJob function with jobIdInput
    const job = await contract.getJob(jobId);
    console.error('contract info', contract);

    // Access the creator from the job response
    const creator = job.creator;

    // Log the creator to the console
    console.log('Creator:', creator);

    // Ensure that the contract instance has the signer attached
    const signedContract = contract.connect(signer);

    // Call the functions with the signed contract
    await signedContract.mapCreatorToId(creator, jobId);
    const mappedJobId = await signedContract.getEmployerById(creator);

    console.log('Mapped Job ID for the creator:', mappedJobId);

    // Create SignedInAccount variable based on the signer
    const SignedInAccount =
      signer && (
        <>
          <EthHashInfo
            address={signer.address}
            showCopyButton
            showPrefix
            prefix={getPrefix('0x5')}
          />
        </>
      );

    console.log('SignedInAccount is :', SignedInAccount);

    // Call the functions with the signed contract
    await signedContract.addSignInAccountMapping(signer.address, jobId, creator);
    const mappedDev = await signedContract.getCreatorBySignInAccountAndJobId(creator, jobId);

    console.log('Mapped Creator for SignedInAccount and Job ID:', mappedDev);

    // You can use the 'creator' variable as needed in your application
  } catch (error) {
    // Handle errors, e.g., if the jobIdInput is out of bounds
    console.error('Error fetching job:', error.message);
  }
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
		  <Button onClick={() => handleSave(contract, isLoggedIn, safeAuthSignInResponse)}>Save</Button>
        </DialogActions>
      </Dialog>
	  </div>
        </div>
      ))}
    </div>
  );
};

const getPrefix = (chainId: string) => {
	switch (chainId) {
	  case '0x1':
		return 'eth'
	  case '0x5':
		return 'gor'
	  case '0x100':
		return 'gno'
	  case '0x137':
		return 'matic'
	  default:
		return 'eth'
	}
  }

export default ContractInteractionComponent;