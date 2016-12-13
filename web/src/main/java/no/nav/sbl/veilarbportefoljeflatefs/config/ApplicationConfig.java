package no.nav.sbl.veilarbportefoljeflatefs.config;

import no.nav.sbl.veilarbportefoljeflatefs.internal.HealthCheckService;
import no.nav.sbl.veilarbportefoljeflatefs.internal.IsAliveServlet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@Import({
        TeksterServiceConfig.class,
        Pingables.class,
})
@ImportResource({"classpath:spring-security.xml", "classpath:spring-security-web.xml"})
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