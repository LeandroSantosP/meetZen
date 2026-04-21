# Plano de Setup Basico - Backend (Spring Boot + Maven + Java 21)

## Objetivo

Definir um plano de inicializacao do backend em `backend/` com:

- Spring Boot `4.0.5`
- Maven
- Java `21`
- Arquitetura em camadas `application`, `domain`, `infra`
- Organizacao da camada `application` por dominio (ex.: `auth`, `user`, etc.)
- Praticas SOLID e boas praticas no ecossistema Java
- Documentacao de codigo e de API com OpenAPI/Swagger

---

## 1) Escopo do setup basico

### Inclui

1. Estrutura inicial do projeto backend com Maven.
2. Dependencias base para API REST, validacao, persistencia e observabilidade minima.
3. Estrutura de pacotes por arquitetura e por dominio.
4. Configuracao inicial de ambientes (`dev`, `test`, `prod`).
5. Integracao de OpenAPI/Swagger para documentacao de rotas.
6. Base de testes unitarios e de integracao.
7. Documentacao tecnica minima para onboarding.

### Nao inclui (neste plano)

1. Implementacao completa de regras de negocio.
2. Fluxo completo de autenticacao/autorizacao em producao.
3. Pipeline de deploy final.

---

## 2) Stack e versoes

- Java `21`
- Spring Boot `4.0.5`
- Maven `3.9+`
- PostgreSQL (runtime)
- OpenAPI/Swagger (springdoc)
- JUnit 5 + Spring Test

---

## 3) Dependencias iniciais

### Dependencias informadas (obrigatorias)

- `org.springframework.boot:spring-boot-devtools` (runtime, optional)
- `org.postgresql:postgresql` (runtime)
- `org.projectlombok:lombok` (optional)
- `org.springframework.boot:spring-boot-starter-data-jdbc-test` (test)
- `org.springframework.boot:spring-boot-starter-security-oauth2-client-test` (test)
- `org.springframework.boot:spring-boot-starter-security-test` (test)
- `org.springframework.boot:spring-boot-starter-webmvc-test` (test)

### Dependencias recomendadas para o setup basico

- `org.springframework.boot:spring-boot-starter-web`
- `org.springframework.boot:spring-boot-starter-validation`
- `org.springframework.boot:spring-boot-starter-actuator`
- `org.springframework.boot:spring-boot-starter-data-jdbc`
- `org.springdoc:springdoc-openapi-starter-webmvc-ui`
- `org.springframework.boot:spring-boot-starter-test`

Opcional recomendado:

- `org.flywaydb:flyway-core` para versionamento de schema.

---

## 3.1) Esqueleto inicial do `pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.0.5</version>
    <relativePath/>
  </parent>

  <groupId>com.meetzen</groupId>
  <artifactId>backend</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>backend</name>
  <description>meetZen backend</description>

  <properties>
    <java.version>21</java.version>
    <springdoc-openapi.version>2.8.13</springdoc-openapi.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jdbc</artifactId>
    </dependency>

    <dependency>
      <groupId>org.springdoc</groupId>
      <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
      <version>${springdoc-openapi.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <scope>runtime</scope>
      <optional>true</optional>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.flywaydb</groupId>
      <artifactId>flyway-core</artifactId>
    </dependency>

    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jdbc-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security-oauth2-client-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <release>21</release>
          <annotationProcessorPaths>
            <path>
              <groupId>org.projectlombok</groupId>
              <artifactId>lombok</artifactId>
            </path>
          </annotationProcessorPaths>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

Observacao:

- Validar versao do `springdoc-openapi-starter-webmvc-ui` com Spring Boot `4.0.5` no momento da implementacao.

---

## 4) Estrutura alvo de diretorios (simplificada)

```text
backend/
  pom.xml
  README.md
  src/main/java/com/meetzen/backend/
    BackendApplication.java
    application/
      user/
        CreateUserCommand.java
        UserApplicationMapper.java
        UserApplicationService.java
        UserView.java
    domain/
      user/
        User.java
        UserRepository.java
    infra/
      config/
        ClockConfig.java
        OpenApiConfig.java
      exception/
        ApiErrorResponse.java
        GlobalExceptionHandler.java
        ResourceNotFoundException.java
      user/
        CreateUserRequest.java
        JdbcUserRepositoryAdapter.java
        SpringDataJdbcUserRepository.java
        UserController.java
        UserControllerMapper.java
        UserEntity.java
        UserResponse.java
  src/main/resources/
    application.yml
    application-dev.yml
    application-test.yml
    application-prod.yml
    db/migration/
  src/test/java/com/meetzen/backend/
    unit/
    integration/
```

Regra principal:

- `application`: orquestra casos de uso por dominio.
- `domain`: regras centrais e contratos (sem dependencia de framework).
- `infra`: adaptadores externos (web, banco, config, excecoes, openapi).
- Evitar subpastas excessivas; usar subpastas apenas por dominio e por responsabilidade real.

---

## 5) Diretrizes de arquitetura e SOLID

1. **S (Single Responsibility):** cada classe com responsabilidade unica.
2. **O (Open/Closed):** extensao por composicao/estrategia, evitando alterar classes estaveis.
3. **L (Liskov):** contratos claros em interfaces e implementacoes coerentes.
4. **I (Interface Segregation):** interfaces pequenas e orientadas ao caso de uso.
5. **D (Dependency Inversion):** `application/domain` dependem de abstracoes; `infra` implementa portas.

Boas praticas adicionais:

- Domain nao conhece Spring annotations de infraestrutura.
- Controllers finos; logica de negocio em use cases/services.
- DTOs separados de entidades de persistencia.
- Validacao de entrada no boundary (request/dto).
- Tratamento global de erro com `@ControllerAdvice`.
- Logs estruturados e sem dados sensiveis.

---

## 6) OpenAPI / Swagger

### Objetivo

Expor documentacao viva das rotas REST e contratos de request/response.

### Acoes

1. Adicionar dependencia `springdoc-openapi-starter-webmvc-ui`.
2. Criar configuracao em `infra/openapi` com metadados da API:
   - titulo
   - versao
   - descricao
   - contato (opcional)
3. Padronizar anotacoes nos controllers:
   - `@Tag`
   - `@Operation`
   - `@ApiResponses`
   - `@Schema` nos DTOs principais
4. Definir endpoints padrao de doc:
   - `/v3/api-docs`
   - `/swagger-ui/index.html`

### Criterio de aceite

- Todas as rotas publicas aparecem na UI do Swagger com exemplos basicos.

---

## 7) Configuracao de ambiente

1. `application.yml` com configuracoes comuns.
2. Profiles:
   - `dev`: banco local e logs detalhados.
   - `test`: banco isolado para testes.
   - `prod`: variaveis externas e hardening basico.
3. Variaveis sensiveis apenas por env vars.
4. Timezone, locale e encoding explicitamente definidos.

---

## 8) Qualidade e testes

### Tipos de teste no setup

1. Unitario de `domain` e `application` (sem Spring context quando possivel).
2. Integracao de controller/repository com Spring Test.
3. Smoke test para subida da aplicacao.

### Convencoes

- Nomenclatura: `XxxUseCaseTest`, `XxxControllerIT`.
- Arrange/Act/Assert claro.
- Dados de teste deterministas.

---

## 9) Documentacao obrigatoria

Criar documentacao minima em `backend/README.md` com:

1. Visao geral da arquitetura (`application`, `domain`, `infra`).
2. Como rodar localmente.
3. Como rodar testes.
4. Como acessar Swagger.
5. Padrao para criar novo dominio (ex.: `auth`, `user`).
6. Regras de boas praticas (SOLID, tratamento de erro, logs).

Opcional recomendado:

- `backend/docs/architecture.md`
- `backend/docs/adr/` para decisoes arquiteturais.

---

## 10) Sequencia de execucao sugerida

1. Inicializar `backend/` com Maven e Java 21.
2. Configurar `pom.xml` com dependencias obrigatorias + recomendadas.
3. Criar estrutura de pacotes da arquitetura.
4. Configurar profiles e conexao PostgreSQL.
5. Subir endpoint de health check + controller exemplo (`/api/v1/users`).
6. Integrar OpenAPI/Swagger e validar documentacao.
7. Adicionar testes base (unit + integracao).
8. Escrever README tecnico.

---

## 11) Criterios de aceite do plano

- [ ] Projeto backend sobe com Java 21 e Spring Boot 4.0.5.
- [ ] Estrutura `application/domain/infra` criada e organizada por dominio.
- [ ] Dependencias obrigatorias adicionadas.
- [ ] PostgreSQL configurado por profile.
- [ ] Swagger/OpenAPI acessivel e com rotas documentadas.
- [ ] Pelo menos 1 dominio de exemplo (`user` ou `auth`) com fluxo basico.
- [ ] Testes base executando com sucesso.
- [ ] README do backend cobrindo setup e arquitetura.

---

## 12) Riscos e mitigacoes

1. **Risco:** acoplamento de regra de negocio ao framework.
   - **Mitigacao:** manter `domain` sem dependencias de infra.
2. **Risco:** controllers inchados.
   - **Mitigacao:** mover orquestracao para use cases da camada `application`.
3. **Risco:** documentacao de API desatualizada.
   - **Mitigacao:** anotacoes OpenAPI junto dos endpoints e checklist em PR.
4. **Risco:** divergencia de padrao entre dominios.
   - **Mitigacao:** template de criacao de novo dominio no README.
