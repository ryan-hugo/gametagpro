# 🚀 Deploy no Render - GameName Generator

Este guia te ajudará a fazer o deploy do GameName Generator no Render de forma simples e rápida.

## 📋 Pré-requisitos

- Conta no [Render](https://render.com) (gratuita)
- Projeto no GitHub/GitLab/Bitbucket
- Node.js 18+ (verificado automaticamente pelo Render)

## 🔧 Configuração Automática (Recomendado)

### 1. Conectar Repositório

1. Acesse [dashboard.render.com](https://dashboard.render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub/GitLab/Bitbucket
4. Selecione o repositório do GameName Generator

### 2. Configuração do Serviço

O arquivo `render.yaml` já está configurado automaticamente:

```yaml
services:
  - type: web
    name: gamename-generator
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /
    autoDeploy: true
```

### 3. Deploy Automático

- O Render detectará automaticamente as configurações
- Clique em "Create Web Service"
- Aguarde o build e deploy (2-3 minutos)

## 🔧 Configuração Manual

Se preferir configurar manualmente:

### 1. Configurações Básicas

- **Name**: `gamename-generator`
- **Environment**: `Node`
- **Region**: Escolha a mais próxima
- **Branch**: `main` (ou sua branch principal)

### 2. Build & Deploy

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free`

### 3. Variáveis de Ambiente

Adicione estas variáveis:

- `NODE_ENV` = `production`
- `PORT` = `10000` (Render define automaticamente)

## ✅ Verificação do Deploy

### 1. Logs de Build

Verifique se o build foi bem-sucedido:

```
✓ built in 3.51s
dist\index.js  46.5kb
```

### 2. Health Check

O Render verificará automaticamente se a aplicação está rodando em `/`

### 3. URL de Acesso

Após o deploy, você receberá uma URL como:
`https://gamename-generator.onrender.com`

## 🔄 Deploy Contínuo

### Configuração Automática

- O `render.yaml` já está configurado com `autoDeploy: true`
- Qualquer push para a branch principal dispara um novo deploy

### Deploy Manual

- No dashboard do Render, clique em "Manual Deploy"
- Escolha a branch desejada

## 🛠️ Troubleshooting

### Erro de Build

```bash
# Verifique os logs no Render
# Teste localmente primeiro:
npm run build
```

### Erro de Start

```bash
# Verifique se o PORT está correto
# Teste localmente:
NODE_ENV=production node dist/index.js
```

### Problemas de Dependências

```bash
# Limpe cache e reinstale:
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoramento

### Logs em Tempo Real

- Acesse o dashboard do Render
- Vá em "Logs" para ver logs em tempo real

### Métricas

- **Uptime**: Monitorado automaticamente
- **Performance**: Disponível no dashboard
- **Erros**: Logs detalhados disponíveis

## 🔒 Segurança

### Variáveis Sensíveis

- Nunca commite senhas ou chaves no código
- Use variáveis de ambiente no Render
- O `.gitignore` já está configurado

### HTTPS

- Render fornece HTTPS automaticamente
- Certificados SSL gerenciados automaticamente

## 💰 Custos

### Plano Gratuito

- **Deploy**: Gratuito
- **Domínio**: `.onrender.com` gratuito
- **Limitações**:
  - 750 horas/mês
  - Sleep após 15 min de inatividade
  - 512MB RAM

### Planos Pagos

- **Starter**: $7/mês
- **Standard**: $25/mês
- Sem limitações de sleep

## 🚀 Próximos Passos

1. **Domínio Customizado**: Configure seu domínio no Render
2. **CDN**: Ative CDN para melhor performance
3. **Backup**: Configure backups automáticos
4. **Monitoramento**: Configure alertas de uptime

## 📞 Suporte

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Community**: [community.render.com](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)

---

**Status**: ✅ Pronto para Deploy  
**Última atualização**: Janeiro 2025
