import { Injectable } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async create(tagData: Omit<TagEntity, 'id'>): Promise<TagEntity> {
    const newTag = this.tagRepository.create(tagData);
    return this.tagRepository.save(newTag);
  }

  async update(id: number, updateData: Partial<TagEntity>): Promise<TagEntity> {
    await this.tagRepository.update(id, updateData);
    return this.tagRepository.findOneBy({ id }) as Promise<TagEntity>;
  }
  async delete(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }
}
