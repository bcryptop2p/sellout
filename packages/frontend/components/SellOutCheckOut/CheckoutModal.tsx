import { MockData } from '@/utils/generateMockData';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import SellOutCheckOut, { ItemMetaData } from './SellOutCheckOut';

export interface ConnectModalProps {
	open: boolean;
	onClose: () => void;
	data: MockData;
}

export default function CheckoutModal({ onClose, open, data }: ConnectModalProps) {
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
				/>
			</DialogContent>
		</Dialog>
	);
}
