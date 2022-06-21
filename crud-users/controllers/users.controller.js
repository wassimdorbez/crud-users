const Users = require('../models/users.models')
const ValidateUser = require('../validation/Users.validation')

//add user
const AddUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body);
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            await Users.findOne({ Email: req.body.Email }).then(async (exist) => {
                if (exist) {
                    errors.Email = "User Exist";
                    res.status(404).json(errors);
                } else {
                    await Users.create(req.body);
                    res.status(201).json({ message: "User added" });
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

//find all users
const FindAllUsers = async (req, res) => {
    //res.send('all users found') find all users = find
    try {
        const data = await Users.find()
        res.status(201).json(data)
    }
    catch (error) { console.log(error.message) }
}


//find single user
const FindSingleUser = async (req, res) => {
    //res.send('user are found') find single = findOne
    try {
        const data = await Users.findOne({ _id: req.params.id })
        res.status(201).json(data)
    }
    catch (error) { console.log(error.message) }
}
//update user
const PutUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body);

    //res.send('user puted') put user = findOneAndUpdate
    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {

        const data = await Users.findOneAndUpdate(
            { _id: req.params.id }, req.body, { new: true }
        )
        res.status(201).json(data)
    }}
    catch (error) { console.log(error.message) }
}

//delete user
const DeleteUser = async (req, res) => {
    //res.send('user deleted') drop user = findOneAndRemove DeleteOne
    try {
        await Users.deleteOne({ _id: req.params.id })
        res.status(201).json({ message: 'user deleted' })
    }
    catch (error) { console.log(error.message) }
}


//-----------------------------------------//
module.exports = {
    AddUser,
    FindAllUsers,
    FindSingleUser,
    PutUser,
    DeleteUser
};