import axios from "axios"
import { TournamentPost, Tournament, PlayerMin } from "../helpers/interfaces"

const OTH_API_URL = "http://localhost:5110/api/v1"

export async function AddPlayerAsync(id: number, token: string): Promise<void> {
  const response1 = await axios.get(`${OTH_API_URL}/player/exists/${id}`)

  if (response1.data) {
    console.log("Player already exists")
    return
  }
  await axios.post(`${OTH_API_URL}/player/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// Get players
export async function GetPlayersMinAsync(): Promise<PlayerMin[]> {
  const response = await axios.get(`${OTH_API_URL}/player/min`)
  return response.data
}

export async function GetTournamentsByPlayerIdAsync(
  id: number
): Promise<Tournament[]> {
  const response = await axios.get(`${OTH_API_URL}/tournament/player/${id}`)
  return response.data
}

export async function AddTournamentAsync(
  tournament: TournamentPost,
  token: string
): Promise<void> {
  await axios.post(`${OTH_API_URL}/tournament`, tournament, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function GetTournamentById(id: number): Promise<Tournament> {
  const response = await axios.get(`${OTH_API_URL}/tournament/${id}`)
  return response.data
}
