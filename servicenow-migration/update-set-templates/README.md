# Update Set XML Templates

These XML files are starter templates in update-set style for faster manual import/build in ServiceNow.

Important:
- Replace placeholder sys_id values before import.
- Validate scope, app id, and table names in your instance.
- Prefer moving these through a dedicated update set in lower environments first.

## Included templates

- script-includes/sys_script_include_core.xml
- scripted-rest/sys_ws_definition_core.xml
- acls/sys_security_acl_core.xml

## Placeholder conventions

- __SYS_ID_*__ : replace with unique 32-char sys_id
- __SCOPE__ : x_rcm_nexus
- __APP_SYS_ID__ : scoped app sys_id

## Recommended process

1. Create records manually once in dev and export XML.
2. Diff exported XML with these templates.
3. Align metadata fields (sys_scope, sys_package, active flags).
4. Import/update in dev and promote via update set.
