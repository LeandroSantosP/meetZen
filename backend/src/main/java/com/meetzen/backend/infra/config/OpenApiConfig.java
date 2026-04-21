package com.meetzen.backend.infra.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI backendOpenApi() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("meetZen Backend API")
                                .version("v1")
                                .description("Core API for meetZen platform")
                                .contact(new Contact().name("meetZen Team").email("engineering@meetzen.local")));
    }
}
