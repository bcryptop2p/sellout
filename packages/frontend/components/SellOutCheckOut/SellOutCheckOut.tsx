import { touchableStyles } from '@/styles/css/touchableStyles';
import { useModalState } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalContext';
import { useEffect, useState } from 'react';
import { Box } from './Box';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { useModalStateValue } from './ModalContext';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { BigNumber } from 'ethers';

// import { Dialog } from './Dialog';

type ItemMetaData = {
	title: string;
	price: number;
	image: string;
	description: string;
};

export default function SellOutCheckOut({ itemMetaData }: { itemMetaData: ItemMetaData }) {
	const { closeModal, isModalOpen } = useModalStateValue();
	const { title, price, description, image } = itemMetaData;
	const [totalPrice, setTotalPrice] = useState(null);
	return (
		<div className="p-10">
			<div className="flex items-center flex-col">
				<h1 className="text-3xl font-bold mb-5 font-rounded ">Checkout</h1>
				<ItemMetaData title={title} price={price} description={description} image={image} />
				<OrderSummary price={price} shipping={0.1} setTotalPrice={setTotalPrice} />
				<div className="mt-5">
					<PaymentButton totalPrice={totalPrice} />
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

export function PaymentButton({ totalPrice }: { totalPrice: number }) {
	const { config } = usePrepareSendTransaction({
		request: { to: '0xE35ef95A80839C3c261197B6c93E5765C9A6a31a', value: BigNumber.from('10000000000000000') },
	});
	const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config);
	useEffect(() => {
		console.log(data, 'data');
	}, [data]);
	return (
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
				console.log('submitting payment', totalPrice);
				sendTransaction?.();
			}}
			paddingX="14"
			transition="default"
			type="button"
		>
			Confirm Payment
		</Box>
	);
}
