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
exports.DestinationController = void 0;
const common_1 = require('@nestjs/common');
const destination_service_1 = require('./destination.service');
const createDestionation_dto_1 = require('./dto/createDestionation.dto');
const updateDestination_dto_1 = require('./dto/updateDestination.dto');
let DestinationController = class DestinationController {
  constructor(destinationService) {
    this.destinationService = destinationService;
  }
  createDestination(createDestinationDto) {
    return this.destinationService.create(createDestinationDto);
  }
  updateDestination(updateDestinationDto) {
    return this.destinationService.update(updateDestinationDto);
  }
  deleteDestination(id) {
    return this.destinationService.delete(id);
  }
};
exports.DestinationController = DestinationController;
__decorate(
  [
    (0, common_1.Post)('/create-destination'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      createDestionation_dto_1.CreateDestinationDto,
    ]),
    __metadata('design:returntype', void 0),
  ],
  DestinationController.prototype,
  'createDestination',
  null,
);
__decorate(
  [
    (0, common_1.Post)('/update-destination'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      updateDestination_dto_1.UpdateDestinationDto,
    ]),
    __metadata('design:returntype', void 0),
  ],
  DestinationController.prototype,
  'updateDestination',
  null,
);
__decorate(
  [
    (0, common_1.Post)('/delete-destination'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', void 0),
  ],
  DestinationController.prototype,
  'deleteDestination',
  null,
);
exports.DestinationController = DestinationController = __decorate(
  [
    (0, common_1.Controller)('destination'),
    __metadata('design:paramtypes', [destination_service_1.DestinationService]),
  ],
  DestinationController,
);
//# sourceMappingURL=destination.controller.js.map
