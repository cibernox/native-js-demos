import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

// Custom plugin to serve different HTML templates based on Accept header
// function conditionalAppHtml(): Plugin {
// 	return {
// 		name: 'conditional-app-html',
// 		configureServer(server) {
// 			server.middlewares.use('/', (req, res, next) => {
// 				const acceptHeader = req.headers.accept || '';

// 				// Only intercept requests that accept text/vml
// 				const requestsVML = true; //acceptHeader.includes('text/vml');
// 				if (requestsVML) {
// 					const swiftuiAppHtml = path.join(server.config.root, 'src', 'app.swiftui.html');

// 					if (fs.existsSync(swiftuiAppHtml)) {
// 						// Intercept the response to replace the app.html template
// 						const originalSend = res.send;
// 						const originalEnd = res.end;
// 						const originalWrite = res.write;

// 						let responseData = '';

// 						// Capture response data
// 						res.write = function(chunk: any, encoding?: any) {
// 							if (chunk) {
// 								responseData += chunk.toString();
// 							}
// 							return true;
// 						} as any;

// 						res.end = function(chunk?: any, encoding?: any) {
// 							if (chunk) {
// 								responseData += chunk.toString();
// 							}

// 							// Check if this is an HTML page response
// 							if (responseData.includes('<!DOCTYPE html>') &&
// 								(responseData.includes('%sveltekit.head%') ||
// 								 responseData.includes('%sveltekit.body%') ||
// 								 res.getHeader('content-type')?.toString().includes('text/html'))) {

// 								try {
// 									// Read and use the SwiftUI template
// 									const swiftuiTemplate = fs.readFileSync(swiftuiAppHtml, 'utf-8');

// 									// Replace placeholders in the SwiftUI template with processed content
// 									let processedResponse = swiftuiTemplate;

// 									// Extract SvelteKit processed content from the original response
// 									const headMatch = responseData.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
// 									const bodyMatch = responseData.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

// 									if (headMatch) {
// 										processedResponse = processedResponse.replace('%sveltekit.head%', headMatch[1]);
// 									}
// 									if (bodyMatch) {
// 										processedResponse = processedResponse.replace('%sveltekit.body%', bodyMatch[1]);
// 									}

// 									// Set VML content type
// 									res.setHeader('Content-Type', 'text/vml; charset=utf-8');

// 									// Restore original methods and send the processed response
// 									res.write = originalWrite;
// 									res.end = originalEnd;
// 									res.end(processedResponse, encoding);
// 									return;
// 								} catch (error) {
// 									console.warn('Failed to process SwiftUI template:', error);
// 								}
// 							}

// 							// Restore original methods and continue normally
// 							res.write = originalWrite;
// 							res.end = originalEnd;
// 							res.end(responseData, encoding);
// 						} as any;
// 					}
// 				}

// 				next();
// 			});
// 		}
// 	};
// }

export default defineConfig({
	plugins: [/*conditionalAppHtml(), */sveltekit()]
});
