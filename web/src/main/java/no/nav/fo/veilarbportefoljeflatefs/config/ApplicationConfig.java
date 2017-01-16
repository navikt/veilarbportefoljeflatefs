package no.nav.fo.veilarbportefoljeflatefs.config;

import no.nav.fo.veilarbportefoljeflatefs.config.endpoint.veilarbportefolje.PortefoljeEndpointConfig;
import no.nav.fo.veilarbportefoljeflatefs.config.endpoint.veilarbveileder.VeilederEndpointConfig;
import no.nav.fo.veilarbportefoljeflatefs.internal.HealthCheckService;
import no.nav.fo.veilarbportefoljeflatefs.internal.IsAliveServlet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@Import({
        PortefoljeEndpointConfig.class,
        VeilederEndpointConfig.class,
        TeksterServiceConfig.class,
        Pingables.class
})
public class ApplicationConfig {

    @Bean
    public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    public IsAliveServlet isAliveServlet() {
        return new IsAliveServlet();
    }

    @Bean
    public HealthCheckService healthCheckService() {
        return new HealthCheckService();
    }

}