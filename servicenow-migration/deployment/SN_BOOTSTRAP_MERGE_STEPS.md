# ServiceNow Bootstrap Merge Steps (Command-by-Command)

Use this after App Engine Studio creates the first fluent-app commit on branch sn-bootstrap.

## Preconditions

1. ServiceNow app x_rcm_nexus is connected to:
   - Repo: phoneixworld/cloud-heartbeat-nexus-servicenow
   - Branch: sn-bootstrap
2. App Engine Studio completed first source-control commit successfully.

## Commands (run locally)

1. Fetch latest bootstrap commit from GitHub:

```bash
git fetch servicenow-origin
```

2. Switch to bootstrap branch and fast-forward to ServiceNow commit:

```bash
git checkout sn-bootstrap
git pull --ff-only servicenow-origin sn-bootstrap
```

3. Merge migration baseline from main into sn-bootstrap:

```bash
git merge main
```

4. If merge conflicts occur, resolve files, then:

```bash
git add -A
git commit -m "Merge ServiceNow fluent app bootstrap with migration baseline"
```

5. Push merged branch back to GitHub:

```bash
git push servicenow-origin sn-bootstrap
```

6. In ServiceNow App Engine Studio, pull latest from source control.

## Optional: Make bootstrap branch the primary ServiceNow integration branch

If you want ServiceNow to continue on sn-bootstrap as the long-lived branch, keep it as-is.

If you want to move to main after successful pull:

1. Open source control settings in ServiceNow.
2. Switch branch to main.
3. Pull latest.

## Verification checks

1. No fluent app found error is gone.
2. Script Includes and APIs are visible in app scope.
3. Step 6 playbook execution can proceed.

## Safety note

Do not delete sn-bootstrap until at least one full successful Step 6 wave cycle is completed.
