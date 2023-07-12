// Import necessary modules
import { exec } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the command to generate Supabase types
const command = `supabase gen types typescript --db-url ${process.env.SUPABASE_DATABASE_URL} > ./src/lib/types/supabase.types.ts`;

// Execute the command using child_process.exec
exec(command, (error) => {
	if (error) {
		// Handle any errors that occurred during execution
		console.error(`Error: ${error.message}`);
		return;
	}
	// Command executed successfully
	console.log(
		'Successfully created types from supabase database (./src/lib/types/supabase.types.ts)'
	);
});
