# ATF: Zero Trust Module

## Test 1: Overview endpoint

- Seed audit rows with and without PHI access and valid hash lengths
- Call GET action=overview
- Assert counts and hash_chain_intact calculation

## Test 2: Compliance matrix endpoint

- Call GET action=compliance_matrix
- Assert required standards and status fields are present

## Test 3: MFA methods endpoint

- Call GET action=mfa_methods
- Assert method/status/recommended fields

## Test 4: Encryption posture endpoint

- Call GET action=encryption_posture
- Assert layer/standard/status rows

## Test 5: Invalid action handling

- Call GET with unknown action
- Assert 400 response
