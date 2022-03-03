import { Test, TestingModule } from '@nestjs/testing';
import { PoliceOfficeController } from './police-office.controller';
import { PoliceOfficeService } from './police-office.service';

describe('PoliceOfficeController', () => {
  let controller: PoliceOfficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliceOfficeController],
      providers: [PoliceOfficeService],
    }).compile();

    controller = module.get<PoliceOfficeController>(PoliceOfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
