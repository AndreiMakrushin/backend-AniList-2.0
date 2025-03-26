import { Controller, Delete, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';

interface Tag {
  id: number;
  name: string;
}

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  async findAll(): Promise<{ tags: Tag[] }> {
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map((tag) => {
        return {
          id: tag.id,
          name: tag.name,
        };
      }),
    };
  }

  @Post()
  async create() {
    return await this.tagService.create({ name: 'test' });
  }
  async update() {
    return await this.tagService.update(1, { name: 'test' });
  }

  @Delete()
  async delete() {
    return await this.tagService.delete(1);
  }
}
