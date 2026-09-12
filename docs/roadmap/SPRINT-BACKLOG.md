# 🗺️ Sprint Backlog & Quadro de Evolução do Projeto

**Plataforma:** Remote Config & Dynamic Menus para Mobile Banking  
**Tech Lead & Mentor:** AI Staff Architect  
**Engenheiro Responsável:** @llucasmota  

---

## 🏃 Sprint 0: Setup da Fundação & Validação com Ajv (EM ANDAMENTO)

| Task ID | Descrição | Status | Branch | PR |
| :--- | :--- | :--- | :--- | :--- |
| **0.1** | Criação & Conexão do Repositório GitHub | ✅ Concluído | `main` | - |
| **0.2** | Setup Base Node.js + TypeScript + Vitest + Fastify | ⏳ Em Andamento | `main` | - |
| **0.3** | GitHub Actions (CI & Bot de Review de PR) | ✅ Concluído | `main` | - |
| **0.4** | Template de Pull Request com Checklist de Governança | ✅ Concluído | `main` | - |
| **0.5** | **[PRIMEIRA TAREFA DE CÓDIGO]** Schemas JSON & Validador Ajv com Testes | 📝 A Fazer | `feat/sprint-0-ajv-validation` | - |

---

## 🏃 Sprint 1: Motor Criptográfico (Ed25519) & Compressão Brotli (PLANEJADO)

| Task ID | Descrição | Status | Branch | PR |
| :--- | :--- | :--- | :--- | :--- |
| **1.1** | Gerenciador de Chaves Assimétricas Ed25519 com `node:crypto` | 📝 A Fazer | `feat/sprint-1-crypto` | - |
| **1.2** | Função de Assinatura e Verificação de Integridade de Envelopes | 📝 A Fazer | `feat/sprint-1-crypto` | - |
| **1.3** | Pipeline de Pré-Compressão Offline Brotli (Nível 11) com `node:zlib` | 📝 A Fazer | `feat/sprint-1-brotli` | - |
| **1.4** | Testes Unitários de Criptografia e Benchmarks de Tamanho | 📝 A Fazer | `feat/sprint-1-brotli` | - |

---

## 🏃 Sprint 2: Armazenamento S3, Invalidação CDN & API de Publicação (PLANEJADO)

| Task ID | Descrição | Status | Branch | PR |
| :--- | :--- | :--- | :--- | :--- |
| **2.1** | Adaptador de Armazenamento de Objetos (AWS S3 / MinIO Local) | 📝 A Fazer | - | - |
| **2.2** | Rota de Compilação e Publicação no Fastify (`POST /api/v1/publish`) | 📝 A Fazer | - | - |
| **2.3** | Módulo de Invalidação Ativa de Cache-Tags na CDN | 📝 A Fazer | - | - |

---

## 🏃 Sprint 3: Governança Bancária, PostgreSQL & Maker-Checker (PLANEJADO)

| Task ID | Descrição | Status | Branch | PR |
| :--- | :--- | :--- | :--- | :--- |
| **3.1** | Modelagem PostgreSQL com Prisma/Drizzle (Rascunhos, Versões, Auditoria) | 📝 A Fazer | - | - |
| **3.2** | Lógica de Aprovação Maker-Checker (Regra dos Quatro Olhos) | 📝 A Fazer | - | - |
| **3.3** | Mecanismo de Diff Visual e Rollback em 1 Clique | 📝 A Fazer | - | - |

---

## 🏃 Sprint 4: Portal Administrativo / Backoffice Web (PLANEJADO)

| Task ID | Descrição | Status | Branch | PR |
| :--- | :--- | :--- | :--- | :--- |
| **4.1** | Setup React / Next.js com Tailwind / Shadcn UI | 📝 A Fazer | - | - |
| **4.2** | Formulário Dinâmico Assistido com base nos Schemas JSON | 📝 A Fazer | - | - |
| **4.3** | Monaco Editor com Validação Semântica e Live Preview de Menu | 📝 A Fazer | - | - |

---

## 🏃 Sprint 5: SDK Mobile & Motor de Borda (PLANEJADO)

| Task ID | Descrição | Status | Branch | PR |
| :--- | :--- | :--- | :--- | :--- |
| **5.1** | Motor de Cache em Memória/Disco Local (MMKV Simulator) | 📝 A Fazer | - | - |
| **5.2** | Sincronização Condicional em Segundo Plano com `If-None-Match` (HTTP 304) | 📝 A Fazer | - | - |
| **5.3** | Parser Defensivo (*Poison-Pill Defense*) e Fallback de Fábrica Embutido | 📝 A Fazer | - | - |
