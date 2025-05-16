interface BoardsListLayoutProps {
	header: React.ReactNode;
	filters?: React.ReactNode;
	list?: React.ReactNode;
	children?: React.ReactNode;
}

export function BoardsListLayout({ header, filters, list, children }: BoardsListLayoutProps) {
	return (
		<div className="container mx-auto p-4 flex flex-col gap-6">
			{header}
			{filters}
			{list}
			{children}
		</div>
	);
}

interface BoardsListLayoutHeaderProps {
	title: string;
	actions?: React.ReactNode;
	description?: string;
}

export function BoardsListLayoutHeader({ title, actions, description }: BoardsListLayoutHeaderProps) {
	return (
		<div className="flex justify-between items-center">
			<div>
				<h1 className="text-2xl font-bold">{title}</h1>
				{description && <p className="text-gray-500">{description}</p>}
			</div>
			{actions}
		</div>
	);
}

interface BoardsListLayoutFiltersProps {
	sort?: React.ReactNode;
	filters?: React.ReactNode;
	actions?: React.ReactNode;
}

export function BoardsListLayoutFilters({ sort, filters, actions }: BoardsListLayoutFiltersProps) {
	return (
		<div className="flex items-center gap-4">
			{filters && (
				<div className="flex items-center gap-2">
					<div className="text-sm text-gray-500 whitespace-nowrap">Filter by</div>
					{filters}
				</div>
			)}
			{sort && (
				<div className="flex items-center gap-2">
					<div className="text-sm text-gray-500 whitespace-nowrap">Sort by</div>
					{sort}
				</div>
			)}
			{actions && <div className="ml-auto">{actions}</div>}
		</div>
	);
}

interface BoardsListListProps {
	children?: React.ReactNode;
	isEmpty?: boolean;
	isPending?: boolean;
	isPendingNext?: boolean;
	cursorRef?: React.Ref<HTMLDivElement>;
	hasCursor?: boolean;
}

export function BoardsListLayoutContent({
	children,
	isEmpty,
	isPending,
	isPendingNext,
	cursorRef,
	hasCursor,
}: BoardsListListProps) {
	return (
		<div>
			{isPending && <div className="text-center py-10">Загрузка...</div>}

			{!isPending && children}

			{isEmpty && !isPending && <div className="text-center py-4">Доски не найдены</div>}

			{hasCursor && (
				<div ref={cursorRef} className="h-10">
					{isPendingNext && <div className="text-center py-4">Загрузка дополнительных досок...</div>}
				</div>
			)}
		</div>
	);
}

interface BoardsListCardLayoutProps {
	children: React.ReactNode;
}

export function BoardsListCardLayout({ children }: BoardsListCardLayoutProps) {
	return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;
}

interface BoardsListListLayoutProps {
	children: React.ReactNode;
}

export function BoardsListListLayout({ children }: BoardsListListLayoutProps) {
	return <div className="flex flex-col gap-4">{children}</div>;
}
