# Feature Spec: Todo List Manager

## Overview

A CLI-based todo list manager that allows users to add, list, complete, and delete todo items. Todos are persisted in a local JSON file (`todos.json`) in the current working directory. The feature follows the existing chorus-playground patterns: standalone TypeScript source file, raw `process.argv` parsing, exported functions for testability, and no external runtime dependencies.

## Motivation

The project currently only has simple one-shot commands (hello, goodbye, greet) that produce output and exit. A todo list manager introduces stateful, CRUD-style operations that persist data between invocations. This gives the project a more practical utility while still keeping things simple enough to serve as a learning tool for CLI patterns in TypeScript.

## User Stories

- **S1**: As a user, I want to add a new todo item from the command line so that I can track things I need to do.
- **S2**: As a user, I want to list all my todo items so that I can see what needs to be done and what is already completed.
- **S3**: As a user, I want to mark a todo item as complete so that I can track my progress.
- **S4**: As a user, I want to delete a todo item so that I can remove items I no longer need.
- **S5**: As a user, I want my todos to persist between sessions so that I don't lose my data when I close the terminal.

## Requirements

### Functional Requirements

1. **Add command**: `todo add <description>` creates a new todo item with a unique numeric ID, the given description, and a `completed: false` status. Prints confirmation with the assigned ID.
2. **List command**: `todo list` displays all todo items in a formatted table showing ID, status (checkbox), and description. Supports an optional `--done` flag to filter only completed items and `--pending` flag to filter only pending items.
3. **Complete command**: `todo complete <id>` marks the specified todo item as completed. Prints confirmation. Completing an already-completed item prints a notice but is not an error.
4. **Delete command**: `todo delete <id>` removes the specified todo item from the store. Prints confirmation.
5. **Persistence**: All todo data is stored in a `todos.json` file in the current working directory. The file is created automatically on first use.
6. **ID assignment**: IDs are auto-incrementing positive integers. A deleted ID is never reused within the same file.

### Non-Functional Requirements

1. **No external dependencies**: Uses only Node.js built-in modules (`fs`, `path`).
2. **Performance**: Operations should complete in under 100ms for files with up to 1,000 todos.
3. **Data integrity**: The JSON file must always be valid JSON after any operation. Write operations use `writeFileSync` to avoid partial writes.
4. **Error messages**: All error messages are written to `console.error` and the process exits with code 1 on errors.

## API / Interface Design

```
Usage: todo <command> [options]

Commands:
  add <description>      Add a new todo item
  list [--done|--pending] List todo items (optionally filter by status)
  complete <id>          Mark a todo item as completed
  delete <id>            Remove a todo item

Examples:
  todo add "Buy groceries"
  todo list
  todo list --pending
  todo complete 1
  todo delete 2
```

### JSON Storage Format

```json
{
  "nextId": 4,
  "todos": [
    { "id": 1, "description": "Buy groceries", "completed": false, "createdAt": "2026-02-17T12:00:00.000Z" },
    { "id": 2, "description": "Walk the dog", "completed": true, "createdAt": "2026-02-17T12:01:00.000Z" },
    { "id": 3, "description": "Read a book", "completed": false, "createdAt": "2026-02-17T12:02:00.000Z" }
  ]
}
```

## Edge Cases & Error Handling

1. **No arguments**: Print usage help and exit with code 1.
2. **Unknown command**: Print `Unknown command: <cmd>` and usage help, exit with code 1.
3. **Add with empty description**: Print error `Description is required`, exit with code 1.
4. **Complete/Delete with missing ID**: Print error `ID is required`, exit with code 1.
5. **Complete/Delete with non-numeric ID**: Print error `ID must be a number`, exit with code 1.
6. **Complete/Delete with non-existent ID**: Print error `Todo with ID <id> not found`, exit with code 1.
7. **Missing `todos.json` on read**: Treat as empty store (`{ "nextId": 1, "todos": [] }`).
8. **Corrupted `todos.json`**: Print error `Failed to read todos file: <reason>`, exit with code 1.
9. **File system permission errors**: Let the native error propagate with a descriptive message.

## Dependencies

- Node.js built-in `fs` module for file I/O
- Node.js built-in `path` module for file path resolution
- No external runtime dependencies (consistent with project constitution)

## Out of Scope

- Due dates or priority levels on todo items
- Categories or tags
- Multi-user support
- Remote sync or cloud storage
- Interactive/prompt-based UI (all operations are single commands)
- Editing a todo description after creation
- Sorting or reordering todos

## Open Questions

None -- the feature is straightforward and all decisions have been resolved.
