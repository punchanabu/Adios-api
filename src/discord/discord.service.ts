import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DiscordService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(message) {
    let imageUrl = null;
    if (message.attachments.size > 0) {
      message.attachments.forEach((attachment) => {
        imageUrl = attachment.url;
      });
    }

    try {
      await this.prisma.message.create({
        data: {
          discordId: message.id,
          content: message.content,
          author: message.author.tag,
          channelId: message.channelId,
          imageUrl: imageUrl,
          createdAt: message.createdAt,
        },
      });
      console.log(`message saved: ${message.id}`);
    } catch (error) {
      console.error('Error saving message', error);
    }
  }
}
