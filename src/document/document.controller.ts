import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, UploadedFile, UseGuards, Patch, Res } from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { ResponseWrapper } from 'src/common/dto/response-wrapper.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { diskStorage } from 'multer';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  async findAll() {
    const documents = await this.documentService.findAll();
    return new ResponseWrapper(200, 'Documents fetched successfully', documents);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    }),
  }))
  async uploadFile(@UploadedFile() file, @Body('title') title: string) {
    const dto = { title, path: file.path };
    const document = await this.documentService.create(dto);
    return new ResponseWrapper(201, 'Document uploaded successfully', document);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    }),
  }))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ) {
    const dto: UpdateDocumentDto = { title };
    if (file) {
      dto.path = file.path;
    }
    const document = await this.documentService.update(id, dto);
    return new ResponseWrapper(200, 'Document updated successfully', document);
  }
  
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const document = await this.documentService.delete(id);
    return new ResponseWrapper(200, 'Document deleted successfully', document);
  }
}
