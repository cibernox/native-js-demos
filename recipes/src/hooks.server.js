import fs from 'fs';

/**
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
	const acceptHeader = event.request.headers.get('accept') || '';

	// Check if the request accepts text/vml
	if (true || acceptHeader.includes('text/vml')) {
		// For VML requests, we need to serve the SwiftUI template
		const response = await resolve(event, {
			transformPageChunk: ({ html }) => {
				// Read the SwiftUI template
				const swiftuiTemplate = fs.readFileSync('./src/app.swiftui.html', 'utf-8');

				// Extract the processed content from SvelteKit
				const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
				const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

				let processedTemplate = swiftuiTemplate;

				// Replace the SvelteKit placeholders with the processed content
				if (headMatch) {
					processedTemplate = processedTemplate.replace('%sveltekit.head%', headMatch[1]);
				}
				if (bodyMatch) {
					processedTemplate = processedTemplate.replace('%sveltekit.body%', bodyMatch[1]);
				}

				return processedTemplate;
			}
		});

		// Set the appropriate content type for VML
		return new Response(await response.text(), {
			status: response.status,
			statusText: response.statusText,
			headers: {
				...Object.fromEntries(response.headers.entries()),
			}
		});
	}

	// For non-VML requests, proceed normally
	return resolve(event);
}