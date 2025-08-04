# GameName Generator 🎮

Um gerador de nicknames moderno e personalizável, focado em algoritmos sofisticados de geração para criar nomes únicos e atrativos para jogos.

![GameName Generator](https://img.shields.io/badge/Status-Ready%20for%20Production-green)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)

## ✨ Características Principais

### 🚀 Algoritmos Avançados de Geração
- **Algoritmo Aleatório**: 10 padrões diferentes com validação inteligente
- **Algoritmo Silábico**: Geração fonética com sílabas melódicas
- **Algoritmo Temático**: 15 padrões sofisticados baseados em contexto

### 🎨 Interface Gaming
- Design dark mode com cores neon
- Interface responsiva e moderna
- Animações suaves com Framer Motion
- Componentes acessíveis com Radix UI

### 🔧 Personalização Completa
- Controle de comprimento (3-20 caracteres)
- Inclusão/exclusão de números e caracteres especiais
- Capitalização inteligente com 4 estilos diferentes
- 6 temas diferentes: fantasy, sci-fi, military, cute, edgy, neutral

### 📱 Funcionalidades
- Sistema de favoritos
- Histórico de nicknames gerados
- Estatísticas de uso
- Cópia com um clique
- Busca e filtros

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Radix UI** + **shadcn/ui** para componentes
- **TanStack Query** para gerenciamento de estado
- **Wouter** para roteamento
- **Framer Motion** para animações

### Backend
- **Node.js** com **Express.js**
- **TypeScript** com ESM modules
- **Drizzle ORM** (preparado para PostgreSQL)
- Armazenamento em memória (produção-ready)
- API RESTful com validação Zod

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### 1. Clone/Extraia o projeto
```bash
# Se usando git
git clone <url-do-repositorio>
cd gamename-generator

# Ou extraia o arquivo ZIP e entre na pasta
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute em desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5000`

### 4. Build para produção
```bash
npm run build
npm start
```

## 📝 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Gera build de produção
npm start         # Executa versão de produção
npm run check     # Verifica tipos TypeScript
```

## 🏗️ Estrutura do Projeto

```
gamename-generator/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── hooks/          # Hooks customizados
│   │   ├── lib/            # Utilitários e configurações
│   │   │   └── nickname-generator.ts  # Algoritmos de geração
│   │   ├── pages/          # Páginas da aplicação
│   │   └── main.tsx        # Entry point
│   └── index.html
├── server/                 # Backend Express
│   ├── index.ts            # Servidor principal
│   ├── routes.ts           # Rotas da API
│   ├── storage.ts          # Interface de armazenamento
│   └── vite.ts             # Configuração Vite
├── shared/                 # Código compartilhado
│   └── schema.ts           # Esquemas e tipos
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Configuração Avançada

### Banco de Dados (Opcional)
O projeto usa armazenamento em memória por padrão, mas está preparado para PostgreSQL:

1. Instale PostgreSQL
2. Configure a variável `DATABASE_URL`
3. Execute: `npm run db:push`

### Variáveis de Ambiente
Crie um arquivo `.env` se necessário:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://... (opcional)
```

## 🎯 Uso da API

### Endpoints Principais

```bash
# Gerar nicknames
POST /api/nicknames/generate
{
  "algorithm": "random|syllabic|thematic",
  "theme": "fantasy|sci-fi|military|cute|edgy|neutral",
  "minLength": 5,
  "maxLength": 12,
  "includeNumbers": true,
  "includeSpecialChars": false,
  "useCapitalization": true
}

# Listar nicknames
GET /api/nicknames

# Adicionar aos favoritos
POST /api/nicknames/:id/favorite

# Ver estatísticas
GET /api/stats
```

## 🚀 Deploy

### Opções de Deploy
1. **Replit Deployments** (recomendado)
2. **Vercel/Netlify** (frontend) + **Railway/Render** (backend)
3. **Docker** (incluído Dockerfile)
4. **VPS tradicional**

### Deploy no Replit
1. Abra o projeto no Replit
2. Configure as variáveis de ambiente se necessário
3. Clique em "Deploy"
4. Escolha o tipo de deployment (Autoscale recomendado)

## 🧪 Algoritmos de Geração

### Algoritmo Aleatório
- 10 padrões diferentes de combinação
- Validação inteligente de combinações estranhas
- Filtros de atratividade para melhor qualidade
- Capitalização estratégica

### Algoritmo Silábico  
- Geração fonética natural
- Priorização de sílabas melódicas
- Clusters de consoantes atrativas
- Padrões de vogais harmoniosos

### Algoritmo Temático
- 15 padrões contextuais sofisticados
- Bancos de palavras temáticas expandidos
- Combinações narrativas e hierárquicas
- Estilos emocionais e baseados em arquétipos

## 🎨 Personalização

### Adicionando Novos Temas
Edite `client/src/lib/nickname-generator.ts`:
```typescript
const themeWords = {
  // Adicione seu tema aqui
  meuTema: {
    prefixes: [...],
    suffixes: [...],
    syllables: [...],
    // ...
  }
}
```

### Novos Algoritmos
Crie uma nova função em `nickname-generator.ts` e adicione ao switch principal.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🐛 Problemas Conhecidos

- Nenhum problema crítico conhecido
- Para reportar bugs, abra uma issue

## 📈 Roadmap

- [ ] Integração com APIs de jogos
- [ ] Mais temas e algoritmos
- [ ] Sistema de usuários
- [ ] Exportação/importação de favoritos
- [ ] API pública

## 👨‍💻 Desenvolvido por

Criado com ❤️ usando tecnologias modernas para gerar os melhores nicknames de jogos.

---

**Versão**: 1.0.0  
**Status**: Produção Ready  
**Última atualização**: Janeiro 2025