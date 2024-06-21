// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './Movie/app.module';
// import { Transport } from '@nestjs/microservices';
// import * as dotenv from 'dotenv';
// dotenv.config();
// async function bootstrap() {
//   const natsDNS = process.env.NATS_DNS || 'localhost'; // Valeur par défaut
//   const natsPort = process.env.NATS_PORT || '4222'; // Valeur par défaut
//    // Ajoutez des logs pour vérifier les valeurs des variables d'environnement
//    console.log('NATS_DNS:', natsDNS);
//    console.log('NATS_PORT:', natsPort);
 
//    // Vérifiez si les variables d'environnement sont définies
//    if (!natsDNS || !natsPort) {
//      throw new Error('NATS_DNS or NATS_PORT is not defined');
//    }
 
//   const app = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.NATS,
//     options: {
//       servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
//       queue: 'ms-movie',
//     },
//   });
//   await app.listen();
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './Movie/app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

console.log('Chargement des variables d\'environnement depuis .env');
dotenv.config();
console.log('Variables d\'environnement chargées:', process.env);

async function bootstrap() {
  const natsDNS = process.env.NATS_DNS || '127.0.0.1';
  const natsPort = process.env.NATS_PORT || '4222';

  console.log('NATS_DNS:', natsDNS);
  console.log('NATS_PORT:', natsPort);

  if (!natsDNS || !natsPort) {
    throw new Error('NATS_DNS or NATS_PORT is not defined');
  }

  const servers = `nats://${natsDNS}:${natsPort}`;
  console.log('Tentative de connexion au serveur NATS:', servers);

  try {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.NATS,
      options: {
        servers: [servers],
        queue: 'ms-movie',
      },
    });

    await app.listen();
    console.log('Microservice is listening');
  } catch (err) {
    console.error('Error starting microservice:', err);
  }
}

console.log('Appel de la fonction bootstrap');
bootstrap();