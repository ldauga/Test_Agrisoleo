"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let UserService = class UserService {
    constructor() {
        this.users = [];
    }
    getAll() {
        return this.users;
    }
    createNewUser(user) {
        if (user.name == '' || !user.level)
            throw new common_1.BadRequestException('User info not valid.');
        if (this.users.find(item => item.name == user.name))
            throw new common_1.BadRequestException('User name already taken.');
        this.users = [
            ...this.users,
            { name: user.name, level: user.level, id: (0, crypto_1.randomUUID)() },
        ];
        return this.users.at(this.users.length - 1);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map