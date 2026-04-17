import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "./Button";

function QuantityControls({
    onClickLeft=null,
    onClickRight=null,
    quantityText="",
    isSmallSize=false,
    className=""
}) {
    return (
        <div className={`flex items-center gap-2 pt-2 ${className}`}>
            <Button
                onClick={onClickLeft || undefined}
                isIconOnly={true}
                size={isSmallSize ? "sm" : "md"}
            >
                <FontAwesomeIcon icon="fa-solid fa-minus" className={`text-gray-700 ${isSmallSize ? "text-sm" : "text-lg"}`} />
            </Button>

            <span className="text-center font-medium text-sm px-2">{quantityText}</span>
            
            <Button
                onClick={onClickRight || undefined}
                isIconOnly={true}
                size={isSmallSize ? "sm" : "md"}
                variant="dark"
            >
                <FontAwesomeIcon icon="fa-solid fa-plus" className={`text-white ${isSmallSize ? "text-sm" : "text-lg"}`} />
            </Button>
        </div>
    );
}

export default QuantityControls;