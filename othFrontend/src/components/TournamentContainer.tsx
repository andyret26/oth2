import { FadeInOnScroll } from "./FadeInOnScroll"
import { Tournament } from "../helpers/interfaces"
import TourneyCard from "./TourneyCard"

interface CompProps {
  tournamentsList: Tournament[]
  logdinId: number
}

export default function TournamentContainer({
  tournamentsList,
  logdinId,
}: CompProps) {
  return (
    <div className="tourney-card-container">
      {tournamentsList.map((t) => (
        <FadeInOnScroll key={t.id}>
          <TourneyCard tournament={t} logdinId={logdinId} />
        </FadeInOnScroll>
      ))}
    </div>
  )
}
