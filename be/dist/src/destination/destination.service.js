'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DestinationService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const destination_schema_1 = require('./destination.schema');
const mongoose_2 = require('mongoose');
let DestinationService = class DestinationService {
  constructor(destinationSchema) {
    this.destinationSchema = destinationSchema;
  }
  async create(destination) {
    const existingPro = await this.destinationSchema.findOne({
      province: destination.province,
    });
    if (existingPro) {
      const existingCity = await this.destinationSchema.findOne({
        city: destination.city,
      });
      if (existingCity) {
        throw new common_1.ConflictException('Destination already exists');
      }
    }
    const newDestination = new this.destinationSchema(destination);
    return newDestination.save();
  }
  async update(destination) {
    if (
      destination.id === null ||
      destination.id === undefined ||
      destination.id === ''
    ) {
      throw new common_1.BadRequestException('Invalid ID to update');
    }
    const updateData = {};
    Object.keys(destination).forEach((key) => {
      const value = destination[key];
      if (value !== null && value !== undefined && value !== '') {
        updateData[key] = value;
      }
    });
    if (Object.keys(updateData).length == 0) {
      throw new common_1.BadRequestException('No valid fields to update');
    }
    const updatedDes = await this.destinationSchema.updateOne(
      { _id: destination.id },
      { $set: updateData },
    );
    return updatedDes;
  }
  async delete(id) {
    const objectId = new mongoose_2.Types.ObjectId(id);
    const existingId = await this.destinationSchema.findById(objectId);
    if (!existingId) {
      throw new common_1.BadRequestException('Invalid ID');
    }
    const deletedDes = await this.destinationSchema.deleteOne({
      _id: objectId,
    });
    return deletedDes;
  }
};
exports.DestinationService = DestinationService;
exports.DestinationService = DestinationService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(
      0,
      (0, mongoose_1.InjectModel)(destination_schema_1.Destination.name),
    ),
    __metadata('design:paramtypes', [mongoose_2.Model]),
  ],
  DestinationService,
);
//# sourceMappingURL=destination.service.js.map
