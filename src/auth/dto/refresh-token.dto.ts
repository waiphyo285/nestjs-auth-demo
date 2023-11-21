import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @IsOptional()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refresh_token: string;
}
