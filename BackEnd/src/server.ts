// src/server.ts  (hoặc index.ts)
import express from 'express'
import type { Request, Response } from 'express'
import routeUser from '@/route/user.route'
import routeAuthentication from '@/route/authentication.route'
import routeService from '@/route/service.route'
import routerManagementService from '@/route/managementService.route'
import routerManagementServiceItem from '@/route/managementServiceItem.route'
import routerAmin from './route/admin/admin.route'
import 'dotenv/config'; 
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())    
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', routeUser) 
app.use('/api/authentication',routeAuthentication)
app.use('/api/service',routeService)
app.use('/api/service-management',routerManagementService)
app.use('/api/service-item-management',routerManagementServiceItem)
app.use('/api/admin',routerAmin)
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`)
})