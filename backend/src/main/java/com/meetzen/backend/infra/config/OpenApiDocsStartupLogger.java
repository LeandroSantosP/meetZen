package com.meetzen.backend.infra.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class OpenApiDocsStartupLogger {

    private static final Logger log = LoggerFactory.getLogger(OpenApiDocsStartupLogger.class);

    private final Environment environment;

    public OpenApiDocsStartupLogger(Environment environment) {
        this.environment = environment;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        int port = environment.getProperty("local.server.port", Integer.class, 8080);
        String scheme = isSslEnabled() ? "https" : "http";
        String host = environment.getProperty("server.address", "localhost");
        String contextPath = environment.getProperty("server.servlet.context-path", "");
        String baseUrl = String.format("%s://%s:%d%s", scheme, host, port, contextPath);

        log.info(
                "OpenAPI docs available at %s/swagger-ui/index.html and %s/v3/api-docs".formatted(baseUrl, baseUrl));
    }

    private boolean isSslEnabled() {
        return environment.getProperty("server.ssl.enabled", Boolean.class, false);
    }
}
