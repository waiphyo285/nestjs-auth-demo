import { Post } from '@prisma/client';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { ROLES } from 'src/utilities/constant';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: any): Promise<Post[]> {
    const filter: any = {};
    const { organization_id, role } = query._user;

    if (organization_id && role === ROLES.user) {
      filter.user = {
        organization: {
          id: organization_id,
        },
      };
    }

    return await this.prisma.post.findMany({
      where: filter,
    });
  }

  async getOneById(id: string, query: any): Promise<Post> {
    const filter = await this.hasExitedRecord(id, query._user);
    return await this.prisma.post.findUnique({
      where: filter,
    });
  }

  async create(post: CreatePostDto): Promise<Post> {
    return await this.prisma.post.create({ data: post });
  }

  async update(id: string, post: UpdatePostDto, query: any): Promise<Post> {
    const filter = await this.hasExitedRecord(id, query._user);
    return await this.prisma.post.update({
      where: filter,
      data: post,
    });
  }

  async delete(id: string, query: any): Promise<Post> {
    const filter = await this.hasExitedRecord(id, query._user);
    return await this.prisma.post.delete({ where: filter });
  }

  // Ensure that the user initiating the request is the rightful.
  async hasExitedRecord(id: string, user: any) {
    const filter: any = { id: id };
    const { sub: user_id, role } = user;

    if (role === ROLES.user) filter.user_id = user_id;

    const exitedRecord = await this.prisma.post.findUnique({
      where: filter,
    });

    if (!exitedRecord) throw new ForbiddenException();

    return filter;
  }
}
