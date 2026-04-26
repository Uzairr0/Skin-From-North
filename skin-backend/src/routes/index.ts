import { Router } from 'express'
import { healthCheck } from '../controllers/healthController'
import ordersRouter from './orders'
import adminRouter from './admin'
import productsRouter from './products'

const router = Router()

router.get('/health', healthCheck)
router.use('/products', productsRouter)
router.use('/orders', ordersRouter)
router.use('/admin', adminRouter)

export default router

