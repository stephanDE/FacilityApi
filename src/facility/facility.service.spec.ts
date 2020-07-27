import { Test, TestingModule } from '@nestjs/testing';
import { FacilityService } from './facility.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UniversityService', () => {
  let service: FacilityService;

  function mockUniversityModel(dto: any) {
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
          useValue: mockUniversityModel,
        },
      ],
    }).compile();

    service = module.get<FacilityService>(FacilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
