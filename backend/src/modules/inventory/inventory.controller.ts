import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './dto/inventory.dto';
import { Inventory } from './entity/Inventory';
import { GetInventroyDto } from './dto/getInventory.dto';
import { GetInventoryByFilterDto } from './dto/getInventoryByFilter.dto';
import { AuthGuard } from '@nestjs/passport';
import { InventoryStatus } from './inventory-status.enum';
import { UpdateInventoryDto } from './dto/updateInventory.dto';


@Controller('inventory')
// @UseGuards(AuthGuard())
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post('addInventory')
    addInventory(@Body() addInventoryDto: InventoryDto): Promise<Inventory> {
        // console.log(addInventoryDto);
        return this.inventoryService.addInventory(addInventoryDto);
    }
    @Get('getInventoryDetails/:inventoryId')
    getInventoryDetail(@Param('inventoryId') inventoryId: number): Promise<Inventory>{
        // console.log("inventoryId: " + inventoryId);
        return this.inventoryService.getInventoryDetails(inventoryId);
    }

    @Get('getInventory/:showroomId/:status')
    getInventory(@Param('showroomId') showroomId: number,@Param('status') status: String): Promise<GetInventroyDto[]>{
        // console.log(status,showroomId); 
        return this.inventoryService.getInventory(status, showroomId);
    }

    @Get('getMarketInventory/:showroomId/:status')
    getMarketInventory(@Param('showroomId') showroomId:number, @Param('status') status: InventoryStatus): Promise <GetInventroyDto[]>{
        // console.log(getInventoryByFilterDto);
        // console.log(showroomId,status)
        return this.inventoryService.getMarketInventory(showroomId, status);
    }

    @Delete('/:inventoryId')
    @UsePipes(new ValidationPipe())
    deleteInventory(@Param('inventoryId') inventoryId: number){
        return this.inventoryService.deleteInventory(inventoryId);
    }

    @Put('updateInventory/sellInventory')
    updateInventory(@Body() updateInventoryDto: UpdateInventoryDto){
        console.log(updateInventoryDto);
        return this.inventoryService.updateInventory(updateInventoryDto);
    }
}
