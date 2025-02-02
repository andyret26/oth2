import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { TbSearch, TbArrowsSort } from "react-icons/tb"
import dayjs from "dayjs"
import CircularProgress from "@mui/material/CircularProgress"
import { useLocation } from "react-router-dom"
import { GetTournamentsByPlayerIdAsync } from "../../services/othApiService"
import { Tournament } from "../../helpers/interfaces"
import "animate.css"
import TournamentContainer from "../../components/TournamentContainer"
import InputFiled from "../../components/common/InputFiled/InputField"
import SelectBox from "../../components/common/SelectBox/SelectBox"
import "./History.scss"

export default function History() {
  const { getIdTokenClaims, isAuthenticated } = useAuth0()
  const location = useLocation()
  const [query, setQuery] = useState<string>("")
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null)
  const [playerName, setPlayerName] = useState<string>("")
  const [logdinId, setLogdinId] = useState<number>(0)
  const [, setSortOpt] = useState<string>("Date (New First)")

  let content

  if (tournaments === null) {
    content = <CircularProgress color="secondary" />
  } else if (tournaments.length === 0) {
    content = <p>No Tournaments</p>
  } else {
    content = (
      <TournamentContainer
        tournamentsList={tournaments.filter((t) =>
          t.name.toLowerCase().includes(query.toLowerCase())
        )}
        logdinId={logdinId}
      />
    )
  }

  useEffect(() => {
    const id = location.pathname.split("/")[2]
    const getTournaments = () => {
      GetTournamentsByPlayerIdAsync(+id).then((res) => {
        setTournaments(res)
        setPlayerName(res[0].teamMates.find((p) => p.id === +id)!.username)
      })
    }
    getTournaments()

    if (isAuthenticated) {
      getIdTokenClaims().then((res) => {
        setLogdinId(+res!.sub.split("|")[2])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isAuthenticated])

  function handleSortChange(sortValue: string) {
    setSortOpt(sortValue)
    if (
      tournaments === null ||
      tournaments === undefined ||
      tournaments.length === 0
    )
      return

    let updatedTournaments
    if (sortValue === "Date (Old First)") {
      updatedTournaments = tournaments.sort(
        (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
      )
    } else if (sortValue === "Name") {
      updatedTournaments = tournaments.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    } else if (sortValue === "Date (New First)") {
      updatedTournaments = tournaments.sort(
        (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()
      )
    }

    setTournaments(updatedTournaments!)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="history-page page">
      <h1 className="history-page__title">{playerName}&#39;s History</h1>
      <div className="history-page__inputs">
        <InputFiled
          value={query}
          onChange={handleSearchChange}
          placeholder="Search..."
          Icon={TbSearch}
        />

        <div className="history-page__sort">
          <TbArrowsSort size={20} />
          <SelectBox
            id="history-sort"
            options={[
              { label: "Date (New First)", value: "Date (New First)" },
              { label: "Date (Old First)", value: "Date (Old First)" },
              { label: "Name", value: "Name" },
            ]}
            onChange={(e) => handleSortChange(e)}
          />
        </div>
      </div>
      {content}
    </div>
  )
}
