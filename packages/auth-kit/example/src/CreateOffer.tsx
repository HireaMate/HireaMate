import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

// Replace 'YOUR_ETHEREUM_PROVIDER_URL' and 'YOUR_CONTRACT_ADDRESS' with your actual values
const ethereumProviderUrl = 'https://sepolia.infura.io/v3/5b7465b67f684d79be59b0289fbb6ac9';
const contractAddress = '0x005D4715867F008b4161147E8DBD2F51638fD09D';
const contractAbi = [
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

const web3 = new Web3(ethereumProviderUrl);
const contract = new web3.eth.Contract(contractAbi, contractAddress);

interface SolidityForm {
	name: string;
	creator: string;
	creationDate: number;
	expirationDate: string;
	description: string;
	price: number;
	links: string[];
  }

export const createOffer = async (formObject: SolidityForm, signInInfo) => {
  try {

	  // Prepare the data to be sent to the smart contract
	  const formData = {
		  newJob: {
			  name: formObject.name,
			  creator: signInInfo.eoa,
			  creationDate: Math.floor(Date.now() / 1000), // Current timestamp
			  expirationDate: formObject.expirationDate,
			  description: formObject.description,
			  price: formObject.price,
			  links: formObject.links || [],
			}
		};
		
// 		console.log('Private Key:', import.meta.env.PK);
// console.log('Account Address:', process.env.SEP_ACCOUNT);

		const privateKey = "37f07c56a69dc2bbbdea9694cb21762240b8f4cb561c78c5c8755c1902645e2d";
		// if (!privateKey || !privateKey.startsWith('0x') || privateKey.length !== 66) {
		// 	console.error('Error: Invalid private key');
		// 	return false;
		//   }
		const account = web3.eth.accounts.privateKeyToAccount(privateKey);	
		
		if (!account || !account.address) {
			console.error('Error: Unable to derive account from the private key');
			return false;
		  }
		const gas = await (contract.methods.createOffer as any)(formData.newJob).estimateGas(formData.newJob);
		const data = (contract.methods.createOffer as any)(formData.newJob).encodeABI(formData.newJob);
		const tx = {
			from: account.address,
			to: contractAddress,
			gas,
			data: data,
			gasPrice: await web3.eth.getGasPrice(),
		};
		console.log("test");

	// Sign the transaction
	console.log(data);
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');

    // Handle success, e.g., show a success message or redirect the user
	console.log('Offer created successfully!', receipt);
    return true;
  } catch (error) {
    // Handle errors, e.g., show an error message
    console.error('Error creating offer:', error);
    return false;
  }
};