import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dtos/createUser.dto';
import User from './user.type';

@Injectable()
export class UserService {
  users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  createNewUser(user: CreateUserDto): User {
    if (user.name == '' || !user.level)
      throw new BadRequestException('User info not valid.');

	if (this.users.find(item => item.name == user.name))
		throw new BadRequestException('User name already taken.');

    this.users = [
      ...this.users,
      { name: user.name, level: user.level, id: randomUUID() },
    ];

    return this.users.at(this.users.length - 1);
  }
}
