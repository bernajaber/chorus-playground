# Tasks: Weather Lookup Command

## Format
Each task follows this format:
`- [ ] [TaskID] [P?] [Story?] Description with file path`

Where:
- `TaskID` = unique identifier like T01, T02, etc.
- `[P?]` = optional priority: [P0] critical, [P1] high, [P2] medium, [P3] low
- `[Story?]` = optional user story reference like [S1], [S2], etc.
- Description should include the relevant file path when applicable

## Tasks

- [ ] [T01] [P0] [S1] Define the `WeatherResult` interface with city, temperature, and condition fields in `src/weather.ts`
- [ ] [T02] [P0] [S1] Implement the `getWeather(city: string): Promise<WeatherResult>` async function using global `fetch` against `https://wttr.in/<city>?format=j1` in `src/weather.ts`
- [ ] [T03] [P1] [S1] Parse the wttr.in JSON response to extract `current_condition[0].temp_C` and `current_condition[0].weatherDesc[0].value` in `src/weather.ts`
- [ ] [T04] [P0] [S3] Add a 5-second timeout using `AbortSignal.timeout(5000)` to the fetch call in `src/weather.ts`
- [ ] [T05] [P1] [S2] Add CLI argument validation that prints usage message to stderr and exits with code 1 when no city is provided in `src/weather.ts`
- [ ] [T06] [P1] [S3] Add error handling for network failures and unknown cities with descriptive stderr messages in `src/weather.ts`
- [ ] [T07] [P1] [S1] Implement the CLI entry point with `require.main === module` guard and formatted stdout output in `src/weather.ts`
- [ ] [T08] [P2] Add `#!/usr/bin/env node` shebang comment at the top of `src/weather.ts`
- [ ] [T09] [P0] [S4] Create test file `src/weather.test.ts` with Jest mock setup for global `fetch`
- [ ] [T10] [P1] [S4] Write test case for successful weather lookup returning a valid WeatherResult in `src/weather.test.ts`
- [ ] [T11] [P1] [S4] Write test case for empty city argument throwing an error in `src/weather.test.ts`
- [ ] [T12] [P1] [S4] Write test case for city-not-found API response throwing an error in `src/weather.test.ts`
- [ ] [T13] [P2] [S4] Write test case for network failure (fetch rejection) throwing an error in `src/weather.test.ts`
- [ ] [T14] [P2] [S4] Write test case for request timeout scenario in `src/weather.test.ts`
- [ ] [T15] [P1] Add `"weather": "./dist/weather.js"` to the `bin` field in `package.json`
- [ ] [T16] [P2] Run `npm run build` and verify TypeScript compilation succeeds with no errors
- [ ] [T17] [P2] Run `npm test` and verify all existing and new tests pass
- [ ] [T18] [P3] Manually smoke test `node dist/weather.js London` against the live wttr.in API
