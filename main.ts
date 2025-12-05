import { parseArgs } from "@std/cli/parse-args";

interface DayModule {
  execute?: () => void | Promise<void>;
}

const AVAILABLE_DAYS = [1, 2, 3, 4, 5];

async function runDay(day: number): Promise<void> {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`🎄 Running Day ${day}`);
  console.log("=".repeat(50));

  try {
    const module = await import(`./src/day${day}/index.ts`) as DayModule;

    if (module.execute) {
      await module.execute();
    } else {
      console.log(`Day ${day} completed - check console output above`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cannot resolve")) {
      console.error(`❌ Day ${day} not found`);
    } else {
      console.error(`❌ Error running Day ${day}:`, error);
    }
  }
}

async function runAllDays(): Promise<void> {
  console.log("\n🎄 Advent of Code 2025 - Running All Days 🎄\n");

  for (const day of AVAILABLE_DAYS) {
    await runDay(day);
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log("✨ All days completed!");
  console.log("=".repeat(50));
}

function printUsage(): void {
  console.log(`
🎄 Advent of Code 2025 Runner

Usage:
  deno run --allow-read main.ts [options]

Options:
  --day <number>    Run a specific day (e.g., --day 1)
  --all             Run all available days
  --help, -h        Show this help message

Examples:
  deno run --allow-read main.ts --day 1
  deno run --allow-read main.ts --all
  deno task dev                        # Watch mode
`);
}

if (import.meta.main) {
  const args = parseArgs(Deno.args, {
    boolean: ["all", "help", "h"],
    string: ["day"],
    alias: { h: "help" },
  });

  if (args.help || args.h) {
    printUsage();
    Deno.exit(0);
  }

  if (args.day) {
    const day = parseInt(args.day, 10);
    if (Number.isNaN(day)) {
      console.error("❌ Invalid day number");
      Deno.exit(1);
    }
    await runDay(day);
  } else if (args.all) {
    await runAllDays();
  } else {
    console.log("🎄 Advent of Code 2025\n");
    console.log("No day specified. Use --help for usage information.");
    console.log("\nQuick start:");
    console.log("  deno run --allow-read main.ts --day 1");
    console.log("  deno run --allow-read main.ts --all");
  }
}
