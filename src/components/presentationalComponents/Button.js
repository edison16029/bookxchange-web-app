import { Button } from 'antd';

const StandardButton = (props) => {
    return (
        <Button className = {props.className} onClick = {props.onClick}>{props.buttonText}</Button>
    )
}

export default StandardButton;