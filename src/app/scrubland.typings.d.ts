import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2';

declare namespace scrubland {
  interface Activity extends DestinyHistoricalStatsPeriodGroup {
    startDate?: Date;
    endDate?: Date;
  }
}
