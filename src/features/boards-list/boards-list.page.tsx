import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters, type BoardSortOption } from "./model/use-boards-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useCreateBoard } from "./model/use-create-board";
import { useState } from "react";
import {
	BoardsListLayout,
	BoardsListLayoutFilters,
	BoardsListLayoutHeader,
	BoardsListLayoutContent,
	BoardsListListLayout,
	BoardsListCardLayout,
} from "./ui/boards-list-layout";
import { ViewMode, ViewModeToggle, type IViewMode } from "./ui/view-mode-toggle";
import { BoardsFilters } from "./ui/boards-filters";
import { BoardsSearch } from "./ui/boards-search";
import { PlusIcon } from "lucide-react";
import { BoardListCard } from "./ui/board-list-card";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";

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
	const [viewMode, setViewMode] = useState<IViewMode>(ViewMode.GRID);

	return (
		<BoardsListLayout
			header={
				<BoardsListLayoutHeader
					title="Доски"
					description="Здесь вы можете просматривать и управлять своими досками"
					actions={
						<Button disabled={createBoard.isPending} onClick={createBoard.createBoard}>
							<PlusIcon /> Создать доску
						</Button>
					}
				/>
			}
			filters={
				<BoardsListLayoutFilters
					sort={
						<BoardsFilters
							sort={boardFilters.sort}
							onSortChange={(value) => boardFilters.setSort(value as BoardSortOption)}
							isFavorite={isFavorite}
							onFavoriteChange={(value) => setIsFavorite(value === "all" ? null : value === "favorite")}
						/>
					}
					filters={<BoardsSearch value={boardFilters.search} onChange={boardFilters.setSearch} />}
					actions={<ViewModeToggle value={viewMode} onChange={setViewMode} />}
				/>
			}
		>
			<BoardsListLayoutContent
				isEmpty={boardsQuery.boards.length === 0}
				isPending={boardsQuery.isPending}
				isPendingNext={boardsQuery.isFetchingNextPage}
				hasCursor={boardsQuery.hasNextPage}
				cursorRef={boardsQuery.cursorRef}
			>
				{viewMode === ViewMode.LIST ? (
					<BoardsListListLayout>
						{boardsQuery.boards.map((board) => (
							<BoardListCard
								key={board.id}
								board={board}
								isFavorite={updateFavorite.isOptimisticFavorite(board)}
								onToggleFavorite={() => updateFavorite.toggle(board)}
								onDelete={() => deleteBoard.deleteBoard(board.id)}
								isDeletePending={deleteBoard.getIsPending(board.id)}
							/>
						))}
					</BoardsListListLayout>
				) : (
					<BoardsListCardLayout>
						{boardsQuery.boards.map((board) => (
							<BoardListCard
								key={board.id}
								board={board}
								isFavorite={updateFavorite.isOptimisticFavorite(board)}
								onToggleFavorite={() => updateFavorite.toggle(board)}
								onDelete={() => deleteBoard.deleteBoard(board.id)}
								isDeletePending={deleteBoard.getIsPending(board.id)}
							/>
						))}
					</BoardsListCardLayout>
				)}
			</BoardsListLayoutContent>
		</BoardsListLayout>
	);
}

export const Component = BoardsListPage;
