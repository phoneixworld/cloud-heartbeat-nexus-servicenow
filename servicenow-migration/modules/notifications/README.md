# Module: Notifications

This module ports notification-center behavior into ServiceNow.

## Scope

- Return notification feed with category/severity filters
- Return unread and severity summary counts
- Mark individual notifications as read
- Mark all notifications as read for current user
- Seed baseline sample notifications for workspace smoke tests

## Required tables

- x_rcm_nexus_notification_feed
- sysevent (optional event source)
- sys_notification (optional delivery integration)

## Required script include

- x_rcm_NotificationService

## Required Scripted REST resource

- scripted-rest/x_rcm_notifications_api.js

## API usage

- GET action=list
- GET action=summary
- POST action=mark_read
- POST action=mark_all_read
- POST action=seed_demo
