import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/userSignUp.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(userData: UserSignUpDto) {
    try {
      const newUser = this.userRepo.create(userData);
      await this.userRepo.save(newUser);
      return {
        status: 'ok',
        description: 'user created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserByEmail(email: string) {
    try {
      // Strict validation to prevent TypeORM from ignoring undefined conditions
      if (
        email === undefined ||
        email === null ||
        email === '' ||
        (typeof email === 'string' && email.trim() === '')
      ) {
        this.logger.error(
          'Invalid email provided: email is undefined, null, or empty',
        );
        return null;
      }

      const user = await this.userRepo.findOne({
        where: { email: email.trim() },
      });
      if (!user) {
        this.logger.error('User Not found');
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
