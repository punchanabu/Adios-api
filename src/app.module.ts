import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscordModule } from './discord/discord.module';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/message.module';
import { MemberModule } from './members/member.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    DiscordModule,
    MessagesModule,
    MemberModule,
  ],
  controllers: [MessagesController],
})
export class AppModule {}
