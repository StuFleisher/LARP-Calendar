import { TicketStatus } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Icon, Tooltip } from "@mui/material";

type RenderIcon = {
    icon: JSX.Element;
    color: string;
    tooltip: string;
};

type AvailabilityIconProps = {
    status: TicketStatus;
};

function AvailabilityIcon({ status }: AvailabilityIconProps) {
    let renderIcon: RenderIcon;

    if (status === "AVAILABLE") {
        renderIcon = {
            icon: <FontAwesomeIcon icon={faCircleCheck} />,
            color: 'green',
            tooltip: 'Available'
        };
    } else if (status === "LIMITED") {
        renderIcon = {
            icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
            color: 'goldenrod',
            tooltip: 'Limited'
        };
    } else {
        renderIcon = {
            icon: <FontAwesomeIcon icon={faCircleXmark} />,
            color: 'red',
            tooltip: 'Sold Out'
        };
    }

    return (
        <Icon
            sx={{
                color: renderIcon.color,
                height: '100%'
            }}
        >
            <Tooltip title={renderIcon.tooltip}>
                {renderIcon.icon}
            </Tooltip>
        </Icon>
    );
}

export default AvailabilityIcon;