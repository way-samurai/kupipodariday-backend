import { Entity, Column, OneToMany } from 'typeorm';
import { IsString, Length, IsUrl, IsNumber, IsInt } from 'class-validator';
import { MainEntity } from 'src/custom-entities/main.entity';
import { Offers } from 'src/offers/entities/offers.entity';

@Entity()
export class Wishes extends MainEntity {
  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  raised: number;

  @Column()
  @IsUrl()
  owner: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  @IsString()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offers, (offer) => offer.item)
  offers: Offers[];

  @Column({ default: 0 })
  @IsInt()
  copied: number;
}
