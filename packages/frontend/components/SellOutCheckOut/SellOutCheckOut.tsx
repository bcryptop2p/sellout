import { useModalState } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/ModalContext';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';
import { useModalStateValue } from './ModalContext';
// import { Dialog } from './Dialog';

export default function SellOutCheckOut() {
	const { closeModal, isModalOpen } = useModalStateValue();
	return (
		<>
			<Dialog titleId="title" onClose={closeModal} open={true}>
				<DialogContent>
					<div>
						<h1>Sell Out Check Out</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu vulputate consectetur, nunc
							nisi varius nisi, euismod aliquam nisl nunc eget nisl.
						</p>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
