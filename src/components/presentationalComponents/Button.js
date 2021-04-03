import { Button } from 'antd';
import '../../styles/buttons.scss'

const StandardButton = (props) => {
    return (
        <Button className = {props.className} onClick = {props.onClick}>{props.buttonText}</Button>
    )
}

const UpdateButton = (props) => {
    return (
        <Button className = {"update-button " + props.className} onClick = {props.onClick}>{props.buttonText}</Button>
    )
}

export { UpdateButton };
export default StandardButton;