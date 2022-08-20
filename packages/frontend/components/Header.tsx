import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Header() {
	return (
		<header className="flex flex-row items-center" style={{ padding: '1rem' }}>
			<ConnectButton />
			<div className="ml-5 underline font-bold font-rounded">
				<Link href="/marketplace">MarketPlace</Link>
			</div>
			<div className="ml-5 underline font-bold font-rounded">
				<Link href="/mint">Mint</Link>
			</div>
		</header>
	);
}
