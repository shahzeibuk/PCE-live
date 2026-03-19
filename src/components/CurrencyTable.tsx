import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { ArrowUpRight } from 'lucide-react'

const FLAG_MAP: Record<string, string> = {
  USD: '🇺🇸', GBP: '🇬🇧', EUR: '🇪🇺', SAR: '🇸🇦', AED: '🇦🇪',
  CAD: '🇨🇦', AUD: '🇦🇺', JPY: '🇯🇵', CNY: '🇨🇳', PKR: '🇵🇰'
}

export const CurrencyTable = async () => {
  let rates: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'currency-rates',
      sort: 'currency_name',
      pagination: false,
    })
    rates = result.docs
  } catch (error) {
    console.error('Error fetching currency rates in CurrencyTable:', error)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Live Market</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          Last sync: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <div className="bg-white dark:bg-slate-950 border rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-12">Currency</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-12 text-right">Buy</TableHead>
              <TableHead className="font-bold text-slate-900 dark:text-slate-100 h-12 text-right">Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate: any) => (
              <TableRow key={rate.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors border-b last:border-0">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                      {FLAG_MAP[rate.currency_code] || '🏳️'}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{rate.currency_code}</div>
                      <div className="text-[10px] uppercase tracking-tighter text-muted-foreground font-medium">{rate.currency_name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4 font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                  {Number(rate.buy_rate).toFixed(2)}
                </TableCell>
                <TableCell className="text-right py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {Number(rate.sell_rate).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {rates.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-muted-foreground italic font-medium">
                  Loading latest market rates...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
