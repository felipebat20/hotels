# Hotel Reservation

## 1. Instale o Node.js e o npm

Caso não tenha o Node.js e/ou o npm instalados, acesse [https://nodejs.org/en](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) e siga o passo a passo.

## 2. Clone o repositório
```bash
git clone git@github.com:felipebat20/hotels.git
# ou
git clone https://github.com/felipebat20/hotels.git
```

## 3. Instale as dependências
```bash
npm install
```

### 4. Inicie o aplicativo em modo de desenvolvimento
```bash
npx quasar dev
```


## 4.1 (Opcional) Caso tenha o docker instalado, você pode testar localmente com o seguinte comando:

### Instale as dependências
```bash
docker compose run app npm ci
```

### Inicie o aplicativo em modo de desenvolvimento
```bash
docker compose up
```

### 5. Acesse a aplicação

Por padrão, a aplicação será inicializada em http://localhost:9000/.
