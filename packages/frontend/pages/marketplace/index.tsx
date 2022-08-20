import CheckoutModal from '@/components/SellOutCheckOut/CheckoutModal';
import { useSelloutModal } from '@/context/SellOutProvider';
import { generateMockData } from '@/utils/generateMockData';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import { useState } from 'react';
import { MarketCard } from '..';

export default function MarketPlace() {
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
