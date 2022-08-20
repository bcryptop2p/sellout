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
	const [modalType, setModalType] = useState<'NFT' | 'PRODUCT'>('PRODUCT');

	return {
		closeModal: useCallback(() => setModalOpen(false), []),
		isModalOpen,
		openModal: useCallback(() => setModalOpen(true), []),
		setModalType,
		modalType,
	};
}

interface ModalContextValue {
	sellOutModalOpen: boolean;
	openSellOutModal?: () => void;
	modalType: 'NFT' | 'PRODUCT';
	setModalType: (type: 'NFT' | 'PRODUCT') => void;
}

const ModalContext = createContext<ModalContextValue>({
	sellOutModalOpen: false,
	modalType: 'PRODUCT',
	setModalType: () => {},
});

interface ModalProviderProps {
	children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
	const {
		closeModal,
		isModalOpen: sellOutModalOpen,
		openModal: openSellOutModal,
		setModalType,
		modalType,
	} = useModalStateValue();

	return (
		<ModalContext.Provider
			value={useMemo(
				() => ({ closeModal, sellOutModalOpen, openSellOutModal, setModalType, modalType }),
				[closeModal, sellOutModalOpen, openSellOutModal, setModalType, modalType],
			)}
		>
			{children}
			{/* <CheckoutModal open={sellOutModalOpen} onClose={closeModal} /> */}
		</ModalContext.Provider>
	);
}

export function useSelloutModal(type?: 'NFT' | 'PRODUCT') {
	const { sellOutModalOpen, openSellOutModal, closeModal, modalType, setModalType } = useContext(ModalContext);
	return { sellOutModalOpen, openSellOutModal, closeModal, modalType, setModalType };
}
