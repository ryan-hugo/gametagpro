# 📋 Guia de Instalação Completo - GameName Generator

Este guia vai te ajudar a configurar o GameName Generator do zero, passo a passo.

## 🔧 Pré-requisitos

### 1. Node.js
**Versão mínima: 18.x**

#### Windows:
1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Verifique: `node --version` e `npm --version`

#### macOS:
```bash
# Usando Homebrew (recomendado)
brew install node

# Ou baixe do site oficial
```

#### Linux (Ubuntu/Debian):
```bash
# Método 1: Repositório oficial
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Método 2: Snap
sudo snap install node --classic
```

### 2. Git (Opcional)
```bash
# Windows: baixe de git-scm.com
# macOS: brew install git
# Linux: sudo apt install git
```

## 📦 Instalação

### Método 1: Download do ZIP
1. Extraia o arquivo ZIP do projeto
2. Abra o terminal/prompt na pasta extraída
3. Continue para o passo 3

### Método 2: Git Clone
```bash
git clone <url-do-repositorio>
cd gamename-generator
```

### 3. Instalar Dependências
```bash
# Instala todas as dependências do projeto
npm install

# Ou usando yarn (se preferir)
yarn install
```

**Tempo estimado**: 2-5 minutos dependendo da sua conexão

### 4. Verificar Instalação
```bash
# Verificar se tudo foi instalado corretamente
npm run check
```

Se não houver erros, a instalação foi bem-sucedida!

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
# Inicia o servidor de desenvolvimento
npm run dev
```

**Resultado esperado:**
```
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts

[express] serving on port 5000
```

**Acesse:** http://localhost:5000

### Produção
```bash
# 1. Fazer build
npm run build

# 2. Executar versão de produção
npm start
```

## 🔍 Solução de Problemas

### Erro: "command not found: node"
**Problema:** Node.js não está instalado ou não está no PATH
**Solução:** 
1. Reinstale o Node.js
2. Reinicie o terminal
3. Verifique: `node --version`

### Erro: "EACCES: permission denied"
**Problema:** Permissões do npm (comum no Linux/macOS)
**Solução:**
```bash
# Método 1: Usar npx
npx create-react-app --version

# Método 2: Configurar npm (permanente)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Erro: "Cannot find module"
**Problema:** Dependências não foram instaladas
**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 5000 is already in use"
**Problema:** Porta 5000 já está sendo usada
**Solução:**
```bash
# Método 1: Usar outra porta
PORT=3001 npm run dev

# Método 2: Encontrar e matar o processo
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

### Erro: "Module not found: Can't resolve '@/'"
**Problema:** Aliases do Vite não configurados
**Solução:** Este erro não deve ocorrer, mas se acontecer:
```bash
# Verificar se o vite.config.ts está correto
npm run check
```

## ⚙️ Configuração Opcional

### 1. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Porta do servidor (padrão: 5000)
PORT=5000

# Ambiente (development/production)
NODE_ENV=development

# Database URL (opcional - padrão usa memória)
DATABASE_URL=postgresql://usuario:senha@localhost:5432/gamenames
```

### 2. Database PostgreSQL (Opcional)
O projeto funciona com armazenamento em memória, mas pode usar PostgreSQL:

#### Instalar PostgreSQL:
```bash
# Windows: baixe do postgresql.org
# macOS: brew install postgresql
# Linux: sudo apt install postgresql postgresql-contrib
```

#### Configurar:
```bash
# 1. Criar database
createdb gamenames

# 2. Configurar URL no .env
DATABASE_URL=postgresql://localhost:5432/gamenames

# 3. Aplicar schema
npm run db:push
```

### 3. Configuração de Desenvolvimento

#### VS Code (Recomendado)
Extensões úteis:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag

#### Configurações do Editor
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

## 🔄 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Desenvolvimento | `npm run dev` | Inicia servidor com hot reload |
| Build | `npm run build` | Compila para produção |
| Start | `npm start` | Executa versão de produção |
| Check | `npm run check` | Verifica tipos TypeScript |
| DB Push | `npm run db:push` | Aplica schema no banco |

## 📱 Testando a Instalação

### 1. Teste Básico
1. Execute `npm run dev`
2. Abra http://localhost:5000
3. Clique em "Gerar Nicknames"
4. Verifique se os nicknames aparecem

### 2. Teste de Funcionalidades
- [ ] Geração de nicknames funciona
- [ ] Algoritmos diferentes geram resultados diferentes
- [ ] Sistema de favoritos funciona
- [ ] Estatísticas são atualizadas
- [ ] Interface responde em mobile

### 3. Teste de Build
```bash
npm run build
npm start
# Acesse http://localhost:5000 e teste novamente
```

## 🚀 Próximos Passos

1. **Personalização**: Edite cores em `client/src/index.css`
2. **Novos Temas**: Adicione em `client/src/lib/nickname-generator.ts`
3. **Deploy**: Escolha uma plataforma (Vercel, Netlify, Railway)
4. **Monitoramento**: Configure analytics se necessário

## 📞 Suporte

Se encontrar problemas:
1. Verifique se seguiu todos os passos
2. Consulte a seção "Solução de Problemas"
3. Verifique se as versões estão corretas:
   - Node.js 18+
   - npm 8+

## ✅ Checklist Final

- [ ] Node.js 18+ instalado
- [ ] Projeto extraído/clonado
- [ ] `npm install` executado com sucesso
- [ ] `npm run dev` funcionando
- [ ] Aplicação abrindo no navegador
- [ ] Geração de nicknames funcionando
- [ ] Build de produção testado

**Parabéns! 🎉 Seu GameName Generator está funcionando perfeitamente!**