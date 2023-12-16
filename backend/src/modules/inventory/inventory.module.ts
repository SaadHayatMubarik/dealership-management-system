import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
// import { Inventory } from './entities/Inventory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Inventory } from './entity/Inventory';
import { Showroom } from '../showroom/entity/Showroom';
import { VehicleType } from '../vehicle-type/entity/Vehicle-type';
import { StockAttributeValue } from '../stock-attribute-value/entity/Stock-attribute-value';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
// import { Showroom } from '../showroom/entity/Showroom';
// import { VehicleType } from '../vehicle-type/Vehicle-type';
// import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';
@Module({
  imports: [TypeOrmModule.forFeature([Inventory,Showroom,VehicleType,StockAttributeValue,MultiValueAttribute])],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
