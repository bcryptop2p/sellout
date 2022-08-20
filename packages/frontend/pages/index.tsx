import Head from 'next/head';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GetGreeter, SetGreeter } from '../components/contract';
import SellOutCheckOut from '@/components/SellOutCheckOut/SellOutCheckOut';
import { useSelloutModal } from '@/context/SellOutProvider';
import CheckoutModal from '@/components/SellOutCheckOut/CheckoutModal';
import { useState } from 'react';
import { Box } from '@/components/SellOutCheckOut/Box';
import { touchableStyles } from '@/styles/css/touchableStyles';
import { generateMockData, MockData } from '@/utils/generateMockData';

export default function Home() {
	const { sellOutModalOpen, openSellOutModal, closeModal } = useSelloutModal();
	const [checkOutData, setCheckOutData] = useState<any>(null);

	return (
		<div className={''}>
			<Head>
				<title>Create-Web3 App</title>
				<meta name="description" content="Generated by npx create-web3" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header style={{ padding: '1rem' }}>
				<ConnectButton />
			</header>

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
				{/* <button onClick={openSellOutModal}>Open Sellout modal</button> */}
				{sellOutModalOpen && checkOutData && (
					<CheckoutModal data={checkOutData} open={sellOutModalOpen} onClose={closeModal} />
				)}
				<div className="grid grid-cols-4 gap-10 w-3/4 mt-10">
					{generateMockData().map((data, i) => (
						<div>
							<MarketCard data={data} setCheckOutData={setCheckOutData} />
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export function MarketCard({ data, setCheckOutData }: { data: MockData; setCheckOutData: (data: any) => void }) {
	const { sellOutModalOpen, openSellOutModal, closeModal } = useSelloutModal();
	return (
		<div className="max-w-sm rounded overflow-hidden  shadow-lg ">
			<img className="w-full" src={data.image} alt="Sunset in the mountains" />
			<div className="px-6 py-2">
				<div className="font-bold text-xl mb-2">{data.name}</div>
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
						setCheckOutData(data);
						openSellOutModal();
					}}
					paddingX="14"
					transition="default"
					type="button"
				>
					Buy
				</Box>
			</div>
		</div>
	);
}
