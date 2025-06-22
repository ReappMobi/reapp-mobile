# Reapp Mobile App

> [English Version](README.md)

## Configuração do Ambiente para Rodar Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/ReappMobi/reapp-mobile
cd reapp-mobile
```

### 2. Instalar Node, Yarn e Dependências

Certifique-se de ter o `nvm` (Node Version Manager) e o `corepack` instalados.

```sh
nvm use               # Usar a versão correta do node
corepack use yarn     # Instala a versão correta do Yarn
yarn                  # Instala as dependências
```

### 3. Configurar Expo e Java

Leia a [documentação do Expo](https://docs.expo.dev/get-started/set-up-your-environment).

- Use **somente builds de desenvolvimento** — **não utilize Expo Go**
- Para builds Android, use o **Java SDK 17**

### 4. Rodar o App

```sh
yarn expo prebuild        # Cria diretórios binários
yarn expo run:android     # Executa no Android
yarn expo run:ios         # Executa no iOS
```

---

## Commits

Commits que alteram o projeto de forma relevante (novas funcionalidades, 
correções, atualizações de dependências, mudanças de lógica etc.) devem ser 
feitos em uma **nova branch** e integrados posteriormente via merge.

Evite commits diretos na branch `main`. Isso ajuda a manter o código estável e organizado.

## Nomes de Branch

- `feature`: para adicionar, refatorar ou remover uma funcionalidade
- `bugfix`: para corrigir erros
- `test`: para testar ou experimentar fora de uma tarefa específica

### Exemplos

Adicionar, refatorar ou remover uma funcionalidade:

```bash
git checkout -b feature/criar-componente-botao
```

Corrigir um erro:

```bash
git checkout -b bugfix/botao-nao-funciona-iphone
```

Fazer um experimento:

```bash
git checkout -b test/novo-hover-effect
```

---

## English Version

[Go to English version](README.md)
