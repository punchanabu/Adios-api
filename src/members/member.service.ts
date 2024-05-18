import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MemberService {
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

  async getMembers() {
    try {
      const guildId = this.configService.get<string>('GUILD_ID');
      const guild = await this.client.guilds.fetch(guildId);
      const member = await guild.members.fetch();

      return member.map((member) => ({
        id: member.user.id,
        username: member.user.username,
        discriminator: member.user.discriminator,
        avatar: member.user.avatar,
        bot: member.user.bot,
        joinedAt: member.joinedAt,
      }));
    } catch (error) {
      console.error('Failed to fetch members:', error);
      throw new Error('Failed to fetch members');
    }
  }
}
