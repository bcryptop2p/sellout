import { Dialog } from './Dialog';

export default function SellOutCheckOut() {
	return (
		<div className={''}>
			<Dialog children={() => <h1>Hello World!!</h1>} onClose={() => console.log('handle close')}></Dialog>
		</div>
	);
}
