import CheckoutModal from '@/components/SellOutCheckOut/CheckoutModal';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Context } from 'vm';

const attr = 'data-rk';

const ThemeIdContext = createContext<string | undefined>(undefined);
const createThemeRootProps = (id: string | undefined) => ({ [attr]: id || '' });

export const useThemeRootProps = () => {
	const id = useContext(ThemeIdContext);
	return createThemeRootProps(id);
};

function useModalStateValue() {
	const [isModalOpen, setModalOpen] = useState(false);

	return {
		closeModal: useCallback(() => setModalOpen(false), []),
		isModalOpen,
		openModal: useCallback(() => setModalOpen(true), []),
	};
}

interface ModalContextValue {
	sellOutModalOpen: boolean;
	openSellOutModal?: () => void;
}

const ModalContext = createContext<ModalContextValue>({
	sellOutModalOpen: false,
});

interface ModalProviderProps {
	children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
	const { closeModal, isModalOpen: sellOutModalOpen, openModal: openSellOutModal } = useModalStateValue();

	return (
		<ModalContext.Provider
			value={useMemo(
				() => ({ closeModal, sellOutModalOpen, openSellOutModal }),
				[closeModal, sellOutModalOpen, openSellOutModal],
			)}
		>
			{children}
			{/* <CheckoutModal open={sellOutModalOpen} onClose={closeModal} /> */}
		</ModalContext.Provider>
	);
}

export function useSelloutModal() {
	const { sellOutModalOpen, openSellOutModal, closeModal } = useContext(ModalContext);
	return { sellOutModalOpen, openSellOutModal, closeModal };
}
