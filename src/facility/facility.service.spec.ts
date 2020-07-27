import { Test, TestingModule } from '@nestjs/testing';
import { FacilityService } from './facility.service';
import { getModelToken } from '@nestjs/mongoose';

describe('FacilityService', () => {
  let service: FacilityService;

  function mockFacilityModel(dto: any) {
    this.data = dto;

    this.save = () => {
      return this.data;
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacilityService,
        {
          provide: getModelToken('Facilities'),
          useValue: mockFacilityModel,
        },
      ],
    }).compile();

    service = module.get<FacilityService>(FacilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
