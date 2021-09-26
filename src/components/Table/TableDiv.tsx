import { refactronTableInfo } from '../../functions/refactorTableInfo';
import TableRanksDiv from './TableRanksDiv';

import styles from './TableDiv.module.css';

import { FactionName, RankForTableView } from '../../types';

function TableDiv({ ranksArr }: { ranksArr: RankForTableView[] }) {
    const [solo, names] = refactronTableInfo(ranksArr);
    let index = 0;

    const factionGrids = names.map((name, i) => {
        const ii = index;
        index += 4;
        const faction: FactionName = name as FactionName;
        return (
            <div
                className={styles.factionGrid}
                key={name}
                style={{
                    borderRight: i % 2 === 0 ? '0.1em solid gray' : undefined,
                    borderBottom:
                        i < names.length - 1 ? '0.1em solid gray' : undefined,
                }}
            >
                <TableRanksDiv solo={solo} name={faction} index={ii} />
            </div>
        );
    });

    return <div className={styles.container}>{factionGrids}</div>;
}

export default TableDiv;
