# DevSnap

Diário técnico de aprendizado para desenvolvedores. Registre problemas resolvidos de forma estruturada, revise com intenção e exporte seu conhecimento em Markdown.

**Em produção:** [https://devsnap-c9lf.onrender.com](https://devsnap-c9lf.onrender.com)

![DevSnap](docs/assets/preview.gif)

---

## Usar

Abra o app em [devsnap-c9lf.onrender.com](https://devsnap-c9lf.onrender.com). Os dados ficam no seu navegador (`localStorage`) — sem conta e sem servidor de sincronização por enquanto.

---

## Sobre

Desenvolvedores resolvem dezenas de problemas por semana, mas raramente documentam o contexto — o erro, as tentativas, a solução e o raciocínio. Sem esse registro, o mesmo bloqueio reaparece semanas depois e o aprendizado se perde entre abas, chats e anotações soltas.

O DevSnap propõe um ciclo fechado: **capturar → estruturar → revisar → exportar**. Cada registro (episódio) segue um schema fixo, é organizado por stack tecnológica e pode ser revisado em sessões dedicadas. A persistência é local-first via `localStorage`.

---

## Funcionalidades

- Organização por stacks
- Registro estruturado de episódios (erro, tentativas, solução, raciocínio, snippets e tags)
- Revisão em duas etapas com active recall
- Modo Foco com episódios pendentes em ordem embaralhada
- Anotações incrementais por episódio
- Indicadores de urgência para pendências antigas
- Filtros e busca na listagem de episódios
- Exportação de stacks para Markdown
- Captura rápida via FAB ou atalho `Ctrl+Alt+N`
- Onboarding guiado na primeira visita

---

## Tecnologias

| Tecnologia       | Finalidade                                             |
| ---------------- | ------------------------------------------------------ |
| Angular 22       | Framework SPA com standalone components e lazy loading |
| TypeScript       | Tipagem estática dos models e services                 |
| Angular Signals  | Estado reativo para CRUD e derived state               |
| RxJS             | Sessão efêmera do Modo Foco (`BehaviorSubject`)        |
| Angular Material | UI — dialogs, forms, chips, snackbar                   |
| Tailwind CSS 4   | Layout responsivo e espaçamento                        |
| SCSS             | Theming via CSS variables e dark mode                  |
| Angular SSR      | Renderização no servidor (Express)                     |
| ngx-markdown     | Renderização de snippets de código                     |
| file-saver       | Download de arquivos `.md` no browser                  |
| Vitest           | Testes unitários                                       |

---

## Arquitetura

```text
src/app/
├── core/
│   ├── models/          Stack, Episode, Annotation
│   └── services/        Stack, Episode, FocusSession, Export, KeyboardShortcut
├── features/
│   ├── home/            Dashboard de stacks
│   ├── stack-detail/    Lista filtrada de episódios
│   ├── episode-form/    Formulário + captura rápida
│   ├── episode-edit/    Edição de episódio
│   ├── episode-detail/  Visualização e anotações
│   ├── focus/           Config → Sessão → Resultado
│   ├── export/          Download em Markdown
│   ├── settings/        Gestão de stacks
│   └── onboarding/      Primeira configuração
├── shared/
│   ├── components/      Header, FAB, empty-state, dialogs
│   └── pipes/           Urgency, pending-count, relative-date
└── guards/              authGuard, onboardingGuard
```

---

## Desenvolvimento

Requisitos: **Node.js >= 24.15.0** e **npm >= 11**.

```bash
git clone git@github.com:guilherme-messias/devsnap.git
cd devsnap
npm install
npm start
```

Acesse `http://localhost:4200`.

### Build e SSR

```bash
npm run build
npm run serve:ssr:devsnap
```

### Testes e lint

```bash
npm test
npm run lint
```

---

## Roadmap

- Backend em Nest.Js
- PostgreSQL
- Autenticação
- Sincronização entre dispositivos
- Notificações de revisão
- Algoritmo de repetição espaçada

---

## Licença

MIT — ver [LICENSE](LICENSE).

Desenvolvido para consolidar conhecimentos em Angular enquanto resolve um problema real enfrentado por desenvolvedores.
