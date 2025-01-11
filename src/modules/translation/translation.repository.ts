import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TranslationEntity } from "./entity/translation.entity";
import { GenericRepository } from "common/resource/generic-repository";
import { Repository } from "typeorm";


@Injectable()
export class TranslateRepository extends GenericRepository<TranslationEntity> {
    constructor(
        @InjectRepository(TranslationEntity)
        private readonly translateRepo: Repository<TranslationEntity>,
    ) {
        super(translateRepo);
    }
}