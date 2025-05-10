import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/kit/card";

interface IAuthLayoutProps {
	form: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	footerText: React.ReactNode;
}

export function AuthLayout({ form, title, description, footerText }: IAuthLayoutProps) {
	return (
		<main className="grow flex flex-col items-center justify-center">
			<Card className="w-full max-w-[400px]">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>{form}</CardContent>
				<CardFooter>
					<p className="text-sm text-muted-foreground [&_a]:text-blue-700 [&_a]:hover:underline">{footerText}</p>
				</CardFooter>
			</Card>
		</main>
	);
}
