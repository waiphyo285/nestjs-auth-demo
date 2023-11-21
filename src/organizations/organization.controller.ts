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
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ResponseMessage } from 'src/config/handlers/response-message';

import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organizations')
@ApiTags('Organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  @Roles(ROLES.super, ROLES.admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetAllByFilter(@Query() query: any) {
    return this.organizationService.getAll(query);
  }

  @Get(':id')
  @Roles(ROLES.super, ROLES.admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetOne(@Param('id') id: string) {
    return this.organizationService.getOneById(id);
  }

  @Post()
  @Roles(ROLES.super, ROLES.admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('New organization has been successfully created.')
  async create(@Body() organization: CreateOrganizationDto) {
    return this.organizationService.create(organization);
  }

  @Patch(':id')
  @Roles(ROLES.super, ROLES.admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('Organization has been successfully updated.')
  async update(
    @Param('id') id: string,
    @Body() organization: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, organization);
  }

  @Delete(':id')
  @Roles(ROLES.super, ROLES.admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Organization has been permanently deleted.')
  async delete(@Param('id') id: string) {
    return this.organizationService.delete(id);
  }
}
