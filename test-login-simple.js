// Simple test script to debug login functionality
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Manually read .env file
function loadEnvFile() {
    try {
        const envContent = fs.readFileSync(".env", "utf8");
        const envVars = {};

        envContent.split("\n").forEach((line) => {
            const [key, value] = line.split("=");
            if (key && value) {
                envVars[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
            }
        });

        return envVars;
    } catch (error) {
        console.error("Error reading .env file:", error.message);
        return {};
    }
}

const env = loadEnvFile();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

console.log("🔧 Environment check:");
console.log("VITE_SUPABASE_URL:", supabaseUrl ? "Set" : "Missing");
console.log("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Set" : "Missing");

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase environment variables");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log("\n🔗 Testing Supabase connection...");

    try {
        const { data, error } = await supabase.auth.getSession();
        console.log("Session check - Data:", data);
        console.log("Session check - Error:", error);

        if (error) {
            console.log("❌ Connection error:", error.message);
        } else {
            console.log("✅ Connection successful!");
        }
    } catch (err) {
        console.error("💥 Connection error:", err);
    }
}

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
        console.log("Data:", JSON.stringify(data, null, 2));
        console.log("Error:", error ? JSON.stringify(error, null, 2) : "None");

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

async function main() {
    await testConnection();
    await testLogin();
}

main().catch(console.error);
