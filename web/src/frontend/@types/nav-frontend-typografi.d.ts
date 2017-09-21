declare module "nav-frontend-typografi" {
	import * as React from "react";

	export interface Props {
		className?: string;
		role?: string;
	}

	export interface ElementProps {
        className?: string;
        style?: any;
        tag?: String
    }

	export class Sidetittel extends React.Component<Props, {}> {}
	export class Undertittel extends React.Component<ElementProps, {}> {}
	export class Normaltekst extends React.Component<Props, {}> {}
	export class EtikettLiten extends React.Component<Props, {}> {}
	export class Innholdstittel extends React.Component<ElementProps, {}> {}
	export class UndertekstBold extends React.Component<Props, {}> {}
	export class Element extends React.Component<ElementProps, {}> {}
}
