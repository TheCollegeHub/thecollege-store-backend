# Order Status Webhook System

## Overview

This system implements a robust webhook infrastructure for tracking and notifying external systems about order status changes in the e-commerce backend.

## Status Flow

```
PENDING → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED → RETURNED
```

### Status Descriptions

- **PENDING** - Ready to be shipped
- **IN_TRANSIT** - In transit
- **OUT_FOR_DELIVERY** - Out for delivery
- **DELIVERED** - Delivered
- **RETURNED** - Returned to warehouse

## Transition Matrix

| Current Status    | → PENDING | → IN_TRANSIT | → OUT_FOR_DELIVERY | → DELIVERED | → RETURNED |
|-------------------|-----------|--------------|-------------------|-------------|------------|
| PENDING           | ✅        | ✅           | ❌                | ❌          | ❌         |
| IN_TRANSIT        | ❌        | ✅           | ✅                | ❌          | ❌         |
| OUT_FOR_DELIVERY  | ❌        | ❌           | ✅                | ✅          | ❌         |
| DELIVERED         | ❌        | ❌           | ❌                | ✅          | ✅         |
| RETURNED          | ❌        | ❌           | ❌                | ❌          | ✅         |

✅ = Allowed transition  
❌ = Invalid transition (will be rejected)

## API Endpoints

### 1. Update Order Status

**Endpoint:** `PATCH /api/webhooks/orders/:orderNumber/status`

**Request Body:**
```json
{
  "newStatus": "IN_TRANSIT",
  "reason": "Package picked up by carrier"
}
```

**Success Response (200):**
```json
{
  "orderId": "64f5a2b3c1e2d3f4g5h6i7j8",
  "orderNumber": "ORD-1700912345678",
  "previousStatus": "PENDING",
  "newStatus": "IN_TRANSIT",
  "statusDescription": "In transit"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid transition from PENDING to DELIVERED. Allowed transitions: PENDING, IN_TRANSIT",
  "currentStatus": "PENDING",
  "attemptedStatus": "DELIVERED",
  "allowedTransitions": ["PENDING", "IN_TRANSIT"]
}
```
## Usage Examples

### Example 1: Move order from PENDING to IN_TRANSIT

```bash
curl -X PATCH http://localhost:3000/api/webhooks/orders/ORD-1700912345678/status \
  -H "Content-Type: application/json" \
  -d '{
    "newStatus": "IN_TRANSIT",
    "reason": "Picked up by FedEx"
  }'
```

### Example 2: Mark order as delivered

```bash
curl -X PATCH http://localhost:3000/api/orders/ORD-1700912345678/status \
  -H "Content-Type: application/json" \
  -d '{
    "newStatus": "DELIVERED",
    "reason": "Delivered to recipient"
  }'
```

## Error Handling

### Invalid Transition

If you attempt an invalid transition, the API returns:

```json
{
  "error": "Invalid transition from IN_TRANSIT to DELIVERED. Allowed transitions: IN_TRANSIT, OUT_FOR_DELIVERY",
  "currentStatus": "IN_TRANSIT",
  "attemptedStatus": "DELIVERED",
  "allowedTransitions": ["IN_TRANSIT", "OUT_FOR_DELIVERY"]
}