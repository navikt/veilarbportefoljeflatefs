package no.nav.fo.veilarbportefoljeflatefs.config;

import no.nav.innholdshenter.common.ContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import static java.lang.String.format;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonMap;

@Configuration
public class DecoratorConfig {

    @Value("${iadecorator.url}")
    private String decoratorJS;


    @Bean
    public DecoratorFilter decoratorFilter() {
        Map<String, String> fragmenter = singletonMap(
                "decoratorscript",
                format("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"%s\"></script>", decoratorJS)
        );

        DecoratorFilter filter = new DecoratorFilter();
        filter.setFragmentsUrl("");
        filter.setNoDecoratePatterns(new ArrayList<>(asList(".*/img/.*", ".*/internal/.*")));
        filter.setApplicationName("veilarbportefoljeflatefs");
        filter.setFragmentNames(asList("decoratorscript"));
        filter.setContentRetriever(contentRetriever(fragmenter));
        return filter;
    }

    static ContentRetriever contentRetriever(Map<String, String> fragments) {
        final String html = createHtml(fragments);

        return new ContentRetriever() {
            @Override
            public String getPageContent(String path) {
                return html;
            }

            @Override
            public String getPageContentFullUrl(String url) {
                return html;
            }

            @Override
            public Properties getProperties(String path) {
                return new Properties();
            }

            @Override
            public Properties getPropertiesFullUrl(String url) {
                return new Properties();
            }

            @Override
            public void setBaseUrl(String baseUrl) {

            }
        };
    }

    private static String createHtml(Map<String, String> fragments) {
        String content = fragments
                .entrySet()
                .stream()
                .map((entry) -> format("<div id=\"%s\">%s</div>", entry.getKey(), entry.getValue()))
                .collect(Collectors.joining("\n"));

        return format("<div>%s</div>", content);
    }
}
