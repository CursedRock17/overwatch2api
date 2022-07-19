export const DropdownInputRegion = (props:any) => {
    return (
        <select
        title="Region"
        onChange={(e) => props.change(e.target.value)}
        >
        <option value="Unset">Unset</option>
        <option value="Eastern Asia">Eastern Asia</option>
        <option value="Western Asia">Western Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="Eastern Europe">Eastern Europe</option>
        <option value="Central Europe">Central Europe</option>
        <option value="Western Europe">Western Europe</option>
        <option value="West North America">West North America</option>
        <option value="Central North America"> Central North America</option>
        <option value="East North America">East North America</option>
        <option value="South America">South America</option>
        <option value="Extra">Extra</option>
        </select>
    )
}

export const DropdownInputPlaystyle = (props:any) => {
    return (
        <select 
        title="Playstyle"
        onChange={(e) => props.change(e.target.value)} 
        >
        <option value="Anything">Anything</option>
        <option value="Dive">Dive</option>
        <option value="Bunker">Bunker</option>
        <option value="Brawl">Brawl</option>
        <option value="Pirate Ship">Pirate Ship</option>
        <option value="Double Sniper">Double Sniper</option>
        <option value="Anti-Dive">Anti-Dive</option>
    </select>
    )
}

export const DropdownInputRank = (props:any) => {
    return (
    <select 
        title="Rank"
        onChange={(e) => props.change(e.target.value)} 
        >
        <option value="Bronze">Bronze</option>
        <option value="Silver">Silver</option>
        <option value="Gold">Gold</option>
        <option value="Platnium">Platnium</option>
        <option value="Diamond">Diamond</option>
        <option value="Master">Master</option>
        <option value="Grandmaster">Grandmaster</option>
        <option value="Top 500">Top 500</option>
    </select>
    )
}

export const DropdownInputGamemode = (props:any) => {
    return (
    <select 
        title="Gamemode"
        onChange={(e) => props.change(e.target.value)} 
        >
        <option value="Quick Play">Quick Play</option>
        <option value="Competitive">Competitive</option>
    </select>
    )
}


export default { DropdownInputPlaystyle, DropdownInputRegion, DropdownInputRank, DropdownInputGamemode }