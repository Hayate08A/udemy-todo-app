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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
app.get('/allTodos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTodos = yield prisma.todo.findMany();
    return res.json(allTodos);
}));
app.post('/createTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, isCompleted } = req.body;
    const createTodo = yield prisma.todo.create({
        data: {
            title,
            isCompleted,
        },
    });
    return res.json(createTodo);
}));
app.put('/editTodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = yield prisma.todo.update({
        where: { id },
        data: {
            title,
            isCompleted,
        },
    });
    return res.json(editTodo);
}));
app.delete('/deleteTodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const editTodo = yield prisma.todo.delete({
        where: { id },
    });
    return res.json(editTodo);
}));
app.listen(PORT, () => {
    console.log('server is running 🚀');
    console.log(`localhost:${PORT}`);
});
