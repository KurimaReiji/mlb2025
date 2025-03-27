import { fileURLToPath } from 'url';
const __dirname = import.meta.dirname;

import { writeFileSync } from 'fs';

const season = process.argv.slice(2).at(0) || "2025";

const [startDate, endDate] = [`${season}-03-15`, `${season}-10-10`];
const URL = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${startDate}&endDate=${endDate}`; // &hydrate=team

const inputs = await fetch(URL, { cache: "no-cache", })
  .then((response) => response.json());

const data = inputs.dates
  .map((o) => o.games)
  .flat()
  .filter((g) => g["seriesDescription"] === "Regular Season") // 2430 games
  ;[].map((g) => {
    return {
      gamePk: g.gamePk,
      date: g.gameDate,
      teams: {
        home: g.teams.home.team.name,
        away: g.teams.away.team.name
      },
      venue: g.venue.name
    }
  })
  ;

const output = JSON.stringify(data, null, 2);
const outfile = import.meta.resolve(`${__dirname}/../Schedule/mlb-schedule-${season}.json`);
writeFileSync(fileURLToPath(outfile), output);
