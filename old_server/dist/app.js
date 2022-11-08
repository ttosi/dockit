"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_1 = __importDefault(require("./api/project"));
const user_1 = __importDefault(require("./api/user"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/projects', project_1.default);
app.use('/users', user_1.default);
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
//# sourceMappingURL=app.js.map