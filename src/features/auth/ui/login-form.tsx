import { Button } from "@/shared/ui/kit/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/use-login";

const loginSchema = z.object({
	email: z
		.string({
			required_error: "Email обязателен",
		})
		.email("Некорректный email"),
	password: z
		.string({
			required_error: "Пароль обязателен",
		})
		.min(6, "Пароль должен быть не менее 6 символов"),
});

export function LoginForm() {
	const form = useForm({
		resolver: zodResolver(loginSchema),
	});

	const { login, isPending, errorMessage } = useLogin();

	const onSubmit = form.handleSubmit(login);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="admin@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="******" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
				<Button disabled={isPending} type="submit">
					Войти
				</Button>
			</form>
		</Form>
	);
}
