# 🪹 ninho.app

**ninho.app** é um app pessoal de organização doméstica feito para quem vive sozinho ou quer ter controle total da própria casa e rotina. Ele centraliza **tarefas**, **alimentação**, **compras**, **organização do dia a dia** e até conversas com uma **IA pessoal que entende o contexto da sua vida**, unificando sua rotina pessoal e doméstica num único sistema inteligente.

## 🎯 Proposta de Valor

O **ninho.app** se diferencia por ser mais do que um simples organizador. Ele é um assistente pessoal inteligente que aprende com seus hábitos e rotinas para oferecer uma gestão doméstica e pessoal verdadeiramente unificada e proativa. Enquanto outros apps focam em funcionalidades isoladas, o ninho.app integra tudo em um ecossistema coeso, com uma IA que atua como o cérebro da sua casa.

## 🚀 Tecnologias

### Frontend

- [Next.js 15](https://nextjs.org/)
- ReactJS 19
- TailwindCSS v4
- shadcn/ui
- TypeScript

### Backend

- Java 21
- [Gradle](https://gradle.org/)
- [Spring Boot 3](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring OAuth2 Resource Server](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/)
- PostgreSQL 

## 🧩 Funcionalidades

### 🛡️ Segurança

O **ninho.app** utiliza **Spring Security** e **Spring OAuth2 Resource Server** para implementar um sistema robusto de autenticação e autorização. No qual é utilizado **[BCrypt](https://en.wikipedia.org/wiki/Bcrypt)** para hash de senhas, **roles** e **scopes** para um sistema de permissões granular e **[JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)**, com algoritmo de criptografia assimetrica [RSA](https://en.wikipedia.org/wiki/RSA_cryptosystem), para autenticação.

#### 🎓 Técnicas aplicadas

##### 🔐 Criptografia de Senhas com BCrypt

O **ninho.app** utiliza a implementação do algoritmo hash criptografico **[BCrypt](https://en.wikipedia.org/wiki/Bcrypt)** provida pelo Spring Security para hash de senhas, por ser algoritmicamente lento ele provê proteção garantida contra:

- **[Força Bruta](https://en.wikipedia.org/wiki/Brute-force_attack)**
- **[Rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table)**

> [!TIP]
> O Bcrypt foi configurado para cada hash demorar aproximadamente 1 segundo, tornando ataques custosos computacionalmente

```java
// Exemplo de configuração no Spring Security
@Bean
public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder(); // Força mínima permitida: 10
}
```

##### 🔑 JWT com Criptografia RSA

O sistema faz uso de **JSON Web Tokens (JWT)** com assinatura **RSA** de **4096 bits**, superando o mínimo permitido pelo Spring Security (2048 bits)

**Estrutura do Token JWT:**
```json
{
  "header": {
    "alg": "RS256"
  },
  "payload": {
    "sub": "550e8400-e29b-41d4-a716-446655440000",
    "iat": 1758478960,
    "exp": 1755886960,
    "roles": ["USER"],
    "scopes": [
      "grocery_list:list",
      "grocery_list:create", 
      "grocery_list:item:create",
      "room:list",
      "category:list"
    ]
  },
  "signature": "..."
}
```

- **Header:**
    - **alg(algoritmo):** RS256 (RSA com SHA-256)
- **Payload:**
    - **sub:** Identificador do usuário
    - **iat:** Quando foi emitido
    - **exp:** Até quando é valido (no ninho.app o token é valido até 30 dias)
    - **roles:** Roles do usuário
    - **scopes:** Escopos (permissões) do usuário
- **signature:** Chave pública

**Especificações Técnicas:**
- **Algoritmo:** RS256 (RSA com SHA-256)
- **Tamanho da Chave:** 4096 bits
- **Validade:** 30 dias para reduzir renovações frequentes
- **Claims Customizados:** `roles` e `scopes` para autorização granular

##### 🍪 Cookies HTTPOnly para trafegar JWTs com segurança

Implementação de cookies seguros especificamente otimizada para **[Single Page Applications (SPAs)](https://en.wikipedia.org/wiki/Single-page_application#)**:

```java
ResponseCookie jwtCookie = ResponseCookie.from("ninho_access_token", response.accessToken())
    .httpOnly(true)        // Protege contra XSS
    .secure(true)          // Apenas HTTPS
    .sameSite("Lax")       // Protege contra CSRF
    .path("/")             // Disponível em toda aplicação
    .maxAge(maxAgeSeconds) // Expira junto com o JWT
    .build();
```

**Proteções Implementadas:**
- **HTTPOnly:** Cookie inacessível via JavaScript, eliminando vetores de [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting#Http-only_cookie)
- **Secure:** Transmissão apenas via HTTPS em produção
- **SameSite=Lax:** Proteção contra [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) mantendo usabilidade

##### 🛡️ Sistema de Roles e Scopes Integrado ao JWT

O **ninho.app** implementa autorização hierárquica com **Roles** (funções) e **Scopes** (permissões específicas) embedados no JWT:

**Roles (Papeis Gerais):**
- `USER`: Usuário padrão com acesso básico às funcionalidades
- `ADMIN`: Administrador com privilégios de gestão do sistema

```java
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Void> acceptUser(@AuthenticationPrincipal Jwt principal) {
    // Apenas usuários com Role ADMIN podem aceitar novos usuários
}
```

**Scopes (Permissões Granulares):**
Cada funcionalidade possui permissões específicas que são validadas individualmente:

```java
@PreAuthorize("hasAuthority('grocery_list:create')")
public ResponseEntity<Void> createGroceryList(@AuthenticationPrincipal Jwt principal) {
    // Apenas usuários com scope específico podem criar listas de compras
}
```

> [!IMPORTANT]
> A role e o scope também são checados na camada de Serviço

##### 🌐 CORS

Configuração rigorosa de **[Cross-Origin Resource Sharing (CORS)](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)** para proteger contra requisições maliciosas:

- **Origens Permitidas:** Apenas variações para desenvolvimento e produção
- **Métodos HTTP:** GET, POST, PUT, DELETE, OPTIONS, PATCH
- **Headers Permitidos:** Authorization, Content-Type, Accept, Origin
- **Credentials:** `allowCredentials=true` para cookies
- **Cache:** 1 hora para otimizar performance de preflight

#### Recursos de Autenticação
- **Cadastro de Usuários (Sign Up):** Registro com validação de dados pessoais (nome, sobrenome, email e senha forte)
- **Login Seguro (Sign In):** Autenticação via email e senha com tokens JWT de longa duração (30 dias)
- **Sistema de Aprovação:** Novos usuários precisam ser aceitos por um administrador antes de acessar o sistema
- **Cookies HTTPOnly:** Tokens armazenados em cookies seguros para máxima proteção contra XSS
- **Criptografia de Senhas:** Senhas protegidas com BCrypt para hash seguro

#### Sistema de Permissões Granulares

O sistema utiliza **Roles** (funções) e **Scopes** (permissões específicas) para controle de acesso

**Roles Disponíveis:**
- `USER`: Usuário padrão do sistema
- `ADMIN`: Administrador do sistema

**Scopes por Funcionalidade:**
- **Listas de Compras:** 
    - `grocery_list:list`: Permissão para listar todas as listas de compras
    - `grocery_list:create`: Permissão para criar uma nova lista de compras
    - `grocery_list:update`: Permissão para editar detalhes de uma lista de compras existente
    - `grocery_list:delete`: Permissão para deletar uma lista de compras
    - `grocery_list:close`: Permissão para fechar/finalizar uma lista de compras
    - `grocery_list:item:list`: Permissão para listar itens de uma lista de compras
    - `grocery_list:item:read`: Permissão para visualizar detalhes de um item de lista de compras
    - `grocery_list:item:create`: Permissão para visualizar um item de lista de compras
    - `grocery_list:item:update`: Permissão para editar um item da lista de compras 
    - `grocery_list:item:delete`: Permissão para remover um item da lista de compras
    - `grocery_list:item:complete`: Permissão para marcar/desmarcar um item como concluído
    - `grocery_list:item:complete_all`: Permissão para marcar/desmarcar todos os itens de uma lista
    - `grocery_list:item:uncomplete`: Permissão para desmarcar um item como não concluído
    - `grocery_list:item:uncomplete_all`: Permissão para desmarcar todos os itens de uma lista como não concluídos
- **Cômodos:** 
    - `room:list`: Permissão para listar todos os cômodos
    - `room:read`: Permissão para visualizar detalhes de um cômodo específico
    - `room:create`: Permissão para criar um novo cômodo
    - `room:update`: Permissão para editar um cômodo existente
    - `room:delete`: Permissão para deletar um cômodo
- **Tags:** 
    - `tag:create`: Permissão para criar uma nova tag
    - `tag:update`: Permissão para atualizar uma tag existente 
    - `tag:delete`: Permissão para deletar uma tag existente
- **Categorias:** 
    - `category:list`: Permissão para listar todas as categorias
    - `category:read`: Permissão para visualizar detalhes de uma categoria específica
    - `category:create`: Permissão para criar uma nova categoria
    - `category:update`: Permissão para atualizar uma categoria existente
    - `category:delete`: Permissão para deletar uma categoria existente

#### Fluxo de Autenticação:
1. **Cadastro:** Usuário cria conta com dados pessoais e senha forte
2. **Aprovação:** Administrador aprova o usuário e atribui permissões específicas
3. **Login:** Sistema gera JWT com roles e scopes do usuário
4. **Autorização:** Cada endpoint valida permissões específicas via `@PreAuthorize`
5. **Segurança:** Token armazenado em cookie HTTPOnly para proteção contra XSS

### 🧠 Inteligência Artificial
- **Chat com Memória de Longo Prazo:** Converse com uma IA que aprende suas preferências e histórico para dar sugestões personalizadas.
- **Automação Inteligente:** Deixe a IA criar listas de compras a partir de receitas, sugerir tarefas com base na sua rotina e planejar seu dia.
- **Personagens com Especialidades:** Interaja com diferentes IAs, cada uma com uma função específica (chef, organizador, etc.).

### 🛒 Lista de compras
- **Listas de Compras Inteligentes:** Crie listas de compras que se organizam sozinhas por categoria de produto, otimizando seu tempo no mercado.
- **Listas Colaborativas em Tempo Real:** Compartilhe listas com outras pessoas e veja as atualizações instantaneamente.
- **Catálogo de Produtos e Histórico de Preços:** Salve seus produtos favoritos e monitore preços para economizar.
- **Sugestões Baseadas no Histórico:** A IA sugere itens com base nas suas compras recorrentes.

### 🧹 Gestão de Tarefas e Rotinas
- **Tarefas Domésticas e Pessoais Unificadas:** Gerencie tudo em um só lugar, desde limpar a casa até projetos de trabalho.
- **Agendamento Flexível:** Crie tarefas pontuais ou recorrentes com prioridades, datas e lembretes.
- **Rotinas de Limpeza por Cômodo:** Organize a limpeza da casa com tarefas agrupadas por ambiente e com sistema de rotação.
- **Controle de Carga Diária:** Visualize o volume de tarefas de cada dia para um planejamento equilibrado.

### 🍽️ Planejamento de Refeições
- **Cardápio Semanal Personalizado:** Planeje suas refeições com sugestões da IA baseadas nos seus gostos e nos itens disponíveis.
- **Livro de Receitas Digital:** Salve suas receitas favoritas e importe novas da web.
- **Geração Automática de Lista de Compras:** Transforme seu planejamento de refeições em uma lista de compras com um clique.

### 📅 Calendário e Hábitos
- **Calendário Integrado:** Visualize todos os seus compromissos, tarefas e eventos em um único calendário.
- **Monitoramento de Hábitos:** Crie e acompanhe hábitos diários ou semanais para alcançar seus objetivos pessoais.
- **Atividades Cronometradas:** Use timers para focar em tarefas específicas, como estudos ou exercícios.
