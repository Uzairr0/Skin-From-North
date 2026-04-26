import { Router } from 'express'
import { createOrder, listOrders, updateOrderStatus } from '../controllers/ordersController'
import { requireAdmin } from '../middleware/adminAuth'

const router = Router()

router.post('/', createOrder)
router.get('/', requireAdmin, listOrders)
router.patch('/:id/status', requireAdmin, updateOrderStatus)

export default router

