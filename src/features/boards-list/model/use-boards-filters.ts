import { useState } from "react";

export type BoardSortOption = "createdAt" | "updatedAt" | "lastOpenedAt" | "name";

export type BoardsFilters = {
	search: string;
	sort: BoardSortOption;
};

export function useBoardsFilters() {
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState<BoardSortOption>("lastOpenedAt");

	return {
		search,
		sort,
		setSearch,
		setSort,
	};
}
