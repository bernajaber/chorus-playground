# Tasks: Todo List Manager

## Format
Each task follows this format:
`- [ ] [TaskID] [P?] [Story?] Description with file path`

Where:
- `TaskID` = unique identifier like T01, T02, etc.
- `[P?]` = optional priority: [P0] critical, [P1] high, [P2] medium, [P3] low
- `[Story?]` = optional user story reference like [S1], [S2], etc.
- Description should include the relevant file path when applicable

## Phase 1: Data Layer & Types

- [ ] [T01] [P0] [S5] Define `Todo` interface with `id`, `description`, `completed`, and `createdAt` fields in `src/todo.ts`
- [ ] [T02] [P0] [S5] Define `TodoStore` interface with `nextId` and `todos` fields in `src/todo.ts`
- [ ] [T03] [P0] [S5] Implement `loadStore(filePath: string): TodoStore` function that reads and parses `todos.json`, returning a default empty store if the file does not exist, in `src/todo.ts`
- [ ] [T04] [P0] [S5] Implement `saveStore(filePath: string, store: TodoStore): void` function that writes the store as formatted JSON using `fs.writeFileSync` in `src/todo.ts`
- [ ] [T05] [P1] [S5] Add error handling in `loadStore` for corrupted/invalid JSON files in `src/todo.ts`

## Phase 2: Command Functions

- [ ] [T06] [P0] [S1] Implement `addTodo(store: TodoStore, description: string): { store: TodoStore; added: Todo }` that appends a new todo with auto-incremented ID and returns updated store in `src/todo.ts`
- [ ] [T07] [P0] [S2] Implement `listTodos(store: TodoStore, filter?: "done" | "pending"): Todo[]` that returns all todos or filters by completion status in `src/todo.ts`
- [ ] [T08] [P0] [S3] Implement `completeTodo(store: TodoStore, id: number): { store: TodoStore; todo: Todo }` that marks a todo as completed and throws if ID not found in `src/todo.ts`
- [ ] [T09] [P0] [S4] Implement `deleteTodo(store: TodoStore, id: number): { store: TodoStore; deleted: Todo }` that removes a todo from the store and throws if ID not found in `src/todo.ts`
- [ ] [T10] [P2] [S3] Handle edge case where `completeTodo` is called on an already-completed todo (print notice, no error) in `src/todo.ts`

## Phase 3: CLI Dispatcher & Output

- [ ] [T11] [P0] Implement `main()` function that parses `process.argv` to extract command name and arguments in `src/todo.ts`
- [ ] [T12] [P0] [S1] Wire `add` command in CLI dispatcher to call `addTodo`, load/save store, and print confirmation with assigned ID in `src/todo.ts`
- [ ] [T13] [P0] [S2] Wire `list` command in CLI dispatcher to call `listTodos`, parse `--done` and `--pending` flags, and print formatted output in `src/todo.ts`
- [ ] [T14] [P0] [S3] Wire `complete` command in CLI dispatcher to call `completeTodo`, load/save store, and print confirmation in `src/todo.ts`
- [ ] [T15] [P0] [S4] Wire `delete` command in CLI dispatcher to call `deleteTodo`, load/save store, and print confirmation in `src/todo.ts`
- [ ] [T16] [P1] [S2] Implement formatted table output for `list` command showing ID, checkbox (`[x]`/`[ ]`), and description in `src/todo.ts`
- [ ] [T17] [P1] [S2] Print "No todos found." message when the list is empty or filter returns no results in `src/todo.ts`
- [ ] [T18] [P1] Implement usage/help text printed when no command or unknown command is provided in `src/todo.ts`
- [ ] [T19] [P0] Add `require.main === module` guard to invoke `main()` only when run directly in `src/todo.ts`

## Phase 4: Error Handling

- [ ] [T20] [P1] Validate that `add` command receives a non-empty description, print error and exit with code 1 if missing in `src/todo.ts`
- [ ] [T21] [P1] Validate that `complete` and `delete` commands receive a numeric ID argument, print error and exit with code 1 if missing or non-numeric in `src/todo.ts`
- [ ] [T22] [P1] Handle non-existent todo ID in `complete` and `delete` commands with descriptive error message and exit code 1 in `src/todo.ts`
- [ ] [T23] [P2] Write all error messages to `console.error` (not `console.log`) and ensure `process.exit(1)` is called on errors in `src/todo.ts`

## Phase 5: Project Integration

- [ ] [T24] [P0] Add `"todo": "./dist/todo.js"` to the `bin` field in `package.json`
- [ ] [T25] [P1] Export all command functions (`addTodo`, `listTodos`, `completeTodo`, `deleteTodo`) and data layer functions (`loadStore`, `saveStore`) from `src/todo.ts` for testability

## Phase 6: Unit Tests -- Data Layer

- [ ] [T26] [P1] [S5] Write test: `loadStore` returns default empty store `{ nextId: 1, todos: [] }` when file does not exist in `src/todo.test.ts`
- [ ] [T27] [P1] [S5] Write test: `loadStore` correctly parses a valid `todos.json` file in `src/todo.test.ts`
- [ ] [T28] [P1] [S5] Write test: `loadStore` throws descriptive error when file contains invalid JSON in `src/todo.test.ts`
- [ ] [T29] [P1] [S5] Write test: `saveStore` writes correctly formatted JSON that can be parsed back in `src/todo.test.ts`
- [ ] [T30] [P2] [S5] Write test: `saveStore` creates the file if it does not already exist in `src/todo.test.ts`

## Phase 7: Unit Tests -- Command Functions

- [ ] [T31] [P1] [S1] Write test: `addTodo` appends a new todo with correct ID, description, completed=false, and createdAt timestamp in `src/todo.test.ts`
- [ ] [T32] [P1] [S1] Write test: `addTodo` increments `nextId` in the returned store in `src/todo.test.ts`
- [ ] [T33] [P1] [S1] Write test: `addTodo` on a store with existing todos assigns the correct next ID in `src/todo.test.ts`
- [ ] [T34] [P1] [S2] Write test: `listTodos` returns all todos when no filter is provided in `src/todo.test.ts`
- [ ] [T35] [P1] [S2] Write test: `listTodos` with `"done"` filter returns only completed todos in `src/todo.test.ts`
- [ ] [T36] [P1] [S2] Write test: `listTodos` with `"pending"` filter returns only non-completed todos in `src/todo.test.ts`
- [ ] [T37] [P2] [S2] Write test: `listTodos` returns empty array for empty store in `src/todo.test.ts`
- [ ] [T38] [P1] [S3] Write test: `completeTodo` sets `completed` to `true` on the matching todo in `src/todo.test.ts`
- [ ] [T39] [P1] [S3] Write test: `completeTodo` throws error when given a non-existent ID in `src/todo.test.ts`
- [ ] [T40] [P2] [S3] Write test: `completeTodo` on an already-completed todo does not throw and returns the todo in `src/todo.test.ts`
- [ ] [T41] [P1] [S4] Write test: `deleteTodo` removes the matching todo from the store in `src/todo.test.ts`
- [ ] [T42] [P1] [S4] Write test: `deleteTodo` throws error when given a non-existent ID in `src/todo.test.ts`
- [ ] [T43] [P2] [S4] Write test: `deleteTodo` does not change `nextId` (IDs are never reused) in `src/todo.test.ts`

## Phase 8: Integration Tests -- CLI

- [ ] [T44] [P1] Write test: CLI prints usage help when invoked with no arguments in `src/todo.test.ts`
- [ ] [T45] [P1] Write test: CLI prints error for unknown command in `src/todo.test.ts`
- [ ] [T46] [P1] [S1] Write test: CLI `add` command creates a todo and prints confirmation in `src/todo.test.ts`
- [ ] [T47] [P1] [S2] Write test: CLI `list` command prints formatted todo table in `src/todo.test.ts`
- [ ] [T48] [P1] [S3] Write test: CLI `complete` command marks todo as done and prints confirmation in `src/todo.test.ts`
- [ ] [T49] [P1] [S4] Write test: CLI `delete` command removes todo and prints confirmation in `src/todo.test.ts`
- [ ] [T50] [P2] Write test: CLI `add` with no description prints error and exits with code 1 in `src/todo.test.ts`
- [ ] [T51] [P2] Write test: CLI `complete` with non-numeric ID prints error and exits with code 1 in `src/todo.test.ts`

## Phase 9: Build & Verify

- [ ] [T52] [P0] Run `npm run build` and verify `dist/todo.js` is generated without TypeScript errors
- [ ] [T53] [P0] Run `npm test` and verify all new and existing tests pass
- [ ] [T54] [P1] Manually test full workflow: add several todos, list them, complete one, delete one, list again to confirm state
