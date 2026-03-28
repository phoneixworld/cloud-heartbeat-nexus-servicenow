# ATF: Notifications Module

## Test 1: Seed demo notifications

- Ensure notification table empty
- Call POST action=seed_demo
- Assert seeded rows inserted

## Test 2: List and filter endpoints

- Call GET action=list with filter=all, unread, critical, claims, ai, deadlines
- Assert records follow expected category and severity filters

## Test 3: Summary endpoint

- Call GET action=summary
- Assert total, unread, critical, and warning counters

## Test 4: Mark read actions

- Call POST action=mark_read for a single notification
- Call POST action=mark_all_read
- Assert is_read=true and read_at set

## Test 5: Invalid action handling

- Call invalid GET/POST actions
- Assert 400 response
