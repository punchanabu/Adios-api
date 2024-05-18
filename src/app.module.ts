import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscordModule } from './discord/discord.module';
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
})
export class AppModule {}
