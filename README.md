# Centro Pokémon

Desafio para desenvolvimento Front-end – React/Next.js. | codie.digital

---

## Ferramentas utilizadas

- TypeScript
- React.js
- Next.js
- Axios
- React Toastify
- React Hook Form
- Yup
- Styled-Components
- Inversify
- PNPM

---

## Setup

Instale as dependências do código com:

```shell
pnpm install

```

## Inicie o projeto

```shell
pnpm run dev

```

---

## O que foi feito?

Uma aplicação web em Typescript com Next.js, implementando os requisitos e o design predefinido aplicando os conceitos de Clean Architecture no Front-end.

### Requisitos

- ✅ Tratar possíveis erros de API
- ✅ Demonstrar conhecimento do uso de hooks
- ✅ Criar um código desacoplado, organizado e testável
- ✅ Demonstrar conhecimento de modularização de componentes
- ✅ Utilizar CSS in JS – styled components para estilizar as páginas
- ✅ Demonstrar conhecimento de TypeScript e suas features para organizar o projeto
- ✅ Obrigatório o uso do react-hook-form + yup para o desenvolvimento do formulário
- ✅ Deve ser usado Page Router do Next.js e não a nova versão >=14.0.0 no desenvolvimento deste projeto.
- ✅ Demonstrar organização, desacoplamento e separação de responsabilidades no código; obrigatório o uso de Inversify + Clean Architecture

### Diferencial

- ✅ Demonstrar conhecimentos de técnicas específicas de Next.js para lidar com estilos e server-side rendering.
- ✅ Demonstrar em pelo menos 1 chamada de api o uso de SSR Next.js
- 🟨 Demonstrar conhecimento com react-query.
- ✅ Demonstrar conhecimento em classes Javascript POO.

---

### Uso de APIs

#### Originais do projeto
- `http://localhost:3000/api/scheduling/date` para obter as datas disponíveis para agendamento
- `htttp://localhost:3000/api/scheduling/time` para obter os horários disponíveis para agendamento
- [pokéAPI](https://pokeapi.co/) para obter os dados de região, cidades, e pokémons a serem usados no agendamento
- 
#### Criado por mim
- `htttp://localhost:3000/api/scheduling/schedule` foi criado para lidar com o envio do formulário de agendamento de consulta

---

## Design implementado

O projeto implementa o design predefinido que pode ser consultado em [Design - Figma](https://www.figma.com/file/TxK6YkULMRyMCf6158VYNx/CODIE-TESTE-FRONT-END?type=design&node-id=0-1&mode=design&t=0dzPE2mRNqKfLXIg-0).

#### Abaixo estão telas reais da aplicação

### Home

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/af1489f0-dd38-4d9e-bf34-f7911da6d6e6)

Obs: O logo segue o seguinte comportamento: inicia expandido na home, e reduz após 05 segundos, da direita para a esquerda.
![](public/test-sample/logo-behavior.png)

### Quem Somos

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/3f69a788-267c-4049-a8a5-9b81022b4155)

### Agendar Consulta

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/f0e90d5d-e9ca-4149-b0ed-9f0d08f88396)
![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/0042c1f5-5cce-4e77-9a74-8d5f1699ce57)

#### Caso de Sucesso

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/13245988-0a4e-4af0-a8b4-a28b83a1478e)

#### Caso de Falha

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/bf14ceeb-a75d-407c-b610-9c051da9e953)

### Criadas por mim

### 404 Not Found

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/8dba36b2-31e3-42c9-ae20-28ff6c17885f)

### Caso de erro ao obter dados da PokéAPI

![image](https://github.com/alexrossoni/centro-pokemon/assets/103969200/0009b157-ebe6-42d3-b47d-3faad59ed2c4)

