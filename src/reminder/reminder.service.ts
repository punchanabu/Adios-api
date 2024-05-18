import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Client, GatewayIntentBits } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReminderService {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
    this.client.login(this.configService.get<string>('TOKEN'));
  }

  @Cron('0 23 * * *', {
    timeZone: 'Asia/Bangkok', // Set timezone to Thailand
  })
  async handleCron() {
    const userIds = [
      '388318578778177536',
      '348647123861897217',
      '431321237956984843',
    ];
    const guildId = this.configService.get<string>('GUILD_ID');

    for (const userId of userIds) {
      try {
        const guild = await this.client.guilds.fetch(guildId);
        const user = await guild.members.fetch(userId);

        await user.send("It's currently 23:00 time for adios! ❤️");
        console.log(`Reminder sent to user: ${userId}`);
      } catch (error) {
        console.error(`Error sending reminder to user ${userId}`, error);
      }
    }
  }
}
