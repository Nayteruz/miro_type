import { CONFIG } from "@/shared/model/config";
import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

function BoardsListPage() {
	console.log(CONFIG.API_BASE_URL);
	return (
		<div>
			<h1>Boards list {CONFIG.API_BASE_URL}</h1>

			<Link to={href(ROUTES.BOARD, { boardId: "1" })}>Board1</Link>
		</div>
	);
}

export const Component = BoardsListPage;
