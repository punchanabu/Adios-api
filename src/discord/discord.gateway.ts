import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits, Message } from 'discord.js';
import { DiscordService } from './discord.service';

@Injectable()
export class DiscordGateway implements OnModuleInit {
  private client: Client;

  constructor(private readonly discordService: DiscordService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }

  async onModuleInit() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });

    this.client.on('messageCreate', async (message: Message) => {
      if (message.content.startsWith('!fetchHistory')) {
        const args = message.content.split(' ');
        const limit = parseInt(args[1]) || 1000;

        try {
          let lastId: string | undefined;
          let fetchedCount = 0;
          while (fetchedCount < limit) {
            const options = {
              limit: Math.min(100, limit - fetchedCount),
              ...(lastId && { before: lastId }),
            };
            const messages = await message.channel.messages.fetch(options);

            if (messages.size === 0) {
              console.log('There is no message to fetch');
              break;
            }

            for (const msg of messages.values()) {
              await this.discordService.saveMessage(msg);
            }

            lastId = messages.last().id;
            fetchedCount += messages.size;
          }
        } catch (error) {
          console.error('Failed to fetch messages:', error);
          message.channel.send('Error fetching message!!!');
        }
      }
    });

    this.client.login(process.env.TOKEN);
  }
}
