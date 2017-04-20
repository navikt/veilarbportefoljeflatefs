package no.nav.fo.veilarbportefoljeflatefs.internal;


import no.nav.sbl.dialogarena.types.Pingable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Configuration
public class PingConfig {

    @Bean
    public Pingable issoPing() throws IOException {
        return () -> {
            try {
                HttpURLConnection connection = (HttpURLConnection) new URL(System.getProperty("isso.isalive.url")).openConnection();
                connection.connect();
                if (connection.getResponseCode() == 200) {
                    return Pingable.Ping.lyktes("ISSO");
                }
                return Pingable.Ping.feilet("ISSO", new Exception("Statuskode: " + connection.getResponseCode()));
            } catch (Exception e) {
                return Pingable.Ping.feilet("ISSO", e);
            }
        };
    }

    @Bean
    public Pingable portefoljePing() throws IOException {
        return () -> {
            try {
                HttpURLConnection connection = (HttpURLConnection) new URL(System.getProperty("veilarbportefolje.hent_portefolje.url")).openConnection();
                connection.connect();
                if (connection.getResponseCode() == 200) {
                    return Pingable.Ping.lyktes("VeilArbPortefolje");
                }
                return Pingable.Ping.feilet("VeilArbPortefolje", new Exception("Statuskode: " + connection.getResponseCode()));
            } catch (Exception e) {
                return Pingable.Ping.feilet("VeilArbPortefolje", e);
            }
        };
    }

    @Bean
    public Pingable veilederPing() throws IOException {
        return () -> {
            try {
                HttpURLConnection connection = (HttpURLConnection) new URL(System.getProperty("veilarbveileder.hent_enheter.url")).openConnection();
                connection.connect();
                if (connection.getResponseCode() == 200) {
                    return Pingable.Ping.lyktes("VeilArbVeileder");
                }
                return Pingable.Ping.feilet("VeilArbVeileder", new Exception("Statuskode: " + connection.getResponseCode()));
            } catch (Exception e) {
                return Pingable.Ping.feilet("VeilArbVeileder", e);
            }
        };
    }

}
