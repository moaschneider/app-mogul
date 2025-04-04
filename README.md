# Anotações do curso "Cursor Course: FullStack development with Cursor Vibe Coding"

[Udemy](https://www.udemy.com/course/cursor-ai-ide/learn/lecture/45609807#questions)

> Prof. Eden Marco

## 1. Introdução

- O curso vai ser baseado em um projeto real de um microaplicativo SaaS funcional que se conecta com o GitHub e faz um resumo e uma análise do repositório

- O curso não é recomendado para iniciantes 😧

## 2. Objetivos

1. Aprender Cursor IDE
2. Construir um micro SaaS com IA
3. Ajudar a fazer parte do futuro da engenharia de software

> Assim como o C abstraiu o Assembly e Python abstraiu o C, eu acredito que a linguagem natural vai abstrair toda a linguagem de programação. -Eden Marco

Requisitos:
- Experiência em software
- Git
- Debbugging

## 3. O que é o Cursor

- Ferramenta para produtividade

> AI will not replace you. A person using AI will. -@svpino

## 5. Recursos do Curso 📚

### Materiais Oficiais
- 🔗 [Repositório do Projeto](https://github.com/emarco177/dandi)
  > Código-fonte e materiais do projeto que será desenvolvido

### Comunidade e Suporte
- 💬 [Discord](https://discord.com/invite/mRWyxwVD6J)
  > Canal oficial para tirar dúvidas e interagir com outros alunos

### Ferramentas Necessárias
- 🛠️ [v0](https://v0.dev/)
  > Ferramenta para desenvolvimento de interfaces
- 🚀 [Vercel](https://vercel.com/)
  > Plataforma para deploy do projeto


## 6. The GIST of Cursor


- Construir uma persona no Cursor com prompts do [Cursor Directory](https://cursor.directory/)

- Adicionar printscreens, instructions, urls no composer

- Selecionar o arquivo da requisição. Ex.: @arquivo.tsx

- Em caso de erros, selecionar o erro no terminal e adicionar no composer

- Inspecionar as mudanças no código no Diff View

- A cada alteração o Cursor cria um checkpoint que pode ser reestabelecido

- Settings > Features > Codebase indexing - Embeda os códigos no projeto (?). Pode ser incluido no contexto dos requerimentos para melhorar resultados. 
    - Me pareceu que isso é default



## 7. Cursor Sign-Up

- No settings é possível ver quantas requisições ainda é possível fazer. Modelo gpt-4-mini é ilimitado.



## 11. .cursorrules file and cursor.directory

- Usar prompts do Cursor Directory e adicionar .cursorrules na raiz do projeto 

- Essas regras servem para linguagens e stacks específicas de cada projeto.



## 12. Cursor Rules For AI (Global)

- Settings > General > Rules for AI: inserir regras gerais, que independem de qual tecnologia está sendo usada no projeto.
    - Por exemplo: sempre responder em português ou sempre use functional React

- [How to Customize Cursor Rules for Maximum AI Coding Accuracy](https://www.youtube.com/watch?v=QXOZfIUOnQM)




## 13. Cursor Privacy

- Privacy Mode: a plataforma não guarda nenhum dado e nenhum código vai ser utilizado para treinamento do app ou de parceiros. **Mas pode guardar os prompts**.

- Se escolher embedar/indexar o codebase (ver aula 6) a plataforma guardar os códigos sem as informações sensíveis (plain text).

- Settings > Models > Models Names: dependendo do uso de alguns modelos pode afetar o custo em planos pagos.


## 14. Cursor Tab, Cursor Composer

- Settings > Features > Cursor Tab: settings do autocompletar do Cursor (tab)

- Settings > Features > Cursor Composer: settings do composer do Cursor (tab)

- Settings > Features > Codebase Indexing: é necessário ressincronizar eventualmente



## 15. Cursor Pricing

- Free: 
    - 2000 requisições
    - Válido por 2 semanas 
      - **Não funciona depois ou não tem IA?**

- Pro:
    - 20 dolares/mês
    - Requisições ilimitadas
    - 500 requisições rápidas por mês
    - 10 01-mini usos por dia 
      - **Qual o diferencial desse modelo?**
    - É possível comprar pacotes adicionais de requisições

- Premium:
    - 40 dolares/mês
    - Mesmas funcionalidade do Pro e mais:
        - Funcionalidades de privacidade
        - Criação de equipes
        - Painel de administração


## 18. The Dummy Mode

- É quando o usuário fica preso muito tempo criando prompts e não obtém resultados esperados

- Quando isso acontecer:
    - Faça uma parada
    - Olhe o código



## 20. What are we building?

- Uma aplicação full stack apenas usando IA

- Eden roda o API Dandi construido com Next.JS, PostgreSQL

- A aplicação vai ser escrita usando o modelo claude-3.5-sonnet


## 21. Gitingest (With AI Eden)

- [Gitingest](https://gitingest.com/) - não entendi muito bem


## 23. Creating our boilerplate NEXT JS with cursor

NextJS vai criar toda a estrutura de pastas e estrutura de um projeto inicial simples. O comando também instala algumas dependências.

- `sudo npx create-next-app@latest`
- Nome do projeto: [[ NOME DO PROJETO ]]
- Não usar TypeScript
- ESLint - Yes
- Tailwind - Yes
- Usar src directory - Yes
- Usar App Router - Yes
- Customizar import alias (@/*) - Não
- Instalação das dependências
- Na pasta do projeto: `npm run dev`
  - Se acontecer `errno: -13` - NextJS não tem permissão
    - `sudo chmod -R 777`


## 24. Cursor CRUD UI

- [Tavily](https://tavily.com/)


## 25. Supabase Integration 1