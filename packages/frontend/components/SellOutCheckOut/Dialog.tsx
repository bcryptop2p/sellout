import { isMobile } from '@/utils/isMobile';
import React, { MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { Box } from './Box';
import * as styles from '../../styles/css/Dialog.css';
import { useThemeRootProps } from '@/context/SellOutProvider';

export function Dialog({ children, onClose, open, titleId }) {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => open && event.key === 'Escape' && onClose();

		document.addEventListener('keydown', handleEscape);

		return () => document.removeEventListener('keydown', handleEscape);
	}, [open, onClose]);

	const [bodyScrollable, setBodyScrollable] = useState(true);
	useEffect(() => {
		setBodyScrollable(getComputedStyle(window.document.body).overflow !== 'hidden');
	}, []);

	const mobile = isMobile();
	const handleBackdropClick = useCallback(() => onClose(), [onClose]);
	const themeRootProps = useThemeRootProps();
	return (
		<>
			{open &&
				createPortal(
					<RemoveScroll>
						<Box {...themeRootProps}>
							<Box
								{...themeRootProps}
								alignItems={mobile ? 'flex-end' : 'center'}
								aria-labelledby={titleId}
								aria-modal
								className={styles.overlay}
								onClick={handleBackdropClick}
								position="fixed"
								role="dialog"
							>
								{children}
							</Box>
						</Box>
					</RemoveScroll>,
					document.body,
				)}
		</>
	);
}
