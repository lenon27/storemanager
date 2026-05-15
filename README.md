StoreManager 🚀

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![ASP.NET](https://img.shields.io/badge/.NET-8-purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

Sistema Full Stack para gerenciamento de produtos, desenvolvido com React, TypeScript, ASP.NET Core 8 e PostgreSQL.

O projeto permite cadastrar, listar, editar e remover produtos através de uma interface moderna integrada com uma API REST.

📌 Tecnologias utilizadas
Frontend
React
TypeScript
Vite
TailwindCSS
Axios
Backend
ASP.NET Core 8
Entity Framework Core
PostgreSQL
FluentValidation
AutoMapper
Serilog
DevOps
Docker
Docker Compose
Nginx
⚙️ Funcionalidades

✅ Cadastro de produtos
✅ Listagem de produtos
✅ Edição de produtos
✅ Remoção de produtos
✅ Validação de dados
✅ Integração completa Frontend + Backend
✅ API documentada com Swagger
✅ Banco PostgreSQL com Docker

📂 Estrutura do projeto
StoreManager/
│
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
🖥️ Como executar o projeto
Pré-requisitos
Node.js 20+
.NET 8 SDK
Docker Desktop
🔥 Rodando com Docker

Clone o repositório:

git clone https://github.com/lenon27/storemanager.git

Entre na pasta do projeto:

cd StoreManager

Suba os containers:

docker compose up --build
🌐 Acessos
Frontend
http://localhost:5173
Backend
http://localhost:5000
Swagger
http://localhost:5000/swagger
📦 Endpoints principais
Produtos
Listar produtos
GET /api/products
Buscar produto por ID
GET /api/products/{id}
Criar produto
POST /api/products
Atualizar produto
PUT /api/products/{id}
Remover produto
DELETE /api/products/{id}
🧪 Exemplo JSON
{
  "name": "Mouse Gamer",
  "description": "Mouse RGB com sensor óptico",
  "price": 149.9,
  "stock": 10,
  "sku": "MOUSE-001",
  "category": "Informática"
}
📸 Screenshots

Em breve serão adicionadas imagens da aplicação em funcionamento.

📈 Melhorias futuras
autenticação JWT
paginação
upload de imagens
dashboard administrativo
testes automatizados
deploy CI/CD
👨‍💻 Autor

Lenon Moralli Lacerda

LinkedIn: www.linkedin.com/in/lenon-lacerda-frontend
GitHub: https://github.com/lenon27
📄 Licença

Este projeto está sob a licença MIT.