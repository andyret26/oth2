import axios, { AxiosResponse, isAxiosError } from "axios"
import toast from "react-hot-toast"
import { TournamentPost, Tournament, PlayerMin } from "../helpers/interfaces"

const OTH_API_URL = "http://localhost:5110/api/v1"

export async function AddPlayerAsync(id: number, token: string): Promise<void> {
  await axios.post(
    `${OTH_API_URL}/player/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  toast.success("Player added")
}

export async function AddPlayerByUsernameAsync(
  username: string,
  token: string
): Promise<void> {
  await axios.post(
    `${OTH_API_URL}/player/postByUsername/${username}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  toast.success("Player added")
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
): Promise<void | AxiosResponse> {
  try {
    await axios.post(`${OTH_API_URL}/tournament`, tournament, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response
    }
  }
}

export async function GetTournamentById(id: number): Promise<Tournament> {
  const response = await axios.get(`${OTH_API_URL}/tournament/${id}`)
  return response.data
}

export async function UpdateTournament(
  tournament: TournamentPost,
  token: string
): Promise<void | AxiosResponse> {
  try {
    await axios.put(`${OTH_API_URL}/tournament/${tournament.id}`, tournament, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.log("Update error")
    if (isAxiosError(error)) {
      return error.response
    }
  }
  toast.success("Tournament updated")
}
