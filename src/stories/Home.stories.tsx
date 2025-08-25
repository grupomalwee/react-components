import type { Meta, StoryObj } from '@storybook/react-vite';
import { motion } from 'framer-motion';

const meta: Meta = {
	title: 'Home',
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `\n# Bem-vindo ao Malwee React Components\n\nSistema de design componetizado, prático e escalável com React + Tailwind.\n`
			}
		},
		backgrounds: {
			default: 'light',
			values: [
				{ name: 'light', value: '#f6f6f6' },
				{ name: 'dark', value: '#222' }
			]
		}
	}
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<main style={{ minHeight: '100vh' }} className="dark:bg-[hsl(231,15%,19%)] text-neutral-900 dark:text-white flex items-center justify-center px-4 md:px-96">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className="text-center flex flex-col items-center gap-6 max-w-2xl"
			>
				<motion.img
					src="/pwa-512x512.png"
					alt="Logo Malwee"
					className="w-28 h-28 rounded-xl hover:scale-105 transition-all"
					whileHover={{ rotate: [0, 2, -2, 0] }}
				/>
				<h1 className="text-4xl md:text-5xl font-bold leading-tight">
					Bem-vindo ao <br />
					<span className="text-primary">Malwee React Components</span>
				</h1>
				<p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
					Sistema de design componetizado, prático e escalável com React + Tailwind.
				</p>
			</motion.div>
		</main>
	),
};
