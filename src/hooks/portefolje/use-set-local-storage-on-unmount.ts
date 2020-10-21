import {useOnUnmount} from '../use-on-unmount';
import {updateLastPath} from '../../utils/url-utils';

export function useSetLocalStorageOnUnmount() {
    useOnUnmount(() => {
        updateLastPath();
    });
}
