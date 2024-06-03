# Texo IT - Teste Técnico

## Descrição do Projeto

Este projeto é um teste técnico desenvolvido para a empresa Texo IT. A aplicação é construída usando Angular e Angular Material, e demonstra uma tabela com um menu lateral (sidebar) e um cabeçalho. A tabela ocupa 50% da largura da tela e está centralizada.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

/src
│
├── /app
│ │
│ ├── /core
│ │ ...
│ │
│ ├── /modules
│ │ ...
│ │
│ ├── /shared
│ │ │
│ │ ├── /components
│ │ │ │
│ │ │ ├── /layout
│ │ │ │ │
│ │ │ │ ├── header.component.html
│ │ │ │ ├── header.component.scss
│ │ │ │ ├── header.component.ts
│ │ │ │ └── header.component.spec.ts
│ │ │ │ │
│ │ │ │ ├── sidebar.component.html
│ │ │ │ ├── sidebar.component.scss
│ │ │ │ ├── sidebar.component.ts
│ │ │ │ └── sidebar.component.spec.ts
│ │ │ │
│ │ │ └── /other
│ │ ...
│ │
│ ├── /assets
│ ├── /environments
│ └── app-routing.module.ts
│
├── /assets
├── /environments
├── /styles
└── /index.html

markdown
Copiar código

### Descrição das Pastas

- **/src/app/core**: Contém funcionalidades compartilhadas em toda a aplicação, como guardas de rota, interceptors HTTP, modelos de dados comuns e serviços.
- **/src/app/modules**: Cada módulo representa uma área funcional da aplicação.
- **/src/app/shared/components/layout**: Contém os componentes de layout reutilizáveis, como o cabeçalho e o menu lateral.
- **/src/assets**: Armazena arquivos estáticos como imagens, fontes, etc.
- **/src/environments**: Armazena arquivos de configuração para diferentes ambientes (produção, desenvolvimento).
- **/src/styles**: Contém estilos globais da aplicação.

## Requisitos

- Node.js
- Angular CLI

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até o diretório do projeto:

bash
Copiar código
cd seu-repositorio
Instale as dependências:

bash
Copiar código
npm install
Executando o Projeto
Execute o servidor de desenvolvimento:

bash
Copiar código
ng serve
Abra o navegador e acesse:

arduino
Copiar código
http://localhost:4200
Componentes
Header Component
O componente de cabeçalho (header.component) está localizado em /src/app/shared/components/layout/header.

HTML: header.component.html
SCSS: header.component.scss
TypeScript: header.component.ts
Sidebar Component
O componente de menu lateral (sidebar.component) está localizado em /src/app/shared/components/layout/sidebar.

HTML: sidebar.component.html
SCSS: sidebar.component.scss
TypeScript: sidebar.component.ts
Estilos Globais
Os estilos globais estão definidos em /src/styles.

Observações
O projeto utiliza Angular Material para a interface do usuário.
A tabela é exibida com 50% da largura da tela e está centralizada na página.
Contato
Para mais informações, entre em contato com [Seu Nome] - [seu-email@example.com].
