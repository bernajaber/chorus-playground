# Feature Spec: Weather Lookup Command

## Overview

Add a `weather` CLI command to chorus-playground that fetches and displays the current weather for a given city using the free wttr.in public API. The command follows the existing project pattern of a standalone TypeScript file with an exported function and a `require.main === module` CLI entry point.

## Motivation

The existing commands (hello, goodbye, greet) are purely local string operations. Adding a weather command introduces real-world HTTP networking, JSON parsing, and async/await patterns -- expanding the project's value as a learning and testing playground for TypeScript CLI development.

## User Stories

- **S1**: As a user, I want to run `node dist/weather.js London` and see the current temperature and weather description for London, so that I can quickly check the weather from my terminal.
- **S2**: As a user, I want to see a helpful error message when I forget to provide a city name, so that I know how to use the command correctly.
- **S3**: As a user, I want to see a clear error message when the API is unreachable or the city is not found, so that I understand what went wrong.
- **S4**: As a developer, I want the weather module to export a testable async function, so that I can write unit tests without hitting the real API.

## Requirements

### Functional Requirements

1. The command accepts a city name as a CLI argument (`process.argv[2]`).
2. The command fetches current weather data from `https://wttr.in/<city>?format=j1`.
3. The command prints the city name, current temperature (in Celsius), and a short weather description to stdout.
4. If no city argument is provided, the command prints a usage message to stderr and exits with code 1.
5. If the HTTP request fails or the city is not found, the command prints an error message to stderr and exits with code 1.
6. The command is registered as a `bin` entry in package.json under the name `weather`.

### Non-Functional Requirements

1. The HTTP request must time out after 5 seconds to avoid hanging.
2. No new runtime dependencies -- use Node.js built-in `https` module or the globally available `fetch` (Node 18+).
3. The exported function must be async and return a structured result (not print directly) so it is testable.

## API / Interface Design

### CLI Interface

```
Usage: weather <city>

Examples:
  node dist/weather.js London
  node dist/weather.js "New York"
  node dist/weather.js Tokyo
```

### Output Format

```
Weather for London:
  Temperature: 12°C
  Condition: Partly cloudy
```

### Exported Function

```typescript
export interface WeatherResult {
  city: string;
  temperature: string;
  condition: string;
}

export async function getWeather(city: string): Promise<WeatherResult>
```

## Edge Cases & Error Handling

| Case | Behavior |
|------|----------|
| No city argument | Print `Usage: weather <city>` to stderr, exit 1 |
| Empty string city | Treat same as no argument |
| City not found (API returns error) | Print `Error: Could not find weather for "<city>"` to stderr, exit 1 |
| Network timeout (>5s) | Print `Error: Request timed out` to stderr, exit 1 |
| Network error (no connection) | Print `Error: Failed to fetch weather data` to stderr, exit 1 |
| City name with spaces | Support via quoting: `"New York"` |

## Dependencies

- **wttr.in API** (https://wttr.in) -- free, no API key required, returns JSON with `?format=j1` query parameter
- **Node.js built-in `https`** module or global `fetch` -- no new npm packages

## Out of Scope

- Multi-day forecasts (only current weather)
- Fahrenheit/Kelvin unit selection
- Caching or offline support
- Interactive city selection or autocomplete
- Configuration file for default city

## Open Questions

1. Should we use Node.js built-in `https` or the global `fetch` available in Node 18+? (Recommendation: use `fetch` for simplicity, require Node 18+)
2. Should we add a `--json` flag for machine-readable output? (Recommendation: defer to a future iteration)
