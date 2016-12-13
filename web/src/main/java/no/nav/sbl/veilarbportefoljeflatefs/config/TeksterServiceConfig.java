package no.nav.sbl.veilarbportefoljeflatefs.config;

import no.nav.sbl.tekster.TeksterAPI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class TeksterServiceConfig {

    @Value("${folder.ledetekster.path}")
    private String ledeteksterPath;

    @Bean
    public TeksterAPI teksterApi() {
        return new TeksterAPI(ledeteksterPath + "/tekster", "veilarbportefoljeflatefs");
    }
}
