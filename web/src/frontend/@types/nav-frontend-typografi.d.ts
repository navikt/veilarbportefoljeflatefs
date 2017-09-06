declare module "nav-frontend-typografi" {
	import * as React from "react";

	export interface Props {
		className?: string;
	}

	export interface ElementProps {
	    tag: String
    }

	export class Sidetittel extends React.Component<Props, {}> {}
	export class Undertittel extends React.Component<Props, {}> {}
	export class Normaltekst extends React.Component<Props, {}> {}
	export class EtikettLiten extends React.Component<Props, {}> {}
	export class UndertekstBold extends React.Component<Props, {}> {}
	export class Element extends React.Component<ElementProps, {}> {}
}
