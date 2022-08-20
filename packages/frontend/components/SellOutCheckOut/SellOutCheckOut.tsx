import { touchableStyles } from '@/styles/css/touchableStyles';
import { useModalState } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalContext';
import { useEffect, useState } from 'react';
import { Box } from './Box';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { useModalStateValue } from './ModalContext';
import { useSendTransaction, usePrepareSendTransaction, useAccount } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { NFTStorage } from 'nft.storage';
// import { Dialog } from './Dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

type ItemMetaData = {
	title: string;
	price: number;
	image: string;
	description: string;
};

export default function SellOutCheckOut({ itemMetaData }: { itemMetaData: ItemMetaData }) {
	const { closeModal, isModalOpen } = useModalStateValue();
	const { title, price, description, image } = itemMetaData;
	const [totalPrice, setTotalPrice] = useState(0.0);
	const [shippingPrice, setShippingPrice] = useState(0.1);
	return (
		<div className="p-10">
			<div className="flex items-center flex-col">
				<h1 className="text-3xl font-bold mb-5 font-rounded ">Checkout</h1>
				<ItemMetaData title={title} price={price} description={description} image={image} />
				<OrderSummary price={price} shipping={shippingPrice} setTotalPrice={setTotalPrice} />
				<div className="mt-5">
					<PaymentButton totalPrice={totalPrice} itemMetaData={itemMetaData} shippingPrice={shippingPrice} />
				</div>
			</div>
		</div>
	);
}

export function ItemMetaData({
	title,
	price,
	image,
	description,
}: {
	title: string;
	price: number;
	image: string;
	description: string;
}) {
	return (
		<div className=" rounded-2xl w-full flex-row mx-10 flex h-28 shadow-lg">
			<div className=" flex flex-1 items-center justify-center">
				<img src={image} className="w-28 h-auto  rounded-xl" />
			</div>
			<div className=" flex-col justify-evenly   font-rounded   flex flex-[1.6] p-2 ">
				<h1>{title}</h1>
				<h1>{price} ETH</h1>
			</div>
		</div>
	);
}

export function OrderSummary({
	price,
	shipping,
	setTotalPrice,
}: {
	price: number;
	shipping: number;
	setTotalPrice: any;
}) {
	const totalPrice = price + shipping;
	useEffect(() => {
		setTotalPrice(totalPrice);
	}, [setTotalPrice, totalPrice]);
	return (
		<div className=" rounded-2xl w-full flex-col mx-10 flex h-52 shadow mt-10 p-5">
			<div className="border-b border-b-gray-200 pb-6">Order Summary</div>
			<div className="flex mt-5 justify-between">
				<div>Order</div>
				<div>{price} ETH</div>
			</div>
			<div className="flex mt-5 justify-between">
				<div>Shipping</div>
				<div>{shipping} ETH</div>
			</div>
			<div className="flex mt-5 justify-between">
				<div>Total</div>
				<div>{totalPrice.toFixed(4)} ETH</div>
			</div>
		</div>
	);
}

async function getExampleImage(image) {
	const r = await fetch(image);
	if (!r.ok) {
		throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
	}
	return r.blob();
}

async function storeExampleNFT(
	itemMetaData: ItemMetaData,
	txHash: string,
	account: string,
	totalPrice: number,
	shippingPrice: number,
) {
	const image = await getExampleImage(itemMetaData.image);
	console.log(itemMetaData.title, 'name name');
	const name = itemMetaData.title;
	const nft = {
		image, // use image Blob as `image` field
		name: name,
		description: '',
		properties: {
			type: 't-shirt purchase',
			origins: {
				txHash: txHash,
				price: itemMetaData.price,
				orderDate: new Date().toLocaleDateString(),
				shippingPrice: shippingPrice,
				totalPrice: totalPrice,
			},
			authors: [{ account: account }],
			content: {
				'text/markdown': 'This is an example of a purhase of a tshirt using sellout',
			},
		},
	};

	const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
	const metadata = await client.store(nft);

	// console.log('NFT data stored!');
	// console.log('Metadata URI: ', metadata);
	return metadata.ipnft;
}

export function PaymentButton({
	totalPrice,
	itemMetaData,
	shippingPrice,
}: {
	totalPrice: number;
	itemMetaData: ItemMetaData;
	shippingPrice: number;
}) {
	const weiPrice = totalPrice && parseUnits(totalPrice.toString());
	const [ipfsHash, setIpfsHash] = useState('');
	const { address } = useAccount();
	// const viewReceipt = () => toast('View Receipt');
	const notify = () => toast('Wow so easy !');
	const { push } = useRouter();
	const { config } = usePrepareSendTransaction({
		request: {
			to: '0xE35ef95A80839C3c261197B6c93E5765C9A6a31a',
			value: weiPrice,
		},
	});
	const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config);

	const storeExampleNFTAsync = async (itemMetaData, data, address) => {
		const ipfsUrl = await storeExampleNFT(itemMetaData, data?.hash, address, totalPrice, shippingPrice);
		console.log('ipfsUrl', ipfsUrl);
		setIpfsHash(ipfsUrl);
	};

	// useEffect(() => {
	// 	if (ipfsHash) {
	// 		console.log('ipfsHashNew', ipfsHash);
	// 		notify();
	// 	}
	// }, [ipfsHash]);

	useEffect(() => {
		if (isSuccess && data && address) {
			storeExampleNFTAsync(itemMetaData, data, address);
		}
	}, [isSuccess, data]);

	return (
		<>
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
					if (ipfsHash) {
						push(`/receipt/${ipfsHash}`);
					} else {
						e.stopPropagation();
						console.log('submitting payment', totalPrice);
						sendTransaction?.();
					}
				}}
				paddingX="14"
				transition="default"
				type="button"
			>
				{ipfsHash ? 'View Receipt' : 'Confirm Payment'}
			</Box>
		</>
	);
}
