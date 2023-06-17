import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    const userEmail = await this.findOne({
      where: [{ email }],
    });
    const userName = await this.findOne({
      where: [{ username }],
    });
    if (userEmail) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    if (userName) {
      throw new ConflictException(
        'Пользователь с таким именем пользовтеля уже зарегистрирован',
      );
    }

    const hash = await this.hashService.generate(password);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.usersRepository.save(newUser);
  }

  async findOne(id: FindOneOptions<User>): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }
}
