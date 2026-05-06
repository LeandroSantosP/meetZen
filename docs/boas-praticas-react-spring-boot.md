# Boas Praticas: React + Spring Boot

Este documento centraliza boas praticas para o projeto `meetZen` usando frontend em React e backend em Spring Boot.

## React (frontend)

Referencia principal de performance para React/Next.js:

- Skill carregada: `vercel-react-best-practices`
- Guia completo: `.agents/skills/vercel-react-best-practices/AGENTS.md`

### Prioridades recomendadas

1. Eliminar waterfalls de `await` e fetch em cadeia.
2. Reduzir bundle inicial (imports diretos, `dynamic import` quando necessario).
3. Evitar re-renders desnecessarios (estado derivado, dependencias corretas, memoizacao quando fizer sentido).
4. Melhorar renderizacao em listas longas e operacoes pesadas.

### Checklist rapido (React)

- Use `Promise.all` para operacoes independentes.
- Evite imports de barrel files quando houver impacto de bundle.
- Prefira estado derivado em render em vez de `useEffect` + `setState`.
- Use `useDeferredValue`/`startTransition` para atualizacoes nao urgentes.
- Evite componentes declarados dentro de componentes.

## Spring Boot (backend)

Referencia principal para backend Spring Boot:

- Skill carregada: `spring-boot-best-practices`
- Guia completo: `.agents/skills/spring-boot-best-practices/AGENTS.md`

### Arquitetura e camadas

- Mantenha separacao clara: `domain`, `application`, `infra`.
- Regras de negocio no `domain`; orquestracao no `application`.
- Controllers finos no `infra` (sem regra de negocio).

### API e validacao

- Valide DTOs de entrada com Jakarta Validation (`@Valid`, `@NotNull`, etc.).
- Padronize erros com `@ControllerAdvice`.
- Versione APIs (`/api/v1/...`) e mantenha compatibilidade.

### Persistencia

- Use migracoes versionadas com Flyway.
- Evite N+1 queries e monitore consultas lentas.
- Nunca exponha entidades de persistencia diretamente na API.

### Seguranca

- Ative Spring Security para endpoints protegidos.
- Nao registre dados sensiveis em logs.
- Externalize segredos via variaveis de ambiente.

### Observabilidade e qualidade

- Adicione Actuator (`health`, `info`, `metrics`) para diagnostico.
- Tenha testes de unidade para regras de negocio e testes de integracao para endpoints.
- Execute `mvn test` no backend e mantenha cobertura minima em fluxos criticos.

## Como aplicar no meetZen

- Frontend: seguir as regras da skill `vercel-react-best-practices` em mudancas React.
- Backend: seguir as regras da skill `spring-boot-best-practices` em novas features Spring Boot.
- Sempre atualizar documentacao e colecao Postman quando endpoints mudarem.
