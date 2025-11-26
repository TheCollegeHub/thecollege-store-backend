import { OrderStatus } from '../models/order.js';

/**
 * Status Transition Matrix
 * Defines valid transitions between order statuses
 * 
 * Current Status -> Allowed Next Statuses
 */
export const STATUS_TRANSITION_MATRIX = {
  [OrderStatus.PENDING]: [
    OrderStatus.PENDING,
    OrderStatus.IN_TRANSIT
  ],
  [OrderStatus.IN_TRANSIT]: [
    OrderStatus.IN_TRANSIT,
    OrderStatus.OUT_FOR_DELIVERY
  ],
  [OrderStatus.OUT_FOR_DELIVERY]: [
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED
  ],
  [OrderStatus.DELIVERED]: [
    OrderStatus.DELIVERED,
    OrderStatus.RETURNED
  ],
  [OrderStatus.RETURNED]: [
    OrderStatus.RETURNED
  ]
};

/**
 * Validates if a status transition is allowed
 * @param {string} currentStatus - Current order status
 * @param {string} newStatus - Desired new status
 * @returns {Object} - { valid: boolean, message: string }
 */
export function validateStatusTransition(currentStatus, newStatus) {
  // Check if current status exists
  if (!STATUS_TRANSITION_MATRIX[currentStatus]) {
    return {
      valid: false,
      message: `Invalid current status: ${currentStatus}`
    };
  }

  // Check if new status is valid
  if (!Object.values(OrderStatus).includes(newStatus)) {
    return {
      valid: false,
      message: `Invalid new status: ${newStatus}`
    };
  }

  // Check if transition is allowed
  const allowedTransitions = STATUS_TRANSITION_MATRIX[currentStatus];
  if (!allowedTransitions.includes(newStatus)) {
    return {
      valid: false,
      message: `Invalid transition from ${currentStatus} to ${newStatus}. Allowed transitions: ${allowedTransitions.join(', ')}`
    };
  }

  return {
    valid: true,
    message: `Valid transition from ${currentStatus} to ${newStatus}`
  };
}

/**
 * Gets all allowed transitions for a given status
 * @param {string} currentStatus - Current order status
 * @returns {Array<string>} - Array of allowed status transitions
 */
export function getAllowedTransitions(currentStatus) {
  return STATUS_TRANSITION_MATRIX[currentStatus] || [];
}

/**
 * Status descriptions
 */
export const STATUS_DESCRIPTIONS = {
  [OrderStatus.PENDING]: 'Ready to be shipped',
  [OrderStatus.IN_TRANSIT]: 'In transit',
  [OrderStatus.OUT_FOR_DELIVERY]: 'Out for delivery',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.RETURNED]: 'Returned to warehouse'
};
