import { delay, HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { verifyTokenOrThrow } from "../session";

type Board = ApiSchemas["Board"];
type SortField = "createdAt" | "updatedAt" | "lastOpenedAt" | "name";

const generateMockBoards = (count: number): Board[] => {
	const boards: Board[] = [];
	const boardTypes = [
		"Project",
		"Meeting",
		"Planning",
		"Strategy",
		"Design",
		"Roadmap",
		"Campaign",
		"Workshop",
		"Review",
		"Analysis",
	];
	const adjectives = ["Q1", "Q2", "Q3", "Q4", "2024", "2025", "Annual", "Monthly", "Weekly", "Daily"];
	const topics = [
		"Marketing",
		"Product",
		"Development",
		"Sales",
		"HR",
		"Finance",
		"Operations",
		"Research",
		"Customer",
		"Team",
	];

	for (let i = 0; i < count; i++) {
		const type = boardTypes[Math.floor(Math.random() * boardTypes.length)];
		const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
		const topic = topics[Math.floor(Math.random() * topics.length)];
		const name = `${topic} ${type} ${adj}`;

		// Generate dates within the last year
		const now = new Date();
		const createdAt = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000);
		const updatedAt = new Date(createdAt.getTime() + Math.random() * (now.getTime() - createdAt.getTime()));
		const lastOpenedAt = new Date(updatedAt.getTime() + Math.random() * (now.getTime() - updatedAt.getTime()));

		boards.push({
			id: `board-${i + 1}`,
			name,
			createdAt: createdAt.toISOString(),
			updatedAt: updatedAt.toISOString(),
			lastOpenedAt: lastOpenedAt.toISOString(),
			isFavorite: Math.random() > 0.7, // 30% chance of being favorite
		});
	}

	return boards;
};

const boards = generateMockBoards(1000);

export const boardsHandlers = [
	http.get("/boards", async ({ request }) => {
		await verifyTokenOrThrow(request);
		const url = new URL(request.url);

		// Get query parameters
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 10;
		const sort = (url.searchParams.get("sort") || "createdAt") as SortField;
		const isFavorite = url.searchParams.get("isFavorite");
		const search = url.searchParams.get("search");

		// Filter boards
		let filteredBoards = [...boards];
		if (isFavorite !== null) {
			filteredBoards = filteredBoards.filter((board) => board.isFavorite === (isFavorite === "true"));
		}
		if (search) {
			filteredBoards = filteredBoards.filter((board) => board.name.toLowerCase().includes(search.toLowerCase()));
		}

		// Sort boards
		filteredBoards.sort((a, b) => {
			if (sort === "name") {
				return a.name.localeCompare(b.name);
			}
			return new Date(b[sort]).getTime() - new Date(a[sort]).getTime();
		});

		// Paginate
		const start = (page - 1) * limit;
		const end = start + limit;
		const paginatedBoards = filteredBoards.slice(start, end);

		return HttpResponse.json({
			list: paginatedBoards,
			total: filteredBoards.length,
			totalPages: Math.ceil(filteredBoards.length / limit),
		});
	}),

	http.get("/boards/{boardId}", async ({ params, request }) => {
		await verifyTokenOrThrow(request);
		const { boardId } = params;
		const board = boards.find((board) => board.id === boardId);

		if (!board) {
			return HttpResponse.json({ message: "Board not found", code: "NOT_FOUND" }, { status: 404 });
		}

		return HttpResponse.json(board);
	}),

	http.post("/boards", async ({ request }) => {
		await verifyTokenOrThrow(request);
		const now = new Date().toISOString();

		const board: Board = {
			id: crypto.randomUUID(),
			name: "New Board",
			createdAt: now,
			updatedAt: now,
			lastOpenedAt: now,
			isFavorite: false,
		};

		boards.push(board);
		return HttpResponse.json(board, { status: 201 });
	}),

	http.put("/boards/{boardId}/rename", async ({ params, request }) => {
		await verifyTokenOrThrow(request);
		const { boardId } = params;
		const data = (await request.json()) as ApiSchemas["RenameBoard"];

		const boardIndex = boards.findIndex((board) => board.id === boardId);
		if (boardIndex === -1) {
			return HttpResponse.json({ message: "Board not found", code: "NOT_FOUND" }, { status: 404 });
		}

		boards[boardIndex] = {
			...boards[boardIndex],
			name: data.name,
			updatedAt: new Date().toISOString(),
		};

		return HttpResponse.json(boards[boardIndex], { status: 201 });
	}),

	http.put("/boards/{boardId}/favorite", async ({ params, request }) => {
		await verifyTokenOrThrow(request);
		const { boardId } = params;
		const data = (await request.json()) as ApiSchemas["UpdateBoardFavorite"];

		const boardIndex = boards.findIndex((board) => board.id === boardId);
		if (boardIndex === -1) {
			return HttpResponse.json({ message: "Board not found", code: "NOT_FOUND" }, { status: 404 });
		}

		boards[boardIndex] = {
			...boards[boardIndex],
			isFavorite: data.isFavorite,
			updatedAt: new Date().toISOString(),
		};

		return HttpResponse.json(boards[boardIndex], { status: 201 });
	}),

	http.delete("/boards/{boardId}", async ({ params, request }) => {
		await verifyTokenOrThrow(request);
		const { boardId } = params;
		const index = boards.findIndex((board) => board.id === boardId);

		await delay(1000);

		if (index === -1) {
			return HttpResponse.json({ message: "Board not found", code: "NOT_FOUND" }, { status: 404 });
		}

		boards.splice(index, 1);
		return new HttpResponse(null, { status: 204 });
	}),
];
