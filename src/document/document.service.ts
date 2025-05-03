import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  findAll() {
    return this.documentRepository.find();
  }

  create(dto: CreateDocumentDto) {
    const doc = this.documentRepository.create(dto);
    return this.documentRepository.save(doc);
  }

  async update(id: number, dto: UpdateDocumentDto) {
    const doc = await this.documentRepository.findOneBy({ id });
    if (!doc) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
    Object.assign(doc, dto);
    return this.documentRepository.save(doc);
  }

  async delete(id: number) {
    const doc = await this.documentRepository.findOneBy({ id });
    if (!doc) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }
    await this.documentRepository.softRemove(doc);
    return { message: 'Document soft deleted successfully' };
  }
}
