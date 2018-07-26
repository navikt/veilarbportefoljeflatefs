package no.nav.fo.veilarbportefoljeflatefs.config;

import no.nav.fo.veilarbportefoljeflatefs.internal.PingConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@Import({
        TeksterServiceConfig.class,
        PingConfig.class
})
public class ApplicationConfig {

    @Bean
    public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
