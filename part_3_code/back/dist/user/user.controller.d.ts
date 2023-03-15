import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import User from './user.type';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): User[];
    createNewUser(body: CreateUserDto): User;
}
