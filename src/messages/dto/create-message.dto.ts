import { IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  discordId: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsString()
  channelId: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  createdAt: Date;
}
