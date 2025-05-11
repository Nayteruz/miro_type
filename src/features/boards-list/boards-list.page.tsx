import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/kit/select";
import { href, Link } from "react-router-dom";
import { useBoardsList } from "./use-boards-list";
import { useBoardsFilters, type BoardSortOption } from "./use-boards-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useCreateBoard } from "./use-create-board";
import { useDeleteBoard } from "./use-delete-board";
import { useUpdateFavorite } from "./use-update-favorite";
import { Switch } from "@/shared/ui/kit/switch";
import { useState } from "react";
import { BoardsListLayout, BoardsListLayoutHeader } from "./boards-list-layout";

function BoardsListPage() {
	const boardFilters = useBoardsFilters();
	const boardsQuery = useBoardsList({
		limit: 10,
		sort: boardFilters.sort,
		search: useDebouncedValue(boardFilters.search, 500),
	});
	const createBoard = useCreateBoard();
	const deleteBoard = useDeleteBoard();
	const updateFavorite = useUpdateFavorite();
	const [isFavorite, setIsFavorite] = useState<boolean | null>(null);

	return (
		<BoardsListLayout
			header={
				<BoardsListLayoutHeader
					title="Доски"
					description="Здесь вы можете просматривать и управлять своими досками"
					actions={
						<Button disabled={createBoard.isPending} onClick={createBoard.createBoard}>
							Создать доску
						</Button>
					}
				/>
			}
		>
			<div className="flex gap-4 items-center">
				<Input
					type="search"
					placeholder="Поиск по доскам..."
					value={boardFilters.search}
					onChange={(e) => boardFilters.setSearch(e.target.value)}
					className="max-w-xs"
				/>
				<Select
					value={boardFilters.sort}
					onValueChange={(value: string) => boardFilters.setSort(value as BoardSortOption)}
				>
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
					onValueChange={(value: string) => {
						setIsFavorite(value === "all" ? null : value === "favorite");
					}}
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
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{boardsQuery.boards.map((board) => (
					<Card key={board.id} className="relative">
						<div className="absolute top-2 right-2 flex items-center gap-2">
							<Switch
								checked={updateFavorite.isOptimisticFavorite(board)}
								onCheckedChange={() => updateFavorite.toggle(board)}
							/>
						</div>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Button asChild variant="link">
									<Link to={href(ROUTES.BOARD, { boardId: board.id })}>{board.name}</Link>
								</Button>
							</div>
							<div className="text-sm text-gray-500">Created: {new Date(board.createdAt).toLocaleDateString()}</div>
						</CardHeader>
						<CardFooter>
							<Button
								disabled={deleteBoard.getIsPending(board.id)}
								variant="destructive"
								onClick={() => deleteBoard.deleteBoard(board.id)}
							>
								Delete
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{boardsQuery.boards.length === 0 && !boardsQuery.isPending && (
				<div className="text-center py-4">Не найдено ни одной доски</div>
			)}

			{/* Infinite scroll trigger */}
			{boardsQuery.hasNextPage && (
				<div ref={boardsQuery.cursorRef} className="h-10">
					{boardsQuery.isFetchingNextPage && <div className="text-center py-4">Загрузка досок...</div>}
				</div>
			)}
		</BoardsListLayout>
	);
}

export const Component = BoardsListPage;
