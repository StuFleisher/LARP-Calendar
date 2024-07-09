import { Larp } from "../../types"
import { Box, Stack } from "@mui/material"
import LarpCard from "./LarpCard"



type LarpListProps = {
    larps: Larp[]
}

function LarpList({larps}:LarpListProps){
    return (
        larps.map((larp)=>(
            <LarpCard key={larp.id} larp={larp}/>
        ))
    )
}

export default LarpList