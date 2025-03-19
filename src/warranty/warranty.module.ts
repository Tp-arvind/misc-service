import { Module } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { WarrantyController } from './warranty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from './entities/warranty.entity';
import { User } from 'src/entities/user.entity';
import { TpTyreDealer } from 'src/entities/tyre_dealer.entity';
import { TpTyreDealerDetail } from 'src/entities/tyre_dealer_details.entity';
import { TpLocationCity } from 'src/entities/location_cities.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Warranty, User, TpTyreDealer, TpTyreDealerDetail, TpLocationCity])
  ],
  controllers: [WarrantyController],
  providers: [WarrantyService],
})
export class WarrantyModule {}
