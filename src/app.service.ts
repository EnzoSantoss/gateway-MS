import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy, EventPattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('DATABASE') private readonly databaseClient: ClientProxy,
    @Inject('BACK_PRODUCT') private backProductClient: ClientGrpc,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  onModuleInit() {}

  async createMessage(data: any) {
    //this.rabbitClient.emit('save_message', data);

    this.amqpConnection.publish('minhaEx', 'pagamento', {
      data: data,
    });

    return 'message sent';
  }

  async messages() {
    //this.databaseClient.emit('receive_hook', {});

    const productService =
      this.backProductClient.getService<any>('ProductService');

    try {
      const response = await productService.GetProducts({}).toPromise();
      console.log('Resposta do microserviço:', response);
      return response;
    } catch (error) {
      console.error('Erro ao chamar GetProducts:', error);
      throw new Error('Erro ao obter produtos');
    }

    return 'ok';
  }

  // @EventPattern('get_messages')
  // async getMessages(data: any) {
  //   console.log(data);
  //   return 'ok';
  // }
}
