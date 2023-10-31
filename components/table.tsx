//@ts-nocheck
import {Reorder, motion} from 'framer-motion'
import { useState, useEffect, useContext } from 'react';

export default function ScoreTable({greenProgress, redProgress, purpleProgress, blueProgress, teamName}: any) {
const [tableData, setTableData] = useState<any>([])

useEffect(() => {
  setTableData([
    { teamName: 'Green Team', currentScore: `${greenProgress}`, stepsCompleted: 5 },
    { teamName: "Red Team", currentScore: `${redProgress}`, stepsCompleted: 2 },
    { teamName: "Purple Team", currentScore: `${purpleProgress}`, stepsCompleted: 3 },
    { teamName: "Blue Team", currentScore: `${blueProgress}`, stepsCompleted: 4 },
  ]);
},[greenProgress, redProgress, purpleProgress, blueProgress])


  // Sort the table data based on the current score in descending order

const sortedTableData = tableData.sort((a, b) => Number(b.currentScore) - Number(a.currentScore));

  return (
    <>
      <div className="flex flex-col mt-8 overflow-auto-x">
        <Reorder.Group values={tableData} onReorder={setTableData}>
          <table className="min-w-full text-white text-sm text-center auto font-sohne">
            <thead className="px-8 border-b dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4 text-6xl sm:text-2xl">
                  Team Name
                </th>
                <th scope="col" className="px-6 px-4 text-6xl sm:text-2xl">
                  Current Score
                </th>
                <th scope="col" className="px-6 px-4 text-6xl sm:text-2xl">
                  Steps Completed
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTableData.map((row, index) => (
                <motion.tr
                  key={row.teamName}
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    restDelta: 0.001,
                  }}
                  layout
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  className="border-b px-6 py-4 hover:bg-sky-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  <Reorder.Item
                  as='td'
                  className="whitespace-nowrap px-6 py-4 text-4xl sm:text-lg">
                    {row.teamName}
                  </Reorder.Item>
                  <Reorder.Item
                  as='td' 
                  className="whitespace-nowrap px-6 py-4 text-4xl sm:text-lg">
                    {row.currentScore}
                  </Reorder.Item>
                  <Reorder.Item 
                  as='td'
                  className="whitespace-nowrap px-6 py-4 text-4xl sm:text-lg">
                    {row.stepsCompleted}
                  </Reorder.Item>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Reorder.Group>
      </div>
    </>
  );
}
