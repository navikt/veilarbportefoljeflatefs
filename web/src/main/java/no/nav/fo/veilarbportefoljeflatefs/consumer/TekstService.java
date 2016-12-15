package no.nav.fo.veilarbportefoljeflatefs.consumer;

import no.nav.sbl.tekster.TeksterAPI;
import no.nav.sbl.tekster.Utils;

import java.util.Map;

public interface TekstService {
    public String hentTekst(String key, String sprak);

    public String hentTekst(String key);

    public Map<String, String> hentTekster(String sprak);

    public Map<String, String> hentTekster();

    static class Default implements TekstService {
        public static final String DEFAULT_LOCALE = "nb";

        private TeksterAPI teksterAPI;

        public Default(TeksterAPI teksterAPI) {
            this.teksterAPI = teksterAPI;
        }

        @Override
        public String hentTekst(String key, String sprak) {
            return teksterAPI.hentTekster(sprak).getString(key);
        }

        @Override
        public Map<String, String> hentTekster(String sprak) {
            return Utils.convertResourceBundleToStringMap(teksterAPI.hentTekster(sprak));
        }

        @Override
        public String hentTekst(String key) {
            return hentTekst(key, DEFAULT_LOCALE);
        }

        @Override
        public Map<String, String> hentTekster() {
            return hentTekster(DEFAULT_LOCALE);
        }
    }
}
