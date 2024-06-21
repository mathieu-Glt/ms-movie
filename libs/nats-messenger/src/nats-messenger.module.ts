import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { NatsMessengerService } from './nats-messenger.service'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO: set to true for PRODUCTION
    }),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
        },
      },
    ]),
  ],
  providers: [NatsMessengerService],
  exports: [NatsMessengerService],
})
export class NatsMessengerModule {}
