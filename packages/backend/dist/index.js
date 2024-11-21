"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const TodoResolver_1 = require("./resolvers/TodoResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = new typeorm_1.DataSource({
        type: 'mysql',
        host: 'mysql',
        port: 3306,
        username: 'todo_user',
        password: 'todo_password',
        database: 'todo_db',
        entities: [__dirname + '/entities/*.ts'],
        synchronize: true,
    });
    yield dataSource.initialize();
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [TodoResolver_1.TodoResolver],
    });
    const server = new apollo_server_express_1.ApolloServer({ schema });
    const app = (0, express_1.default)();
    server.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('Backend server started at http://localhost:4000/graphql');
    });
}))();
