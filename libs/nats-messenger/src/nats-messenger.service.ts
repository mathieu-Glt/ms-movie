import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { connect, ErrorCode, JSONCodec, NatsConnection, StringCodec } from 'nats'; 
import { v4 as uuidv4 } from 'uuid';
import { Client } from '@nestjs/microservices/external/nats-client.interface';
@Injectable()
export class NatsMessengerService {
  private client: NatsConnection | null = null;  
  
  constructor(
    @Inject('NATS_SERVICE')
    private readonly nats: ClientProxy,
  ) {}
  
  // send : envoi avec une réponse en retour
  async send(cmd: string, payload: any): Promise<any> {
    try {
      console.log('send', cmd, payload);
      return await firstValueFrom(this.nats.send(cmd, payload));
    } catch (error) {
      console.log('error', error);
    }
  }

  // emit : envoi sans réponse en retour
  async emit(cmd: string, payload: any): Promise<any> {
    try {
      this.nats.emit(cmd, payload);
      console.log('====================================');
      console.log(' natsmessenger.service - emit', cmd, payload);
      console.log('====================================');
    } catch (error) {
      console.log('error', error);
    }
  }

  // async send(command: string, data: any): Promise<any> {
  //   console.log("🚀 ~ NatsService ~ send ~ data:", data)

  //   try {
  //     const connection = await this.__startServiceNats();
  //     const payload = this.setPayload(data);
  //     console.log("🚀 ~ NatsService ~ send ~ payload:", payload)
  //     const codec = JSONCodec()
  //     const message = await connection.request(
  //       command,
  //       codec.encode(payload),
  //       { noMux: true, timeout: 3000 }
  //     );
  //     const response: any = codec.decode(message.data);
  //     console.log("🚀 ~ NatsService ~ send ~ response:", response)

  //     return response;
  //   } catch (error) { 
  //       switch (error.code) {
  //           case ErrorCode.NoResponders:
  //             console.log(`no one is listening to ${data}`);
  //           break;
  //           case ErrorCode.Timeout:
  //             console.log("someone is listening but didn't respond");
  //             break;
  //           case ErrorCode.ApiError:
  //               console.log("error of api");
  //               break;
  //           case ErrorCode.BadJson:
  //               console.log("error json");
  //               break;
  //           case ErrorCode.BadPayload:
  //               console.log("error payload");
  
        
  //         default:
  //           break;
  //       }
  //           // console.error('Error in NATS request:', error.message);
  //           // return  error.message
  //       }
  //   }



  setPayload(data: any) {
    return {
      id: uuidv4(),
      body: data,
    };
  }


// private async __startServiceNats(): Promise<NatsConnection> {
//     try {
//         return await connect({
//     servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
//         });
//     } catch (error: any) {
//         console.log("🚀 ~ NatsService ~ __startServiceNats ~ error:", error)
//         throw new Error(`MESSAGING-ERROR: ${error.message}`);
        
//     }
// }

  async __startServiceNats(
    options?: import('nats').ConnectionOptions,
  ): Promise<NatsConnection> {
  if (!this.client) {
    this.client = await connect(options);
  }
  return this.client;
}


}
