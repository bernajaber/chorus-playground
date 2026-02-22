# Spec Kit: Task Format Rules

Tasks MUST follow this exact checklist format:

```
- [ ] [TaskID] [P?] [Story?] Description with file path
```

## Field Definitions

- **Checkbox**: `- [ ]` (unchecked) or `- [x]` (completed)
- **TaskID**: Required. Bracket-wrapped unique ID, e.g. `[T01]`, `[T02]`, `[T13]`
- **Priority** (optional): `[P0]` = critical, `[P1]` = high, `[P2]` = medium, `[P3]` = low
- **Story** (optional): Bracket-wrapped story reference, e.g. `[S1]`, `[S2]`
- **Description**: Free text describing the task. Should reference file paths where applicable using backtick formatting, e.g. `src/weather.ts`

## Examples

```
- [ ] [T01] [P0] [S1] Create weather lookup module at `src/weather.ts`
- [ ] [T02] [P1] Add error handling for network failures in `src/weather.ts`
- [ ] [T03] [P2] [S2] Write unit tests in `src/weather.test.ts`
- [x] [T04] [P3] Update README with usage docs
```

## Rules

1. Every task MUST start with `- [ ]` or `- [x]`
2. Every task MUST have a `[TaskID]` immediately after the checkbox
3. Priority and Story tags are optional but must appear in order: Priority before Story
4. Description is free-form text after all tags
5. File paths in descriptions should use backtick formatting
6. TaskIDs must be unique within a tasks.md file
