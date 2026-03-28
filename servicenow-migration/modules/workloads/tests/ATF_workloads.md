# ATF: Workloads Module

## Test 1: Queues list ordering

- Seed queue rows with different priority values
- Call GET action=queues
- Assert rows are returned in ascending priority order

## Test 2: Items list with status filter

- Seed items with open, assigned, in_progress, completed statuses
- Call GET action=items with status=in_progress
- Assert only in_progress rows are returned

## Test 3: Assign item

- Seed one open item
- Call POST action=assign with item_sys_id and assigned_to
- Assert status is assigned and assigned_at is populated

## Test 4: Complete item

- Seed one assigned item
- Call POST action=complete with item_sys_id and completion_notes
- Assert status is completed and completed_at is populated

## Test 5: Summary counters

- Seed mixed items including escalated rows
- Call GET action=summary
- Assert total_items, open_items, in_progress_items, completed_items, escalated_items values
