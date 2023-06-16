import { Entity, Column } from 'typeorm';
import { IsString, Length, IsEmail, IsUrl } from 'class-validator';
import { Exclude } from 'class-transformer';
import { MainEntity } from 'src/custom-entities/main.entity';

@Entity()
export class Users extends MainEntity {
  @Column({
    type: 'varchar',
    unique: true,
    length: 30,
  })
  @IsString()
  @Length(2, 30)
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
