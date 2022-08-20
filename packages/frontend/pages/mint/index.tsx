import Header from '@/components/Header';
import { Box } from '@/components/SellOutCheckOut/Box';
import { NETWORK_ID } from '@/config';
import { useSelloutModal } from '@/context/SellOutProvider';
import contracts from '@/contracts/hardhat_contracts.json';
import { touchableStyles } from '@/styles/css/touchableStyles';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount, useContract, useContractRead, useSigner } from 'wagmi';
import { SellOutNFT } from '../../../backend/typechain-types/contracts/NFT.sol/SellOutNFT';

export default function MintPage() {
	const chainId = Number(NETWORK_ID);
	const [totalMinted, setTotalMinted] = useState(0);
	const { isConnected } = useAccount();
	const { data: signerData } = useSigner();

	const allContracts = contracts as any;

	const NFTAddress = allContracts[chainId][0].contracts.SellOutNFT.address;
	const NFTABI = allContracts[chainId][0].contracts.SellOutNFT.abi;

	const nftContract = useContract<SellOutNFT>({
		addressOrName: NFTAddress,
		contractInterface: NFTABI,
		signerOrProvider: signerData,
	});

	const contractConfig = {
		addressOrName: '0x1888eca0bD881a686aabA79AD61d8a952E157e74',
		contractInterface: NFTABI,
	};

	const { data: totalSupplyData } = useContractRead({
		...contractConfig,
		functionName: 'totalSupply',
		watch: true,
	});

	useEffect(() => {
		console.log('totalSupplyData', totalSupplyData);
	}, [totalSupplyData]);

	const handleMint = async () => {
		const data = await nftContract.mint();
	};

	useEffect(() => {
		if (totalSupplyData) {
			setTotalMinted(totalSupplyData.toNumber());
		}
	}, [totalSupplyData]);

	return (
		<div className={''}>
			<Head>
				<title>Create-Web3 App</title>
				<meta name="description" content="Generated by npx create-web3" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />

			<main
				style={{
					minHeight: '60vh',
					flex: '1',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<NFTCard handleMint={handleMint} />
				<p style={{ margin: '12px 0 24px' }}>{totalMinted} minted so far!</p>
			</main>
		</div>
	);
}

function NFTCard({ handleMint }: { handleMint: () => void }) {
	const { sellOutModalOpen, openSellOutModal, closeModal } = useSelloutModal();

	return (
		<div className="max-w-sm rounded overflow-hidden  shadow-lg ">
			<img className="w-full" src={'/nft.png'} />
			<div className="px-6 py-2">
				{/* <div className="font-bold text-xl mb-2">EthMexico Hacker Badge</div> */}
				{/* <p className="text-gray-700 text-base">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis
					eaque, exercitationem praesentium nihil.
				</p> */}
			</div>
			<div className="px-6 py-2  pb-2 flex justify-end ">
				<Box
					as="button"
					background="accentColor"
					borderRadius="connectButton"
					boxShadow="connectButton"
					className={touchableStyles({ active: 'shrink', hover: 'grow' })}
					color="accentColorForeground"
					fontFamily="body"
					fontWeight="bold"
					height="40"
					key="connect"
					onClick={(e) => {
						e.stopPropagation();
						console.log('clicked');
						handleMint();
						// setCheckOutData(data);
						// openSellOutModal();
					}}
					paddingX="14"
					transition="default"
					type="button"
				>
					Mint
				</Box>
			</div>
		</div>
	);
}
