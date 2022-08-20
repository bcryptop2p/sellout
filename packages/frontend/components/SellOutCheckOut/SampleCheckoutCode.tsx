import { ModalProvider } from '@/context/SellOutProvider';
import MarketPlace from '@/pages/marketplace';
import CheckoutModal from './CheckoutModal';
import { useModalStateValue } from './ModalContext';

function SampleCheckoutModal() {
	const { openModal, closeModal, isModalOpen } = useModalStateValue();
	return (
		<CheckoutModal
			open={isModalOpen}
			onClose={closeModal}
			data={{
				id: 1,
				name: 'Eth Mexico Merch 🇲🇽',
				image: 'https://www.linkToMyStoreFront.com/ethmexicotee.jpg',
				description: 'This is an example of a purhase of a tshirt using sellout',
				price: 0.02,
			}}
		/>
	);
}

import { ModalProvider as SelloutModalProvider } from '@/context/SellOutProvider';
function App() {
	return (
		<SelloutModalProvider>
			<MarketPlace />
		</SelloutModalProvider>
	);
}
