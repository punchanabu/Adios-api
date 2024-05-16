import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordGateway } from './discord.gateway';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DiscordService, DiscordGateway],
})
export class DiscordModule {}
