import { RankForTableView } from '../types'

type ModeObj = {
    [key: number]: RankForTableView;
};
type RanksObj = {
    solo: {
        [key: string]: ModeObj;
    };
    team: [];
};
type Result = [(RankForTableView | undefined)[], string[]];

export function refactronTableInfo(ranksArr: RankForTableView[]): Result {
    const ranksObj: RanksObj = {
        solo: {
            sov: {},
            usa: {},
            uk: {},
            wer: {},
            okw: {},
        },
        team: [],
    }

    for (const r of ranksArr) {
        const groups = r.name.match(/^(\d)v\d(.+)/)

        if (groups) {
            if (groups[2] === 'Soviet') {
                ranksObj.solo.sov[+groups[1]] = r
            } else if (groups[2] === 'AEF') {
                ranksObj.solo.usa[+groups[1]] = r
            } else if (groups[2] === 'British') {
                ranksObj.solo.uk[+groups[1]] = r
            } else if (groups[2] === 'German') {
                ranksObj.solo.wer[+groups[1]] = r
            } else if (groups[2] === 'WestGerman') {
                ranksObj.solo.okw[+groups[1]] = r
            }
        }
    }

    const solo: (RankForTableView | undefined)[] = []
    const names = ['sov', 'wer', 'usa', 'okw', 'uk']

    names.forEach((key: string) => {
        for (let i = 1; i < 5; i++) {
            const o: RankForTableView = ranksObj.solo[key][i]
            if (o) {
                solo.push(o)
            } else {
                solo.push(undefined)
            }
        }
    })

    return [solo, names]
}
