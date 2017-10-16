declare module "nav-frontend-modal" {
	import * as React from "react";

	export interface ModalProps {
        closeButton?: boolean;
        isOpen: boolean;
        className?: string;
        contentLabel: string;
        children: React.ReactNode;
        onAfterOpen?: () => void;
        onRequestClose: () => any;
        shouldCloseOnOverlayClick?: boolean;
        closeTimeoutMS?: number;
        contentClass?: string;
	}


	export class NavFrontendModal extends React.Component<ModalProps, {}> {
	    static setAppElement(tag: string): void;
    }

	export default NavFrontendModal;
}
