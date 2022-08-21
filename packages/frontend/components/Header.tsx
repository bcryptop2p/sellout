import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Header() {
	return (
		<header
			className="flex flex-row mt-5  pb-4 items-center border-b border-gray-300 mx-10"
			// style={{ padding: '1rem' }}
		>
			<div className="flex flex-1 ">
				<Link href={'/'}>
					<img className="w-20 cursor-pointer" src="/SelloutLogo.png" />
				</Link>
			</div>
			<div className="flex flex-1 flex-row justify-evenly  w-1/2">
				<div className=" text-lg font-bold font-rounded">
					<Link href="/marketplace">MarketPlace</Link>
				</div>
				<div className=" text-lg font-bold font-rounded">
					<Link href="/mint">Mint</Link>
				</div>
				<div className=" text-lg font-bold font-rounded">
					<Link href="/componentExamples">Components</Link>
				</div>
			</div>
			<div className="flex flex-1 justify-end">
				<ConnectButton chainStatus={'icon'} accountStatus={'address'} showBalance={false} />
			</div>
		</header>
	);
}
