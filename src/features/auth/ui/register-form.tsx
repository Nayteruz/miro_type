import { Button } from "@/shared/ui/kit/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../model/use-register";

const registerSchema = z
	.object({
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
		confirmPassword: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export function RegisterForm() {
	const form = useForm({
		resolver: zodResolver(registerSchema),
	});

	const { register, isPending, errorMessage } = useRegister();

	const onSubmit = form.handleSubmit(register);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Почта</FormLabel>
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
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input placeholder="******" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Подтвердите пароль</FormLabel>
							<FormControl>
								<Input placeholder="******" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
				<Button disabled={isPending} type="submit">
					Зарегистрироваться
				</Button>
			</form>
		</Form>
	);
}
