import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Switch } from "@/shared/ui/kit/switch";
import { href, Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";

interface BoardListCardProps {
	board: {
		id: string;
		name: string;
		createdAt: string;
		isFavorite: boolean;
	};
	isFavorite: boolean;
	onToggleFavorite: () => void;
	onDelete: () => void;
	isDeletePending: boolean;
}

export function BoardListCard({ board, isFavorite, onToggleFavorite, onDelete, isDeletePending }: BoardListCardProps) {
	return (
		<Card className="relative">
			<div className="absolute top-2 right-2 flex items-center gap-2">
				<Switch checked={isFavorite} onCheckedChange={onToggleFavorite} />
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
				<Button disabled={isDeletePending} variant="destructive" onClick={onDelete}>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
