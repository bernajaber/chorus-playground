# Implementation Plan: Todo List Manager

## Summary

Implement a CLI todo list manager as a new command (`todo`) in the chorus-playground project. The implementation adds a single source file `src/todo.ts` containing all todo logic (storage, commands, CLI dispatch), a co-located test file `src/todo.test.ts`, and a new bin entry in `package.json`. The design follows the existing project conventions: exported functions for testability, `require.main === module` guard for CLI execution, raw `process.argv` parsing, and no external dependencies.

## Architecture

The feature is organized into three logical layers inside a single file (`src/todo.ts`):

1. **Data Layer** -- Types and file I/O functions for reading/writing `todos.json`.
   - `Todo` interface: `{ id: number; description: string; completed: boolean; createdAt: string }`
   - `TodoStore` interface: `{ nextId: number; todos: Todo[] }`
   - `loadStore(filePath: string): TodoStore` -- reads and parses the JSON file, returns default empty store if file does not exist.
   - `saveStore(filePath: string, store: TodoStore): void` -- writes the store to disk as formatted JSON.

2. **Command Layer** -- Pure-ish functions that operate on a `TodoStore` and return a result plus updated store. These are the primary unit-test targets.
   - `addTodo(store: TodoStore, description: string): { store: TodoStore; added: Todo }`
   - `listTodos(store: TodoStore, filter?: "done" | "pending"): Todo[]`
   - `completeTodo(store: TodoStore, id: number): { store: TodoStore; todo: Todo }`
   - `deleteTodo(store: TodoStore, id: number): { store: TodoStore; deleted: Todo }`

3. **CLI Layer** -- The `main()` function that parses `process.argv`, dispatches to the appropriate command function, handles errors, and prints output. Protected by `require.main === module`.

### Design Decisions

- **Single file**: The feature is small enough to live in one file, consistent with how `greet.ts`, `hello.ts`, and `goodbye.ts` work.
- **Separation of pure logic from I/O**: Command functions take and return `TodoStore` objects rather than reading/writing files directly. This makes them easy to test without touching the file system.
- **`nextId` in store**: Ensures IDs are never reused, even after deletions.
- **`createdAt` timestamp**: Stored as ISO 8601 string for simplicity and human readability.
- **Default file path**: `todos.json` in `process.cwd()`. The file path is a parameter in the data layer functions so tests can use temp directories.

## File Changes

### New Files

| File | Description |
|---|---|
| `src/todo.ts` | Main source file containing data layer, command layer, and CLI entry point |
| `src/todo.test.ts` | Co-located Jest tests covering all command functions, CLI dispatch, and edge cases |

### Modified Files

| File | Description |
|---|---|
| `package.json` | Add `"todo": "./dist/todo.js"` to the `bin` field |

## Implementation Steps

1. **Define TypeScript interfaces** -- Create `Todo` and `TodoStore` types in `src/todo.ts`.
2. **Implement data layer** -- Write `loadStore` and `saveStore` functions using `fs.readFileSync` / `fs.writeFileSync`.
3. **Implement `addTodo`** -- Takes store and description, returns updated store with new todo appended and `nextId` incremented.
4. **Implement `listTodos`** -- Takes store and optional filter, returns filtered array of todos.
5. **Implement `completeTodo`** -- Takes store and ID, finds the todo, sets `completed: true`, returns updated store. Throws if ID not found.
6. **Implement `deleteTodo`** -- Takes store and ID, removes the todo from the array, returns updated store. Throws if ID not found.
7. **Implement CLI dispatcher (`main`)** -- Parse `process.argv` to extract command and arguments, call the appropriate function, load/save store, print output, handle errors.
8. **Implement output formatting** -- Format `list` output as a readable table with ID, checkbox (`[x]` / `[ ]`), and description.
9. **Add `require.main === module` guard** -- Wire up `main()` to run only when executed directly.
10. **Update `package.json`** -- Add bin entry for `todo`.
11. **Write unit tests for data layer** -- Test `loadStore` with missing file, valid file, and corrupted file. Test `saveStore` writes valid JSON.
12. **Write unit tests for command functions** -- Test `addTodo`, `listTodos`, `completeTodo`, `deleteTodo` with normal and edge-case inputs.
13. **Write integration tests for CLI** -- Test the `main` function or spawn the process to verify end-to-end behavior for each command.
14. **Build and manually verify** -- Run `npm run build` and test each command manually.

## Testing Strategy

- **Unit tests** (`src/todo.test.ts`):
  - Data layer: `loadStore` returns empty store for missing file, parses valid JSON, throws on corrupt JSON. `saveStore` writes correctly formatted JSON.
  - Command functions: Test each of `addTodo`, `listTodos`, `completeTodo`, `deleteTodo` with valid inputs and edge cases (empty store, non-existent ID, already-completed todo, filter flags).
  - CLI parsing: Test that `main()` dispatches correctly. Mock `console.log`, `console.error`, and `process.exit` to verify output and exit codes.
- **File system tests**: Use `os.tmpdir()` and unique temp directories for any tests that hit the file system, to avoid polluting the project directory.
- **Run with**: `npm test` (Jest with ts-jest preset, as configured).

## Rollback Plan

Since this feature adds new files and only modifies `package.json` (adding a bin entry), rollback is straightforward:

1. Delete `src/todo.ts` and `src/todo.test.ts`.
2. Remove the `"todo"` entry from `bin` in `package.json`.
3. Delete `dist/todo.js` if it was built.

No existing functionality is modified, so there is zero risk to existing commands.

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| File corruption from concurrent writes | Low | Medium | Use synchronous file I/O (`writeFileSync`). Document that concurrent CLI invocations are not supported. |
| Large `todos.json` slows down operations | Low | Low | The entire file is read/written on each operation, but this is fine for the expected scale (under 1,000 items). |
| Breaking existing tests | Very Low | Medium | No existing source files are modified. Only `package.json` bin field is touched, which does not affect tests. Run full test suite to confirm. |
