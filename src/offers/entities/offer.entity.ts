import { Entity, Column, ManyToOne } from 'typeorm';
import { IsString, IsUrl, IsNumber } from 'class-validator';
import { MainEntity } from 'src/custom-entities/main.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Offer extends MainEntity {
  @Column()
  @IsNumber()
  userId: number;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @IsUrl()
  item: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  @IsNumber()
  amount: number;

  @Column({
    default: false,
  })
  @IsString()
  hidden: boolean;
}