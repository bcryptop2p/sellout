import CopyIcon from '@/components/icons/Copy';
import { Dialog } from '@/components/SellOutCheckOut/Dialog';
import { DialogContent } from '@/components/SellOutCheckOut/DialogContent';
import Image from 'next/image';
import { useAccount } from 'wagmi';

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const truncateEthAddress = (address: string) => {
	const match = address.match(truncateRegex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

const truncate = (str, n) => {
	return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export default function ReceiptPage(props) {
	const { address } = useAccount();
	console.log(props);
	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<Dialog onClose={() => null} open={true} titleId={'titleid'}>
				<DialogContent bottomSheetOnMobile padding="0" wide={false}>
					<div className="h-[500px] p-10">
						<div className="text-2xl  flex items-center justify-center mt-2 mb-5 font-rounded">Order Confirmed</div>
						<div className="text-sm font-bold mb-1">Hello {truncateEthAddress(address)},</div>
						<div className="text-sm ">
							Your order has been{' '}
							<a
								className="text-blue-700 underline"
								href={`https://mumbai.polygonscan.com/tx/${props.ipfsData.properties.origins.txHash}`}
								target="_blank"
							>
								confirmed
							</a>{' '}
							and will be shipped to you shortly.
						</div>
						<div className="flex flex-row  items-center justify-start mt-4">
							<div className="text-lg font-bold font-rounded mr-2">Transaction: </div>
							<div className="text-sm flex flex-row font-rounded ">
								{truncate(props.ipfsData.properties.origins.txHash, 20)}
								<div
									onClick={() => {
										navigator.clipboard.writeText(props.ipfsData.properties.origins.txHash);
									}}
								>
									<CopyIcon />
								</div>
							</div>
						</div>
						<div className="flex flex-row  items-center  ">
							<div className="text-lg font-bold font-rounded mr-2">Order Date:</div>
							<div className="text-sm flex flex-row font-rounded ">{props.ipfsData.properties.origins.orderDate}</div>
						</div>
						<div className="border shadow-md rounded-md px-5 py-2  mt-5 flex flex-row">
							<img className="w-auto h-20" src={props?.image} />
							<div className="p-5 ">
								<div className="mb-2 font-rounded">{props?.ipfsData.name}</div>
								<div className="text-sm font-rounded">{props.ipfsData.properties.origins.price} ETH</div>
							</div>
						</div>
						<div className=" flex flex-row justify-between mt-5 ">
							<div>Shipping: </div>
							<div>{props.ipfsData.properties.origins.shippingPrice} ETH</div>
						</div>
						<div className=" flex flex-row justify-between mt-5 ">
							<div>Total Price: </div>
							<div>{props.ipfsData.properties.origins.totalPrice} ETH</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export const getStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: true, //indicates the type of fallback
	};
};

export const getStaticProps = async ({ params }) => {
	const { ipfsHash } = params;
	const res = await fetch(`https://ipfs.io/ipfs/${ipfsHash}/metadata.json`);
	const data = await res.json();
	const imageHash = data.image.split('://')[1];

	return {
		props: {
			ipfsData: data,
			image: `https://ipfs.io/ipfs/${imageHash}`,
		},
	};
};
