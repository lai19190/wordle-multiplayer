import type { GuessState } from '../../../shared/types'
import Cell from './cell'

const Row = ({ guess, states }: { guess: string; states: GuessState[] }) => {
  return (
    <div className="grid grid-cols-5">
      <Cell char={guess[0]} state={states[0]} />
      <Cell char={guess[1]} state={states[1]} />
      <Cell char={guess[2]} state={states[2]} />
      <Cell char={guess[3]} state={states[3]} />
      <Cell char={guess[4]} state={states[4]} />
    </div>
  )
}

export default Row
