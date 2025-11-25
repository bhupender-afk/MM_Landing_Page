export interface GraphDataPoint {
  ask: number
  bid: number
  spread: number
  time: number
}

export interface ContentStage {
  id: string
  title: string
  subtitle: string
  description: string
  graphState: 'before' | 'improving' | 'improved' | 'after'
}

export interface OrderBookGraphProps {
  progress: number
  currentStage: number
  isVisible: boolean
}

export interface MarketMakingProps {
  className?: string
}