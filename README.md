# Golden Raspberry Awards - React Challenge

Aplicacao em React para leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## Funcionalidades implementadas

- Menu lateral com navegacao entre as views `Dashboard` e `List`.
- Dashboard com 4 paineis:
	- Anos com mais de um vencedor;
	- Top 3 estudios com mais vitorias;
	- Produtores com maior e menor intervalo entre vitorias;
	- Busca de vencedores por ano.
- Lista de filmes com:
	- Paginacao;
	- Filtro por ano;
	- Filtro por vencedor (Yes/No).
- Testes unitarios para rotas, servicos de API e funcionalidades principais das views.

## Tecnologias

- React
- Vite
- React Router
- Vitest
- Testing Library

## API utilizada

Base URL:

`https://challenge.outsera.tech/api/movies`

Endpoints usados:

- `/yearsWithMultipleWinners`
- `/studiosWithWinCount`
- `/maxMinWinIntervalForProducers`
- `/winnersByYear?year=YYYY`
- `?page=0&size=15&winner=true|false&year=YYYY`

## Como rodar o projeto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Rodar em modo desenvolvimento

```bash
npm run dev
```

### 3. Executar testes unitarios

```bash
npm run test
```

### 4. Gerar build de producao

```bash
npm run build
```

## Estrutura principal

```text
src/
	api/
		moviesApi.js
	components/
		AppLayout.jsx
	pages/
		DashboardPage.jsx
		MovieListPage.jsx
	test/
		setup.js
```

## Requisitos nao funcionais

- Layout responsivo para desktop e telas menores.
- Codigo organizado por responsabilidade (layout, paginas, integracao de API e testes).
- Documentacao de instalacao, execucao e testes.
