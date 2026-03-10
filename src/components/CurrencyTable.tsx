import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const CurrencyTable = async () => {
  const payload = await getPayload({ config: configPromise })
  const { docs: rates } = await payload.find({
    collection: 'currency-rates',
    sort: 'currency_name',
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Live Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Last updated: {new Date().toLocaleDateString()}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Currency</TableHead>
              <TableHead>Code</TableHead>
              <TableHead className="text-right">Buy</TableHead>
              <TableHead className="text-right">Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell className="font-medium">{rate.currency_name}</TableCell>
                <TableCell>{rate.currency_code}</TableCell>
                <TableCell className="text-right">{rate.buy_rate}</TableCell>
                <TableCell className="text-right">{rate.sell_rate}</TableCell>
              </TableRow>
            ))}
            {rates.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No rates available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
