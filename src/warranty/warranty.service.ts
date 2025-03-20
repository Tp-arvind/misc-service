import { Body, Injectable, Query } from '@nestjs/common';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warranty } from './entities/warranty.entity';
import { User } from 'src/entities/user.entity';
import { TpTyreDealer } from 'src/entities/tyre_dealer.entity';
import { TpTyreDealerDetail } from 'src/entities/tyre_dealer_details.entity';
import { TpLocationCity } from 'src/entities/location_cities.entity';
import { getMetadataArgsStorage, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class WarrantyService {

  constructor(
    @InjectRepository(Warranty)
    private readonly warrantyRepository: Repository<Warranty>,
   ) { }

   async getData(
    condition: Record<string, any> = {},
    returnType: 'single' | '',
    fields: string[] = [],
    arrConditions: Record<string, any> = {},
    joins: Record<string, any> = [],
  ): Promise<any> {
    const query = this.warrantyRepository.createQueryBuilder('TWR');

    if (joins.includes('tp_users')) {
      query.leftJoin(User, 'U', 'U.user_id = TWR.user_id');
    }

    if (joins.includes('tp_tyre_dealers')) {
      query.leftJoin(TpTyreDealer, 'TD', 'TD.dealer_id = U.dealer_id');
    }
   
    if (joins.includes('tp_tyre_dealer_details')) {
      query.leftJoin(TpTyreDealerDetail, 'TDD', 'TD.dealer_id = TDD.dealer_id');
    }

    if (joins.includes('tp_location_cities')) {
      query.leftJoin(TpLocationCity, 'LC', 'LC.city_id = TD.city_id');
    }

    if (fields.length > 0) {
      query.select(fields);
    } else {
      query.select([
        'TWR.warranty_id as warranty_id', 
        'U.dealer_id as user_dealer_id', 
        'U.user_id as user_id', 
        'CONCAT(U.first_name, \' \', U.last_name) as user_name'
      ]);
    }

    this.applyFilters(query, condition);
  
    if (arrConditions['group_by']) {
      query.groupBy(arrConditions['group_by']);
    }
    
    if (arrConditions['order_by']) {
      const orderByParts = arrConditions['order_by'].split(' ');
      const column = orderByParts[0].trim();
      const direction = orderByParts[1]?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // Default to ASC if direction is missing
      query.orderBy(`${column}`, direction);
    } else {
      query.orderBy(`TWR.warranty_id`, 'DESC');
    }

    // Pagination Fix
    let totalRecords = 0;
    let pageNumber = 1;
    let pageSize = 10;

    if (arrConditions['limit']) {
      totalRecords = await query.getCount(); // Ensure total count before pagination

      if (condition.page) {
        pageNumber = Math.max(Number(condition.page), 1);
        pageSize = Math.min(Math.max(Number(arrConditions['limit']), 10), 100);
        query.limit(pageSize).offset((pageNumber - 1) * pageSize);
      } else {
        query.limit(arrConditions['limit']);
      }
    }
  
    // Debugging: Log SQL if debug flag is set
    if (arrConditions['debug']) {
      const [queryString, queryParams] = query.getQueryAndParameters();
      return this.formatQueryWithValues(queryString, queryParams);
    }
  
    const result = returnType === 'single' ? await query.getRawOne() : await query.getRawMany();

    return {
      totalRecords,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRecords / pageSize),
      pageSize,
      result
    };
  }
  
  private formatQueryWithValues(query: string, params: any[]): string {
    let formattedQuery = query;
    params.forEach((param, index) => {
      const formattedValue = typeof param === 'string' ? `'${param}'` : param;
      formattedQuery = formattedQuery.replace(`$${index + 1}`, formattedValue);
    });
    // Remove double quotes to make the query clean
    return formattedQuery.replace(/\"/g, '');
  }

  private applyFilters(query: SelectQueryBuilder<Warranty>, filters: Record<string, any>) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'id':
          case 'warranty_id':
            query.andWhere('TWR.warranty_id = :warranty_id', { warranty_id: value });
            break;
          case 'email':
            query.andWhere('TWR.email = :email', { email: value });
            break;
          case 'city_name':
            query.andWhere('TWR.city_name = :city_name', { city_name: value });
            break;
          case 'dealer_name':
            query.andWhere('TWR.dealer_name = :dealer_name', { dealer_name: value });
            break;
          case 'dealer_id':
            query.andWhere('TWR.dealer_id = :dealer_id', { dealer_id: value });
            break;
          case 'dealer_mobile_number':
            query.andWhere('TWR.dealer_mobile_number = :dealer_mobile_number', { dealer_mobile_number: value });
            break;
          case 'brand':
            query.andWhere('TWR.brand = :brand', { brand: value });
            break;
          case 'size':
            query.andWhere('TWR.size = :size', { size: value });
            break;
          case 'item_pattern':
            query.andWhere('TWR.item_pattern = :item_pattern', { item_pattern: value });
            break;
          case 'quantity':
            query.andWhere('TWR.quantity = :quantity', { quantity: value });
            break;
          case 'serial_number':
            query.andWhere('TWR.serial_number = :serial_number', { serial_number: value });
            break;
          case 'dot':
            query.andWhere('TWR.dot = :dot', { dot: value });
            break;
          case 'customer_name':
            query.andWhere('TWR.customer_name = :customer_name', { customer_name: value });
            break;
          case 'customer_mobile_number':
            query.andWhere('TWR.customer_mobile_number = :customer_mobile_number', { customer_mobile_number: value });
            break;
          case 'customer_email_id':
            query.andWhere('TWR.customer_email_id = :customer_email_id', { customer_email_id: value });
            break;
          case 'vehicle_number':
            query.andWhere('TWR.vehicle_number = :vehicle_number', { vehicle_number: value });
            break;
          case 'vehicle_name':
            query.andWhere('TWR.vehicle_name = :vehicle_name', { vehicle_name: value });
            break;
          case 'bill_photo':
            query.andWhere('TWR.bill_photo = :bill_photo', { bill_photo: value });
            break;
          case 'customer_address_proof':
            query.andWhere('TWR.customer_address_proof = :customer_address_proof', { customer_address_proof: value });
            break;
          case 'customer_area_pin_code':
            query.andWhere('TWR.customer_area_pin_code = :customer_area_pin_code', { customer_area_pin_code: value });
            break;
          case 'dealer_rm_name':
            query.andWhere('TWR.dealer_rm_name = :dealer_rm_name', { dealer_rm_name: value });
            break;
          case 'city_id':
            query.andWhere('TD.city_id = :city_id', { city_id: value });
            break;
          case 'warranty_status':
            query.andWhere('TWR.warranty_status = :warranty_status', { warranty_status: value });
            break;
          case 'date_from':
            query.andWhere('DATE(TWR.added) >= :date_from', { date_from: value });
            break;
          case 'date_to':
            query.andWhere('DATE(TWR.added) <= :date_to', { date_to: value });
            break;
        }
      }
    });
  }
  
  async dbUpdater(data: Record<string, any>, requestType, returnResult = false): Promise<any> {
    let result;
    let message = '';
    
    const conditions: Record<string, any> = {};
    if (['edit', 'update', 'delete'].includes(requestType) && data.warranty_id) {
      conditions.warranty_id = data.warranty_id;
    }

    // Prepare values for insert or update
    const fields = [
      'user_id', 'email', 'city_name', 'dealer_name', 'dealer_id', 'dealer_mobile_number', 'brand', 'size', 'item_pattern', 'quantity', 'serial_number', 'dot', 'customer_name', 'customer_mobile_number', 'customer_email_id', 'vehicle_number', 'vehicle_name', 'bill_photo', 'customer_address_proof', 'customer_area_pin_code', 'dealer_rm_name', 'warranty_status', 'remarks'
    ];
    
    const values: Record<string, any> = {};
    fields.forEach((field) => {
      if (data[field] !== undefined) values[field] = data[field];
    });

    try {
      if (requestType === 'add') {
        result = await this.warrantyRepository.insert(values);
        message = result.identifiers.length > 0 
          ? 'Tyre warranty registration has been added successfully'
          : 'No Changes Made';
      } 
      else if (requestType === 'edit') {
        result = await this.warrantyRepository.update(conditions, values);
        message = result.affected > 0 
          ? 'Tyre warranty registration has been updated successfully'
          : 'No Changes Made';
      } 
      else if (requestType === 'update' && data.field && data.value) {
        const updateData = { [data.field]: data.value };
        result = await this.warrantyRepository.update(conditions, updateData);
        message = result.affected > 0 
          ? 'Tyre warranty registration has been updated successfully'
          : 'No Changes Made';
      } 
      else if (requestType === 'delete') {
        result = await this.warrantyRepository.delete(conditions);
        message = result.affected > 0 
          ? 'Tyre warranty registration has been deleted successfully'
          : 'No Changes Made';
      }
    } catch (error) {
      console.error('Database Operation Failed:', error);
      return { status: 'error', message: 'Database operation failed' };
    }

    return returnResult ? result : { status: 'success', message };
  }

}
