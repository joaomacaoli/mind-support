# MindSupport - Frontend

## Tabela de Conteúdos

- [MindSupport - Frontend](#mindsupport---frontend)
  - [Tabela de Conteúdos](#tabela-de-conteúdos)
  - [🎭 Sobre o Projeto](#-sobre-o-projeto)
  - [👥 Equipe](#-equipe)
  - [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
    - [Principais](#principais)
    - [Bibliotecas Complementares](#bibliotecas-complementares)
  - [🚀 Funcionalidades](#-funcionalidades)
    - [Para Pacientes](#para-pacientes)
    - [Para Profissionais](#para-profissionais)
    - [Gerais](#gerais)
  - [📂 Estrutura do Projeto](#-estrutura-do-projeto)
  - [💻 Instalação e Execução](#-instalação-e-execução)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)
  - [🤝 Contribuição](#-contribuição)
  - [📜 Licença](#-licença)

## 🎭 Sobre o Projeto

O MindSupport é uma plataforma desenvolvida para conectar pacientes e profissionais de psicologia, oferecendo recursos completos para acompanhamento terapêutico e promoção da saúde mental.

Principais objetivos:

- Facilitar o acesso a serviços psicológicos
- Prover ferramentas para acompanhamento terapêutico
- Promover educação em saúde mental
- Criar uma comunidade de apoio

## 👥 Equipe

| Integrante      | Área     | Responsabilidades                                                                                                                                                                                                           |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chrystina       | FrontEnd | Páginas: HomePage, Anamnese básica, Cadastro de Paciente, Cadastro de Profissional                                                                                                                                          |
| João Marcelo    | BackEnd  | API, Integração com Banco de Dados                                                                                                                                                                                          |
| Marcos Vinícius | FrontEnd | Páginas: HomePage, Anamnese, Login, Pacient-Dashboard, Pacient-Profile, Professional-Dashboard, Professional-Profile, Registers, Testimonial, Building<br>Componentes: UserForms, Footer, UnderConstruction<br>Utils: Masks |

## 🛠 Tecnologias Utilizadas

### Principais

- ⚛ React.js (v18+)
- 🟨 JavaScript (ES6+)
- 🎨 CSS3
- 📦 npm

### Bibliotecas Complementares

- react-router-dom (roteamento)
- axios (requisições HTTP)
- react-hook-form (formulários)
- [adicione outras bibliotecas relevantes]

## 🚀 Funcionalidades

### Para Pacientes

- ✅ Cadastro e perfil personalizado
- ✅ Agendamento de sessões
- ✅ Acompanhamento de anamneses
- ✅ Depoimentos e feedbacks

### Para Profissionais

- ✅ Cadastro com validação
- ✅ Dashboard de pacientes
- ✅ Gestão de sessões
- ✅ Ferramentas de avaliação

### Gerais

- ✅ Sistema de autenticação seguro
- ✅ Interface responsiva
- ✅ Conteúdos educativos

## 📂 Estrutura do Projeto

```
mind-support/
├── public/
├── src/
│   ├── assets/          # Imagens, ícones, fonts
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── routes/          # Configuração de rotas
│   ├── services/        # Integração com API
│   ├── styles/          # Estilos globais
│   ├── utils/           # Funções utilitárias
│   ├── App.js           # Componente principal
│   └── index.js         # Ponto de entrada
├── .gitignore
├── package.json
└── README.md
```

## 💻 Instalação e Execução

### Pré-requisitos

- Node.js (v18+)
- npm (v9+)
- Conexão com backend (configurar no .env)

### Passo a passo

1. Clone o repositório:

```sh
git clone https://github.com/joaomacaoli/mind-support.git
```

2. Acesse o diretório:

```sh
cd mind-support
```

3. Instale as dependências:

```sh
npm install
```

4. Configure as variáveis de ambiente:

```sh
cp .env.example .env
# Edite o .env com suas configurações
```

5. Inicie o servidor de desenvolvimento:

```sh
npm start
```

6. Acesse no navegador:

```
http://localhost:3000
```

## 🤝 Contribuição

Siga estas etapas para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Padrões de código:

- Siga o ESLint configurado
- Commits semânticos
- Componentes funcionais com React Hooks
- Estilos com CSS modules

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
