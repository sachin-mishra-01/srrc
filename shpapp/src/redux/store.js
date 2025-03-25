import { configureStore } from '@reduxjs/toolkit'
import  Cardslice  from './slices/Cardslice'

export const store = configureStore({
  reducer: {
    cards: Cardslice
  },
})
