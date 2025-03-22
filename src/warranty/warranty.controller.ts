import { Body, Controller, HttpException, HttpStatus, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { writeFile } from 'fs/promises';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname,join} from 'path';
import { FastifyRequest } from 'fastify';
import { createWriteStream, mkdirSync } from 'fs';


@Controller()
export class WarrantyController {
  constructor(private readonly warrantyService: WarrantyService) {}

  @MessagePattern('getWarranty')
  async getWarranty(@Body() request: any) {

    try {
      const conditions = request;
      const fields = [
        'DISTINCT(TWR.warranty_id) as warranty_id', 
        'U.dealer_id as user_dealer_id', 
        'U.user_id as user_id', 
        'CONCAT(U.first_name, \' \', U.last_name) as user_name',
      ];
      const limit = request.limit || 10;
      const arrConditions = {'debug': false, 'order_by': 'TWR.warranty_id DESC', 'limit': limit};
      const joins = ['tp_users', 'tp_tyre_dealers', 'tp_tyre_dealer_details', 'tp_location_cities'];
      
      const data = await this.warrantyService.getData(conditions, '', fields, arrConditions, joins);
      if (arrConditions['debug']) { return data;} // to print query if debug is true

      if (Array.isArray(data) && data.length === 0) {
        throw new HttpException(
          { data: { status: false, message: 'No Warranty found.' } },
          HttpStatus.NOT_FOUND
        );
      }

      const response = {
        data: {
          status: true,
          message: 'Warranty retrieved successfully',
          warranty: Array.isArray(data) ? data : data.result,
          ...(data.totalRecords && {
            total_records: data.totalRecords,
            pageno: data.currentPage,
            total_pages: data.totalPages,
            pageSize: data.pageSize
          })
        }
      };

      return response;

    } catch (error) {
      console.error("Controller Error:", error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        { data: { status: false, message: 'Something went wrong' } },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
    
  /*@MessagePattern('saveWarranty')
  async saveWarranty(@Body() request: any) {
    console.log(request);
    try {
      const files = [];

      let part;
      while ((part = await req.file()) !== undefined) {
        if (part.file) {
          // Read file as Buffer
          const fileBuffer = await part.toBuffer();
          
          files.push({
            originalname: part.filename,
            mimetype: part.mimetype,
            size: fileBuffer.length,
            buffer: fileBuffer.toString('base64'), // Convert to Base64
          });
        } 
      }

      const payload = { ...bodyParams, files };
      console.log('make Body:', payload);

      // Send to Misc Service via Kafka
      return this.miscService.saveWarranty(payload);
    } catch (error) {
      console.error('Error while processing files:', error);
      throw error;
    }
  }*/

}
