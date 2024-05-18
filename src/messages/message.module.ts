import { Module } from '@nestjs/common';
import { MessagesService } from './message.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
})
export class MessagesModule {}
