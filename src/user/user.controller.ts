import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseWrapper } from 'src/common/dto/response-wrapper.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('admin')
  async findAll() {
    const users = await this.userService.findAll();
    return new ResponseWrapper(200, 'Users fetched successfully', users);
  }

  @Post()
  @Roles('admin')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new ResponseWrapper(201, 'User created successfully', user);
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return new ResponseWrapper(200, 'User Updated successfully', user);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    const user = this.userService.delete(id);
    return new ResponseWrapper(200, 'User deleted successfully', user)
  }
}
