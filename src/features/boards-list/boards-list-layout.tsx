interface BoardsListLayoutProps {
	header: React.ReactNode;
	children: React.ReactNode;
}

export function BoardsListLayout({ header, children }: BoardsListLayoutProps) {
	return (
		<div className="container mx-auto p-4 space-y-4">
			{header}
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
		<div className="flex justify-between items-center mb-6">
			<div>
				<h1 className="text-2xl font-bold">{title}</h1>
				{description && <p className="text-gray-500">{description}</p>}
			</div>
			{actions}
		</div>
	);
}
