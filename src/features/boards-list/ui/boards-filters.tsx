import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";

interface BoardsFiltersProps {
	sort: string;
	onSortChange: (value: string) => void;
	isFavorite: boolean | null;
	onFavoriteChange: (value: string) => void;
}

export function BoardsFilters({ sort, onSortChange, isFavorite, onFavoriteChange }: BoardsFiltersProps) {
	return (
		<>
			<Select value={sort} onValueChange={(value: string) => onSortChange(value)}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Сортировать по" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="createdAt">По дате создания</SelectItem>
					<SelectItem value="updatedAt">По дате обновления</SelectItem>
					<SelectItem value="lastOpenedAt">Последняя открытая</SelectItem>
					<SelectItem value="name">По имени</SelectItem>
				</SelectContent>
			</Select>
			<Select
				value={isFavorite === null ? "all" : isFavorite ? "favorite" : "not-favorite"}
				onValueChange={onFavoriteChange}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Поиск по избранным" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Все доски</SelectItem>
					<SelectItem value="favorite">Избранные</SelectItem>
					<SelectItem value="not-favorite">Не избранные</SelectItem>
				</SelectContent>
			</Select>
		</>
	);
}
