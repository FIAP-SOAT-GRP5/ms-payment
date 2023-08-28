import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Item } from 'src/domain/entities/item.entity';
import { ICreateItemUseCase } from 'src/domain/interfaces/Item/create-item.use-case.interface';
import { IGetItemUseCase } from 'src/domain/interfaces/Item/get-item.use-case.interface';
import { IUpdateItemUseCase } from '../../../../domain/interfaces/Item/update-item.use-case.interface';
import { CREATE_ITEM_USE_CASE, GET_ITEM_USE_CASE, UPDATE_ITEM_USE_CASE } from '../../../../domain/symbols/item.symbols';
import { CreateItemDto } from '../dtos/create-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
	constructor(
		@Inject(GET_ITEM_USE_CASE)
		private readonly getItemUseCase: IGetItemUseCase,
		@Inject(CREATE_ITEM_USE_CASE)
		private readonly createItemUseCase: ICreateItemUseCase,
		@Inject(UPDATE_ITEM_USE_CASE)
		private readonly updateItemUseCase: IUpdateItemUseCase,
	) {}

	@Get('/getItemBySnack')
	public async getItemBySnack(@Res() res: Response): Promise<void> {
		try {
			const item = await this.getItemUseCase.getItemBySnack();
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
			const item = await this.getItemUseCase.getItemByFollowUp();
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
			const item = await this.getItemUseCase.getItemByDrink();
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
			const item = await this.getItemUseCase.getItemByDessert();
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
			const item = await this.getItemUseCase.findById(id);
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
			const createItem = await this.createItemUseCase.createItem(item);
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
			const createItem = await this.updateItemUseCase.updateItem(id, item);
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
			const item = await this.getItemUseCase.findAll();
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
