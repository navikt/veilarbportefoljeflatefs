package no.nav.fo.veilarbportefoljeflatefs.internal;


import no.nav.brukerdialog.security.pingable.IssoIsAliveHelsesjekk;
import no.nav.brukerdialog.security.pingable.IssoSystemBrukerTokenHelsesjekk;
import no.nav.sbl.dialogarena.types.Pingable;
import no.nav.sbl.dialogarena.types.Pingable.Ping;
import no.nav.sbl.dialogarena.types.Pingable.Ping.PingMetadata;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;


@Configuration
public class PingConfig {

    @Bean
    public Pingable issoPing() {
        return new IssoIsAliveHelsesjekk();
    }

    @Bean
    public Pingable oidcPing() { return new IssoSystemBrukerTokenHelsesjekk(); }

    @Bean
    public Pingable portefoljePing() throws IOException {
        return () -> {
            String url = System.getProperty("veilarbportefolje.hent_portefolje.url");
            PingMetadata metadata = new PingMetadata(url, "VeilArbPortefolje", true);
            return ping(url, metadata);
        };
    }

    @Bean
    public Pingable veilederPing() throws IOException {
        return () -> {
            String url = System.getProperty("veilarbveileder.hent_enheter.url");
            PingMetadata metadata = new PingMetadata(url, "VeilArbVeileder", true);
            return ping(url, metadata);
        };
    }

    @Bean
    public Pingable modiacontextholderPing() throws IOException {
        return () -> {
            String url = System.getProperty("veiledercontext-isalive.url");
            PingMetadata metadata = new PingMetadata(url, "Holder status om enhet og bruker i context.", false);
            return ping(url, metadata);
        };
    }

    @Bean
    public Pingable modiaeventdistributionPing() throws IOException {
        return () -> {
            String url = System.getProperty("modiaeventdistribution-isalive.url");
            PingMetadata metadata = new PingMetadata(url, "Distribuerer events om endringer av bruker i context over websocket.", false);
            return ping(url, metadata);
        };
    }

    private Ping ping(String url, PingMetadata metadata) {
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.connect();
            if (connection.getResponseCode() == 200) {
                return Ping.lyktes(metadata);
            }
            return Ping.feilet(metadata, new Exception("Statuskode: " + connection.getResponseCode()));
        } catch (Exception e) {
            return Ping.feilet(metadata, e);
        }
    }

}
