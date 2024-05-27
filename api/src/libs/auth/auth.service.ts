import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (user && (await this.usersService.validatePassword(username, pass))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(user: any) {
    try {
      const foundUser = await this.usersService.findOne(user.username);

      if (!foundUser) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: user.username, sub: foundUser.id };

      return {
        accessToken: this.jwtService.sign(payload),
        userId: foundUser.id,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error logging in');
    }
  }

  async signup(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
