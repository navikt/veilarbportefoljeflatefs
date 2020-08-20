import hiddenIf from "../hidden-if/hidden-if";
import EtikettBase, {EtikettAdvarsel, EtikettFokus, EtikettInfo} from "nav-frontend-etiketter";
import './etiketter.less';

export const Advarsel = hiddenIf(EtikettAdvarsel);
export const Info = hiddenIf(EtikettInfo);
export const Fokus = hiddenIf(EtikettFokus);
export const Bas = hiddenIf(EtikettBase);
