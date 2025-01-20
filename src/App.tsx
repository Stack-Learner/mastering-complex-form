import { Button } from './components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './components/ui/dialog';
import { EmployeeOnboarding } from './features/employee-onboarding';

const App = () => {
	return (
		<div className="bg-zinc-100 min-h-screen">
			<nav className="dark bg-background p-4">
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-2xl font-bold text-white">MY HR</h1>
					<Button>My Profile</Button>
				</div>
			</nav>
			<div className="container mx-auto py-4">
				<h1 className="text-2xl font-bold">Employee Onboarding</h1>
				<p>
					Welcome to the employee onboarding process. Please fill in the
					following information to get started.
				</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="mt-4">New Employee</Button>
					</DialogTrigger>
					<DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>New Employee</DialogTitle>
						</DialogHeader>
						<EmployeeOnboarding />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default App;
