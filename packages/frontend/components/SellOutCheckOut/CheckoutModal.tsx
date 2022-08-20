import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import SellOutCheckOut, { ItemMetaData } from './SellOutCheckOut';

export interface ConnectModalProps {
	open: boolean;
	onClose: () => void;
}

export default function CheckoutModal({ onClose, open }: ConnectModalProps) {
	return (
		<Dialog onClose={onClose} open={open} titleId={'titleid'}>
			<DialogContent bottomSheetOnMobile padding="0" wide>
				<SellOutCheckOut
					itemMetaData={{
						title: "Nike Men's Joyride Run Flyknit Shoes",
						description: '',
						image:
							'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80',
						price: 120,
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
