# Reapp
Uma rede social livre que conecta pessoas as ONGs.

## Novos commits

Os novos commits que têm o potencial de impactar o projeto, como adição de funcionalidades, correção de bugs, atualizações de dependências, alterações na lógica de negócios, entre outros, devem ser submetidos em uma nova branch e posteriormente integrados através do processo de merge. É imperativo evitar commits diretamente na branch principal (main), garantindo assim uma gestão mais controlada e estável do código.

## Nomes das branchs

`feature` (funcionalidade): utilizado para adicionar, refatorar ou remover uma funcionalidade.

`bugfix` (correção de bug): utilizado para corrigir um bug.

`test` (teste/experimento): utilizado para experimentar fora de um problema/tarefa específica.

#### Exemplos
Você precisa adicionar, refatorar ou remover uma funcionalidade: 
- `git branch feature/create-new-button-component`

Você precisa corrigir um bug:
- `git branch bugfix/button-not-working-iphone`


Você precisa realizar experimentos:
- `git branch test/apply-new-hover-effect`

## Rodando Localmente

Clone o projeto

```bash
  git clone [link-projeto]
```

Vá para pasta do projeto

```bash
  cd reaap-frontend
```

Install dependencies

```bash
  npm install
```

Rodando o projeto

```bash
  npm run start
```

