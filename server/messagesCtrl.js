let allMessages = [];

let getAllMessages = (req, res) => {
    res.status(200).json(allMessages)
}

let createMessage = (req, res) => {
    const {username, message} = req.body;
    const newMessage = {
        username,
        message
    } 
    allMessages.push(newMessage);

    if(req.session.history){
        req.session.history.push(newMessage);
    } else {
        req.session.history = [];
        req.session.history.push(newMessage);
    }
    res.status(200).json(allMessages)
}

let getHistory = (req, res) => {
    res.status(200).json(req.session.history);
}

module.exports = {
    getAllMessages,
    createMessage,
    getHistory
}