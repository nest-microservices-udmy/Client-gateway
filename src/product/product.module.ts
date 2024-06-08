import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport} from '@nestjs/microservices'
import { PRODUCT_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ProductController],
  providers:[],
  imports:[

    ClientsModule.register([
      { 
        name: PRODUCT_SERVICE, 
        transport: Transport.TCP,
        options:{
          host: envs.productMicroserviceHost,
          port: envs.productMicroservicePort
          
        } 
      },
    ]),
  ]
})
export class ProductModule {}
