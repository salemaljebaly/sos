import { Test, TestingModule } from '@nestjs/testing';
import { PoliceOfficeService } from './police-office.service';

describe('PoliceOfficeService', () => {
  let service: PoliceOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliceOfficeService],
    }).compile();

    service = module.get<PoliceOfficeService>(PoliceOfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
