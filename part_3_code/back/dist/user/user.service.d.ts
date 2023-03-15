import { CreateUserDto } from './dtos/createUser.dto';
import User from './user.type';
export declare class UserService {
    users: User[];
    getAll(): User[];
    createNewUser(user: CreateUserDto): User;
}
