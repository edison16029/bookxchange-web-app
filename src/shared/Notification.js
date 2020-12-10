import { notification } from 'antd';

const openNotification = (type, title, description) => {
    const config = {
        message: title,
        description: description,
        duration : 3,
        'topLeft' : true
    }
    notification[type](config);
};

export default openNotification;
