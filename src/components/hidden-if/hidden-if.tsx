import {ComponentType} from 'react';

interface HiddenProps {
    hidden?: boolean;
}

export function hiddenIf<PROPS>(Component: ComponentType<PROPS>): ComponentType<PROPS & HiddenProps> {
    return (props: PROPS & HiddenProps) => {
        const {hidden, ...rest} = props as any;
        if (hidden) {
            return null;
        }
        return <Component {...rest} />;
    };
}
