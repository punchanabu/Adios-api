import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { DiscordModule } from './discord/discord.module';
import { MessagesModule } from './messages/message.module';
import { MemberModule } from './members/member.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    PrismaModule,
    ReminderModule,
    DiscordModule,
    MessagesModule,
    MemberModule,
  ],
})
export class AppModule {}
