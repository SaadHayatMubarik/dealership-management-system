import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User';
// import { CreateAuthDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.authService.signUp(createUserDto);
  }

//   @Get()
//   findAll() {
//     return this.authService.findAll();
//   }

  @Get('/:username')
  getUser(@Param('username') username: string): Promise<User> {
    return this.authService.loginById(username);
  }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
}
