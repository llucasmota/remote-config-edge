## 📋 Descrição da Alteração
<!-- Descreva de forma concisa o que este PR implementa ou corrige -->

## 🎯 Sprint & Tarefa Relacionada
- **Sprint:** <!-- Ex: Sprint 0 -->
- **Task ID:** <!-- Ex: Task 0.2 -->
- **Issue:** <!-- Ex: Closes #1 -->

---

## 🛡️ Checklist de Governança & Auditoria Bancária (Definition of Done)
Marque os itens atendidos antes de solicitar revisão:

- [ ] **Validação Estrita de Contrato:** Schemas e tipos TypeScript respeitados sem uso de `any`.
- [ ] **Backward Compatibility:** A alteração é retrocompatível e não quebra clientes ou versões legadas.
- [ ] **Cobertura de Testes:** Testes unitários com Vitest adicionados cobrindo caminhos felizes e casos de borda (*error handling*).
- [ ] **Resiliência & Segurança:** Sem riscos de memory leak no Node.js, sem dados sensíveis em logs e sem bloqueio do event loop.
- [ ] **Build & Lint:** `npm run build` e `npm test` passando com sucesso no CI.

---

## 🧪 Como Testar Localmente
```bash
npm test
```
<!-- Inclua detalhes ou comandos adicionais para validar localmente -->
