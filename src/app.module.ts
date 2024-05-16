import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscordModule } from './discord/discord.module';
import { MessagesController } from './messages/messages.controller';
import { MembersController } from './members/members.controller';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, DiscordModule],
  controllers: [MessagesController, MembersController],
})
export class AppModule {}
