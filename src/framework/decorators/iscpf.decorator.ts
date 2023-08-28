import { registerDecorator } from 'class-validator';
import { verifyCpf } from '../../domain/utils/document';

export const IsCpf = () => {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isCpf',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: {
				message: 'CPF inválido',
			},
			validator: {
				validate(value: unknown) {
					if (typeof value === 'undefined' || value === null) return true;
					if (typeof value !== 'string') return false;
					return verifyCpf(value);
				},
			},
		});
	};
};
