"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./.env" });
app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, body_parser_1.json)({ limit: "5mb" }));
app.use((0, body_parser_1.urlencoded)({ limit: "5mb", extended: true }));
app.use((0, cors_1.default)());
app.use('/', express_1.default.static(path_1.default.join(__dirname, "..", "views")));
app.get('*', (req, res) => res.sendFile(path_1.default.join(__dirname, '..', 'views/index.html')));
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map