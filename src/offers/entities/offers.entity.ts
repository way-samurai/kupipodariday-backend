import { Entity, Column, ManyToOne } from 'typeorm';
import { IsString, IsUrl, IsNumber } from 'class-validator';
import { MainEntity } from 'src/custom-entities/main.entity';

@Entity()
export class Offers extends MainEntity {
  @Column()
  @IsNumber()
  userId: number;

  // @ManyToOne(() => Users, (user) => user.offers)
  // user: Users;

  @Column()
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
