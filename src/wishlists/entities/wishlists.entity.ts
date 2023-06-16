import { Entity, Column } from 'typeorm';
import { IsString, Length, IsUrl } from 'class-validator';
import { MainEntity } from 'src/custom-entities/main.entity';

@Entity()
export class Wishlists extends MainEntity {
  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @Column({
    type: 'varchar',
    length: 1500,
    nullable: true,
  })
  @IsString()
  description: string;

  @Column({
    nullable: true,
  })
  @IsUrl()
  image: string;

  // @Column('simple-array', { nullable: true })
  // @IsUrl({}, { each: true })
  // items: string[];
}
