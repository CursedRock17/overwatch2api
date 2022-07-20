export type Chars = {
    Ana: boolean,
    Ashe: boolean,
    Baptiste: boolean,
    Bastion: boolean,
    Brigitte: boolean,
    Cassidy: boolean,
    DVa: boolean,
    Doomfist: boolean,
    Echo: boolean,
    Genji: boolean, 
    Hanzo: boolean, 
    Junkrat: boolean,
    Lucio: boolean,
    Mei: boolean,
    Mercy: boolean,
    Moira: boolean,
    Orisa: boolean,
    Pharah: boolean,
    Reaper: boolean,
    Reinhardt: boolean,
    Roadhog: boolean,
    Sigma: boolean,
    Soldier76: boolean,
    Sombra: boolean,
    Symmetra: boolean,
    Torbjorn: boolean,
    Tracer: boolean,
    Widowmaker: boolean,
    Winston: boolean,
    WreckingBall: boolean,
    Zarya: boolean,
    Zenyatta: boolean
}

export type UserDetails = {
    Tank?: number,
    DPS?: number,
    Support?: number,
    Online: boolean,
    Microphone: boolean,
    Username?: string,
    Playstyle?: string,
    Region?: string,
    Heroes?: Chars,
    Id?: string,
    Invites?: Array<string>,
}

export type DetailsContextProps = {
    children: React.ReactNode
}

export type DetailsContextType = {
    userDetails: UserDetails | null,
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>
}


export type QueryType = {
    DPSMin?: number,
    DPSMax?: number,
    TankMin?: number,
    TankMax?: number,
    SupportMin?: number,
    SupportMax?: number,
    Online?: boolean,
    Microphone?: boolean,
    Region?: string,
    Playstyle?: string,
    Username?: string
}

export type GroupType = {
    Rank?: string,
    Microphone?: boolean,
    Region?: string,
    Playstyle?: string,
    Id?: string,
    Timestamp?: Date,
    DPSOne?: string,
    DPSTwo?: string,
    TankOne?: string,
    TankTwo?: string,
    SupportOne?: string,
    SupportTwo?: string,
    Gamemode?: string,
    UserId?: string
}