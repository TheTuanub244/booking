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
exports.AmentitesService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const amentities_schema_1 = require('./amentities.schema');
const mongoose_2 = require('mongoose');
let AmentitesService = class AmentitesService {
  constructor(amentitiesSchema) {
    this.amentitiesSchema = amentitiesSchema;
  }
  async createAmentites(createAmentites) {
    const { amentity_name, property } = createAmentites;
    const existAmentity = await this.amentitiesSchema.findOne({
      amentity_name,
    });
    if (!existAmentity) {
      const newAmentity = new this.amentitiesSchema({
        amentity_name,
        property,
      });
      return newAmentity.save();
    }
    existAmentity.property.push(property);
    return existAmentity.save();
  }
};
exports.AmentitesService = AmentitesService;
exports.AmentitesService = AmentitesService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(amentities_schema_1.Amentites.name)),
    __metadata('design:paramtypes', [mongoose_2.Model]),
  ],
  AmentitesService,
);
//# sourceMappingURL=amentites.service.js.map
