import { touchableStyles } from '@/styles/css/touchableStyles';
import { useModalState } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalContext';
import { Box } from './Box';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { useModalStateValue } from './ModalContext';
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
	return (
		<>
			{/* <Dialog titleId="title" onClose={closeModal} open={true}>
				<DialogContent> */}
			<div className="flex items-center flex-col">
				<h1 className="text-lg mb-5 ">Checkout</h1>
				<ItemMetaData title={title} price={price} description={description} image={image} />
				<OrderSummary />
				<div className="mt-5">
					<PaymentButton />
				</div>
			</div>
			{/* </DialogContent>
			</Dialog> */}
		</>
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
				<h1>${price}</h1>
			</div>
		</div>
	);
}

export function OrderSummary() {
	return (
		<div className=" rounded-2xl w-full flex-col mx-10 flex h-52 shadow mt-10 p-5">
			<div className="border-b border-b-gray-200 pb-6">Order Summary</div>
			<div className="flex mt-5 justify-between">
				<div>Order</div>
				<div>$120</div>
			</div>
			<div className="flex mt-5 justify-between">
				<div>Gas</div>
				<div>$.05</div>
			</div>
			<div className="flex mt-5 justify-between">
				<div>Total</div>
				<div>$120.05</div>
			</div>
		</div>
	);
}

export function PaymentButton() {
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
			onClick={() => console.log('submit payment')}
			paddingX="14"
			transition="default"
			type="button"
		>
			Confirm Payment
		</Box>
	);
}
