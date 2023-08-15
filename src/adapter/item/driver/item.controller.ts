import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Res,
	Put,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Item } from 'src/core/domain/item.entity';
import { GET_ITEM_SERVICE, PERSISTENCE_ITEM_SERVICE } from '../item.symbols';
import { IGetItemService } from 'src/core/applications/interfaces/Item/get-item.service.interface';
import { IPersistenceItemService } from 'src/core/applications/interfaces/Item/persistence-item.service.interface';
import { CreateItemDto } from '../dtos/create-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
	constructor(
		@Inject(GET_ITEM_SERVICE)
		private readonly getItemService: IGetItemService,
		@Inject(PERSISTENCE_ITEM_SERVICE)
		private readonly persistenceItemService: IPersistenceItemService
	) {}

	@Get('/getItemBySnack')
	public async getItemBySnack(@Res() res: Response): Promise<void> {
		try {
			const item = await this.getItemService.getItemBySnack();
			if (!item) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: item });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('/getItemByFollowUp')
	public async getItemByFollowUp(@Res() res: Response): Promise<void> {
		try {
			const item = await this.getItemService.getItemByFollowUp();
			if (!item) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: item });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('/getItemByDrink')
	public async getItemByDrink(@Res() res: Response): Promise<void> {
		try {
			const item = await this.getItemService.getItemByDrink();
			if (!item) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: item });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('/getItemByDessert')
	public async getItemByDessert(@Res() res: Response): Promise<void> {
		try {
			const item = await this.getItemService.getItemByDessert();
			if (!item) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: item });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get('/:id')
	public async findById(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number
	): Promise<void> {
		try {
			const item = await this.getItemService.findById(id);
			if (!item) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: item });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Post()
	@ApiBody({ type: Item })
	public async createItem(
		@Res() res: Response,
		@Body() item: CreateItemDto
	): Promise<void> {
		try {
			const createItem = await this.persistenceItemService.createItem(item);
			if (!createItem) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: createItem });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Put(':id')
	public async updateItem(
		@Res() res: Response,
		@Param('id', ParseIntPipe) id: number,
		@Body() item: UpdateItemDto
	): Promise<void> {
		try {
			const createItem = await this.persistenceItemService.updateItem(id, item);
			if (!createItem) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: createItem });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	@Get()
	public async findAll(@Res() res: Response): Promise<void> {
		try {
			const item = await this.getItemService.findAll();
			if (!item) {
				res.status(404).send('Items not found');
			} else {
				res.status(200).send({ item: item });
			}
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
