import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ROLES } from 'src/utilities/constant';
import { Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { ResponseMessage } from 'src/config/handlers/response-message';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('posts')
@ApiTags('Post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetAllByFilter(@Query() query: any) {
    return this.postService.getAll(query);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetOne(@Param('id') id: string, @Query() query: any) {
    return this.postService.getOneById(id, query);
  }

  @Post()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('New post has been successfully created.')
  async create(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('Post has been successfully updated.')
  async update(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
    @Query() query: any,
  ) {
    return this.postService.update(id, post, query);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Post has been permanently deleted.')
  async delete(@Param('id') id: string, @Query() query: any) {
    return this.postService.delete(id, query);
  }
}
