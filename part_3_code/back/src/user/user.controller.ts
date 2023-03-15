import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import User from './user.type';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAll() {
		return this.userService.getAll()
	}

	@Post('createNewUser')
	createNewUser(@Body() body: CreateUserDto): User {
		return this.userService.createNewUser(body)
	}

}
