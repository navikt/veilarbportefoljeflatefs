package no.nav.fo.veilarbportefoljeflatefs.config;

import no.nav.fo.veilarbportefoljeflatefs.internal.HealthCheckService;
import no.nav.fo.veilarbportefoljeflatefs.internal.IsAliveServlet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@Import({
        TeksterServiceLokalConfig.class,
        Pingables.class
})
public class MockApplicationConfig {

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
