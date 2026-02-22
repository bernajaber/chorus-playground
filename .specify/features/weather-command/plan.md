# Implementation Plan: Weather Lookup Command

## Summary

Implement a new `weather` CLI command that fetches current weather data from the wttr.in public API and displays it in the terminal. The implementation follows the existing project pattern: a single TypeScript source file with an exported async function and a CLI entry point, plus a co-located test file.

## Architecture

The weather command follows the same architecture as existing commands (hello, goodbye, greet):

```
src/weather.ts        -- Main module: exports getWeather(), CLI entry point
src/weather.test.ts   -- Unit tests with mocked fetch
```

The `getWeather` function is a pure async function that:
1. Takes a city name string
2. Calls `fetch()` against the wttr.in JSON API
3. Parses the response and returns a `WeatherResult` object

The CLI entry point reads `process.argv[2]`, calls `getWeather()`, formats the output, and prints to stdout. Error paths print to stderr and call `process.exit(1)`.

### Design Decisions

- **Use global `fetch`**: Available in Node 18+. Avoids adding any runtime dependencies.
- **AbortController for timeout**: Use `AbortSignal.timeout(5000)` for the 5-second timeout.
- **Structured return type**: `getWeather()` returns a `WeatherResult` object, keeping the function testable and the formatting in the CLI layer.

## File Changes

### New Files

| File | Description |
|------|-------------|
| `src/weather.ts` | Weather lookup module with `getWeather()` function, `WeatherResult` interface, and CLI entry point |
| `src/weather.test.ts` | Unit tests for `getWeather()` covering success, missing city, not found, and network error cases |

### Modified Files

| File | Change |
|------|--------|
| `package.json` | Add `"weather": "./dist/weather.js"` to the `bin` field |

## Implementation Steps

1. **Create `src/weather.ts`**
   - Define the `WeatherResult` interface (city, temperature, condition)
   - Implement `getWeather(city: string): Promise<WeatherResult>` using `fetch` with `AbortSignal.timeout(5000)`
   - Parse the wttr.in JSON response to extract `current_condition[0].temp_C` and `current_condition[0].weatherDesc[0].value`
   - Implement the CLI entry point with argument validation and formatted output
   - Add the `#!/usr/bin/env node` shebang for bin usage

2. **Create `src/weather.test.ts`**
   - Mock global `fetch` using Jest
   - Test: `getWeather("London")` returns a valid WeatherResult when API responds successfully
   - Test: `getWeather("")` throws an error for empty city
   - Test: `getWeather("Xyzzyville")` throws when API returns an error response
   - Test: `getWeather("London")` throws on network failure (fetch rejects)

3. **Update `package.json`**
   - Add `"weather": "./dist/weather.js"` to the `bin` object

4. **Verify**
   - Run `npm run build` to compile
   - Run `npm test` to confirm all tests pass
   - Run `node dist/weather.js London` for a manual smoke test

## Testing Strategy

- **Unit tests**: Mock `fetch` globally in Jest to test `getWeather()` in isolation. Cover the happy path, missing/empty city, API error response, and network failure.
- **Manual smoke test**: After build, run `node dist/weather.js London` to verify real API integration.
- **No integration tests**: The wttr.in API is external and free-tier; integration tests would be flaky. Manual verification is sufficient for this learning project.

## Rollback Plan

Since this is a new, additive feature with no changes to existing command files:
1. Delete `src/weather.ts` and `src/weather.test.ts`
2. Remove the `weather` bin entry from `package.json`
3. Run `npm run build` to regenerate `dist/`

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| wttr.in API goes down or changes format | Low | The function throws a clear error on unexpected responses; easy to swap API later |
| Node.js version < 18 (no global `fetch`) | Medium | Document Node 18+ requirement; alternatively fall back to `https` module |
| Tests become flaky if fetch mock is improperly scoped | Low | Use `jest.spyOn(global, 'fetch')` with `mockRestore()` in afterEach |
