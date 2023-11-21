import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/config/handlers/response-message';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

import { AuthService } from './auth.service';
import { UserSignUpDto } from '../auth/dto/user-sign-up.dto';
import { UserSignInDto } from '../auth/dto/user-sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  @ResponseMessage('Successfully signed up.')
  signup(@Body() createUserDto: UserSignUpDto) {
    return this.authService.UserSignUp(createUserDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  @ResponseMessage('Successfully signed in.')
  signin(@Body() data: UserSignInDto) {
    return this.authService.UserSignIn(data);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth('JWT-auth')
  refreshTokens(@Query() refreshToken: RefreshTokenDto) {
    return this.authService.refreshToken(refreshToken);
  }
}
