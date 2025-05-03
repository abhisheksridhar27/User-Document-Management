import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseWrapper } from 'src/common/dto/response-wrapper.dto';

@Controller('ingestion')
@UseGuards(JwtAuthGuard)
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post('trigger')
  async trigger() {
    const ingestion = await this.ingestionService.triggerIngestion();
    return new ResponseWrapper(201, 'Ingestion Triggered successfully', ingestion);
  }

  @Get('status/:id')
  async status(@Param('id') id: number) {
    const ingestion = await this.ingestionService.getStatus(id);
    return new ResponseWrapper(200, 'Ingestion Status fetched successfully', ingestion);
  }
}
