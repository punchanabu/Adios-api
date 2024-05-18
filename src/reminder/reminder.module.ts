import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReminderService } from './reminder.service';

@Module({
  imports: [ConfigModule],
  providers: [ReminderService],
})
export class ReminderModule {}
