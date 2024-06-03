# Texo IT - Teste Técnico

## Descrição do Projeto

Este projeto é um teste técnico desenvolvido para a empresa Texo IT. A aplicação é construída utilizando Angular e Angular Material. Para criar o mock dos dados, foi utilizada a biblioteca angular-in-memory-web-api.

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
│ │ .pages
│ │ components
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

   git clone https://github.com/matheushsouto/texoit
   
2. Instale as dependências:

   npm install

3. Execute o servidor de desenvolvimento

    ng serve

Abra o navegador e acesse:

http://localhost:4200

Estilos Globais
Os estilos globais estão definidos em /src/styles.

Observações
O projeto utiliza Angular Material para a interface do usuário. 
Para mais informações, entre em contato comigo Matheus Henrique Souto - [matheushsouto@gmail.com].
