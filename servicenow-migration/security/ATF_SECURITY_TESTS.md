# ATF Security Tests (Core Modules)

## Test 1: Agent cannot update out-of-scope claim

- Login as user with x_rcm_nexus.agent
- Open claim not assigned to user/group
- Attempt update through form or API
- Assert access denied

## Test 2: Audit role read-only enforcement

- Login as x_rcm_nexus.audit user
- Attempt create/update/delete on claim and denial records
- Assert all write operations denied
- Assert read operations succeed

## Test 3: Integration role UI restriction

- Login as integration role user
- Verify interactive workspace access is blocked
- Verify API call with correct auth still works

## Test 4: API action authorization

- Validate read actions allowed for audit role
- Validate write actions denied for audit role
- Validate write actions allowed for agent/supervisor/admin based on scope

## Test 5: Field-level protection

- Attempt access to sensitive fields with unauthorized role
- Assert masked/blocked behavior based on ACL policy

## Test 6: Logging redaction check

- Trigger scrub and RTA actions
- Inspect logs
- Assert no full PHI payload appears in plaintext
