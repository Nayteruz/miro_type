import { useBoardsList } from "./model/use-boards-list";
import { useState } from "react";
import {
	BoardsListLayout,
	BoardsListLayoutHeader,
	BoardsListLayoutContent,
	BoardsListListLayout,
	BoardsListCardLayout,
} from "./ui/boards-list-layout";
import { ViewMode, ViewModeToggle, type IViewMode } from "./ui/view-mode-toggle";
import { BoardListCard } from "./ui/board-list-card";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";

function BoardsListPage() {
	const boardsQuery = useBoardsList({
		limit: 10,
		isFavorite: true,
	});
	const deleteBoard = useDeleteBoard();
	const updateFavorite = useUpdateFavorite();
	const [viewMode, setViewMode] = useState<IViewMode>(ViewMode.GRID);

	return (
		<BoardsListLayout
			header={
				<BoardsListLayoutHeader
					title="Избранные доски"
					description="Здесь вы можете просматривать и управлять своими избранными досками"
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
