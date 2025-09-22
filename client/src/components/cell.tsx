import type { GuessState } from '../../../shared/types'

const Cell = ({ char, state: status }: { char: string; state: GuessState }) => {
  const baseProps = 'm-1 h-15 w-15 flex justify-center items-center text-2xl font-bold uppercase'
  const cellStateProps = {
    hit: 'bg-green-500 text-white',
    present: 'bg-yellow-500 text-white',
    miss: 'bg-gray-500 text-white',
    filled: 'bg-white text-gray-500 border-gray-600 border-1',
    empty: 'bg-white text-gray-500 border-gray-300 border-1',
  }[status]

  return <div className={`${baseProps} ${cellStateProps}`}>{char}</div>
}

export default Cell
