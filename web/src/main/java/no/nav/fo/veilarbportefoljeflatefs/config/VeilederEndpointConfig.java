package no.nav.fo.veilarbportefoljeflatefs.config;

import no.nav.sbl.dialogarena.types.Pingable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;


@Configuration
public class VeilederEndpointConfig {

    @Bean
    public Pingable veilederPing() throws IOException {
        return () -> {
            try {
                HttpURLConnection connection = (HttpURLConnection) new URL(System.getProperty("veilarbveileder.hent_enheter.url")).openConnection();
                connection.connect();
                if (connection.getResponseCode() == 200) {
                    return Pingable.Ping.lyktes("VeilArbVeileder");
                }
                return (Pingable.Ping.feilet("VeilArbVeileder", new Exception("Statuskode: " + connection.getResponseCode())));
            } catch (Exception e) {
                return Pingable.Ping.feilet("VeilArbVeileder", e);
            }
        };
    }


}
