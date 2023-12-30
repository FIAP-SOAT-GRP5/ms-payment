type FindOptionsWhereProperty<PropertyToBeNarrowed, Property = PropertyToBeNarrowed> = PropertyToBeNarrowed extends Promise<infer I> ? FindOptionsWhereProperty<NonNullable<I>> : PropertyToBeNarrowed extends Array<infer I> ? FindOptionsWhereProperty<NonNullable<I>> : PropertyToBeNarrowed extends Function ? never : PropertyToBeNarrowed extends Buffer ? Property : PropertyToBeNarrowed extends Date ? Property : PropertyToBeNarrowed extends string ? Property : PropertyToBeNarrowed extends number ? Property : PropertyToBeNarrowed extends boolean ? Property : PropertyToBeNarrowed extends object ? FindOptionsWhere<Property> | FindOptionsWhere<Property>[] | boolean : Property;

type FindOptionsWhere<Entity> = {
	[P in keyof Entity]?: P extends "toString" ? unknown : FindOptionsWhereProperty<NonNullable<Entity[P]>>;
};

export type FindOptionsWhereValue<Entity> = FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>

export type EntityPartial<T> = T | (T extends Array<infer U> ? EntityPartial<U>[] : T extends Map<infer K, infer V> ? Map<EntityPartial<K>, EntityPartial<V>> : T extends Set<infer M> ? Set<EntityPartial<M>> : T extends object ? {
	[K in keyof T]?: EntityPartial<T[K]>;
} : T);