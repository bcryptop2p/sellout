import { MockData, MockNFTData } from '@/utils/generateMockData';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import SellOutCheckOut, { ItemMetaData } from './SellOutCheckOut';

export interface ConnectModalProps {
	open: boolean;
	onClose: () => void;
	data: MockData | MockNFTData;
	handleMint?: () => void;
	address: boolean;
	promoCode: boolean;
}

export default function CheckoutModal({ onClose, open, data, handleMint, address, promoCode }: ConnectModalProps) {
	return (
		<Dialog onClose={onClose} open={open} titleId={'titleid'}>
			<DialogContent bottomSheetOnMobile padding="0" wide>
				<SellOutCheckOut
					itemMetaData={{
						title: data.name,
						description: data.description,
						image: data.image,
						price: data.price,
					}}
					handleMint={handleMint}
					address={address}
					promoCode={promoCode}
				/>
			</DialogContent>
		</Dialog>
	);
}
