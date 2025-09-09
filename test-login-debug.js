// Test script to debug login functionality
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("🔧 Environment check:");
console.log("VITE_SUPABASE_URL:", supabaseUrl ? "Set" : "Missing");
console.log("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Set" : "Missing");

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase environment variables");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
    console.log("\n🧪 Testing login functionality...");

    try {
        // Test with a dummy email/password to see what happens
        const testEmail = "test@example.com";
        const testPassword = "testpassword123";

        console.log("📧 Attempting login with:", testEmail);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
        });

        console.log("📊 Login response:");
        console.log("Data:", data);
        console.log("Error:", error);

        if (error) {
            console.log(
                "❌ Login failed (expected for test credentials):",
                error.message,
            );
        } else {
            console.log("✅ Login successful!");
        }
    } catch (err) {
        console.error("💥 Unexpected error:", err);
    }
}

// Also test the connection
async function testConnection() {
    console.log("\n🔗 Testing Supabase connection...");

    try {
        const { data, error } = await supabase.auth.getSession();
        console.log("Session check - Data:", data);
        console.log("Session check - Error:", error);
    } catch (err) {
        console.error("Connection error:", err);
    }
}

async function main() {
    await testConnection();
    await testLogin();
}

main().catch(console.error);
