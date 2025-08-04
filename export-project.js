#!/usr/bin/env node

/**
 * Script para exportar o projeto GameName Generator
 * Cria um ZIP com todos os arquivos necessários
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Exportando GameName Generator...');

// Arquivos e pastas para incluir no export
const filesToInclude = [
  // Arquivos raiz
  'package.json',
  'package-lock.json',
  'README.md',
  'INSTALLATION_GUIDE.md',
  'LICENSE',
  'Dockerfile',
  '.dockerignore',
  'docker-compose.yml',
  'vite.config.ts',
  'tailwind.config.ts',
  'tsconfig.json',
  'postcss.config.js',
  'components.json',
  'drizzle.config.ts',
  
  // Pastas importantes
  'client/',
  'server/',
  'shared/',
];

// Arquivos para excluir
const filesToExclude = [
  'node_modules',
  'dist',
  '.git',
  '.replit',
  '.cache',
  '.env',
  '*.log',
  'export-project.js' // Este próprio script
];

function shouldIncludeFile(filePath) {
  const relativePath = path.relative(__dirname, filePath);
  
  // Excluir arquivos/pastas específicos
  for (const exclude of filesToExclude) {
    if (relativePath.includes(exclude)) {
      return false;
    }
  }
  
  return true;
}

function copyProjectFiles() {
  const exportDir = path.join(__dirname, 'gamename-generator-export');
  
  // Criar diretório de export
  if (fs.existsSync(exportDir)) {
    fs.rmSync(exportDir, { recursive: true, force: true });
  }
  fs.mkdirSync(exportDir, { recursive: true });
  
  // Copiar arquivos
  for (const file of filesToInclude) {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(exportDir, file);
    
    if (fs.existsSync(srcPath)) {
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else {
        // Criar diretório pai se necessário
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(srcPath, destPath);
      }
      
      console.log(`✅ Copiado: ${file}`);
    } else {
      console.log(`⚠️  Não encontrado: ${file}`);
    }
  }
  
  // Criar arquivo de instruções extras
  const setupInstructions = `# 🎮 GameName Generator - Setup Rápido

## Comandos Essenciais
\`\`\`bash
# 1. Instalar dependências
npm install

# 2. Executar em desenvolvimento
npm run dev

# 3. Build para produção
npm run build && npm start
\`\`\`

## Acesso
- **Desenvolvimento**: http://localhost:5000
- **Documentação completa**: Veja README.md e INSTALLATION_GUIDE.md

## Estrutura
- \`client/\` - Frontend React + TypeScript
- \`server/\` - Backend Express + TypeScript  
- \`shared/\` - Código compartilhado

**Versão exportada em**: ${new Date().toLocaleString('pt-BR')}
`;
  
  fs.writeFileSync(path.join(exportDir, 'SETUP.md'), setupInstructions);
  
  console.log(`\n🎉 Projeto exportado para: ${exportDir}`);
  console.log('📂 Você pode compactar esta pasta em ZIP e compartilhar!');
  
  return exportDir;
}

function copyDirectory(src, dest) {
  if (!shouldIncludeFile(src)) {
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (!shouldIncludeFile(srcPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Executar export
copyProjectFiles();