import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'

declare namespace scrubland {
  interface Activity extends DestinyHistoricalStatsPeriodGroup {
    characterId?: string
    startDate?: Date
    endDate?: Date
    offset?: number
  }
}
