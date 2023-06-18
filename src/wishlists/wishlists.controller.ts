import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistsService } from './wishlists.service';
import { User } from 'src/users/entities/user.entity';
import { WishList } from './entities/wishlist.entity';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishListService: WishlistsService) {}

  @Get()
  getWishlists(): Promise<WishList[]> {
    return this.wishListService.getWishLists();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<WishList> {
    return this.wishListService.getById(+id);
  }

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Req() req: Request & { user: User },
  ): Promise<WishList> {
    return this.wishListService.create(createWishlistDto, req.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: User },
  ): Promise<WishList> {
    return this.wishListService.delete(+id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: Request & { user: User },
  ): Promise<WishList> {
    return this.wishListService.update(+id, updateWishlistDto, req.user.id);
  }
}
