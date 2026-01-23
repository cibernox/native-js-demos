import { defineConfig } from 'vite';
import type { Plugin, ViteDevServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

// Plugin to serve different HTML templates based on Accept header
function conditionalHtml(): Plugin {
	return {
		name: 'conditional-html',
		configureServer(server: ViteDevServer) {
			server.middlewares.use('/', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
				const acceptHeader = req.headers.accept || '';

				// Check if the request accepts text/vml
				// const isSwiftuiRequest = acceptHeader.includes('text/vml');
				const isSwiftuiRequest = false;
				
				if (isSwiftuiRequest) {
					// Intercept the request and serve SwiftUI template
					if (req.url === '/' || req.url === '/index.html') {
						try {
							const swiftuiTemplate = readFileSync('./index.swiftui.html', 'utf-8');

							// Process the template through Vite's transform pipeline
							server.transformIndexHtml(req.url, swiftuiTemplate).then((transformedHtml: string) => {
								// res.setHeader('Content-Type', 'text/vml; charset=utf-8');
								res.setHeader('Content-Type', 'text/html; charset=utf-8');
								res.end(transformedHtml);
							}).catch((error: Error) => {
								console.error('Failed to transform SwiftUI template:', error);
								next();
							});
							return;
						} catch (error) {
							console.warn('Failed to read SwiftUI template, falling back to default:', error);
						}
					}
				}

				next();
			});
		}
	};
}

export default defineConfig({
	plugins: [conditionalHtml(), svelte()],
	resolve: {
		alias: {
			$lib: resolve('./src/lib')
		}
	}
});