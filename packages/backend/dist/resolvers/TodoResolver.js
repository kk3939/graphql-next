"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Todo_1 = require("../entities/Todo");
const typeorm_1 = require("typeorm");
let TodoResolver = class TodoResolver {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    get todoRepo() {
        return this.dataSource.getRepository(Todo_1.Todo);
    }
    getTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepo.find();
        });
    }
    createTodo(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = new Todo_1.Todo();
            todo.title = title;
            todo.completed = false;
            return yield this.todoRepo.save(todo);
        });
    }
    updateTodo(id, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepo.findOne({ where: { id } });
            if (!todo)
                return false;
            todo.completed = completed;
            yield this.todoRepo.save(todo);
            return true;
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.todoRepo.delete({ id });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Todo_1.Todo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "getTodos", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Todo_1.Todo),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "createTodo", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('completed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateTodo", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
TodoResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TodoResolver);
exports.TodoResolver = TodoResolver;
