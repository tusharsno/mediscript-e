#!/bin/bash

# Test script for medicine reminder notifications
# Usage: ./test-notifications.sh

API_URL="http://localhost:3000/api/medicine-reminder/send-notifications"
API_KEY="mediscript-cron-secret-2026"

echo "🔔 Testing Medicine Reminder Notifications..."
echo "API URL: $API_URL"
echo ""

response=$(curl -s -X POST "$API_URL" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$response" | jq '.' 2>/dev/null || echo "$response"
echo ""
echo "✅ Test completed"
