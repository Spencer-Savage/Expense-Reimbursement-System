interface WarningAlertProps {
    message: string;
}
export const WarningAlert:React.FC<WarningAlertProps> = ({message}) => {
    return(
        <div className="alert alert-warning" role="alert">
            <strong>Warning: </strong><span>{message}</span>
        </div> 
    )
}