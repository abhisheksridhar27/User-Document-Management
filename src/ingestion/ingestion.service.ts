import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
  private ingestionStatus = new Map<number, string>();
  private currentId = 1;

  triggerIngestion() {
    const id = this.currentId++;
    this.ingestionStatus.set(id, 'processing');

    setTimeout(() => this.ingestionStatus.set(id, 'completed'), 5000);
    return { id, status: 'processing' };
  }

  getStatus(id: number) {
    const status = this.ingestionStatus.get(id);
    if (!status) return { status: 'not found' };
    return { id, status };
  }
}
