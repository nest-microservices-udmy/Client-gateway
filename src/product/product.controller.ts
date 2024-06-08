import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query   } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('product')
export class ProductController {
  constructor( 

    @Inject( PRODUCT_SERVICE) private readonly productClient: ClientProxy

    ) {}

  // ------------------  CREAR UN PRODUCTO DESDE CLIENT-GATEWAY -----------------------------

  @Post()
  createProduct(@Body() createProductDto:CreateProductDto){
    return this.productClient.send({ cmd: 'crear_producto'  }, createProductDto)
  };

  
  // ------------------  TRAER TODOS LOS PRODUCTOS DESDE CLIENT-GATEWAY -----------------------------

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productClient.send({cmd: ' traer_todos_los_productos'}, paginationDto)
  };


   // ------------------  TRAER UN PRODUCTO ID DESDE CLIENT-GATEWAY -----------------------------

  @Get(':id')
  findOne(@Param('id') id:string ){

    return this.productClient.send({ cmd: 'traer_producto_por_id' }, {id})
    .pipe(
      catchError( err => { throw new RpcException(err) } ) 
    )
  };


   // ------------------  ACTUALIZAR UN PRODUCTO ID DESDE CLIENT-GATEWAY -----------------------------

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productClient.send({ cmd: 'actualizar_producto' }, {id,...updateProductDto,} )
      .pipe(
        catchError((err) => { throw new RpcException(err) } ),
      );
    }


   // ------------------  ACTUALIZAR EL DISPONIBLE EN FALSE DE UN PRODUCTO DESDE CLIENT-GATEWAY -----------------------------

  @Delete(':id')
  deleteProduct(
    @Param('id') id: string ){

    return this.productClient.send({ cmd: 'actualizar_producto_disponiple' }, { id })
    .pipe(
      catchError( err => { throw new RpcException( err ) } ),
    )
  };
  
}
