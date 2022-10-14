const { orderBy, uniqBy, isEqual, uniq, union } = require("lodash");
const Message = require("../models/message");
const { notifyUsers } = require("./notification");

exports.create = async (req, res) => {
  try {
    const message = await (
      await Message.create({ ...req.body, sender: req.user.id })
    ).populate("sender receiver");
	
    notifyUsers("New Message", req.body.message, req.body.receiver);
    res.status(201).send({ status: res.statusCode, body: message });
  } catch (error) {
    // console.log(error)
    res.status(401).send({ message: "Error creating Message", error });
  }
};
exports.getAllMessage = async (req, res) => {
  console.log(req.params.receiver);
  try {
    const message = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.receiver },
        { sender: req.params.receiver, receiver: req.user.id },
      ],
    }).populate("sender receiver");

    res.status(201).send({ status: res.statusCode, body: message });
  } catch (error) {
    // console.log(error)
    res.status(401).send({ message: "Error reading Message", error });
  }
};

// exports.getAllConnectedUser = async (req, res) => {
// 	console.log(req.user)
// 	try {
// 		const message = await Message.find({
// 			$or: [
// 				{sender: req.user.id},
//                 {receiver: req.user.id},
//             ]
//         }).populate("sender receiver")

// 		var filteredUsers = uniqWith(message, function(arrVal, othVal) {
// 			// console.log("This is from all connected user ",othVal)
// 			return arrVal.receiver._id === othVal.receiver._id || arrVal.sender._id != othVal.receiver._id;
// 		})
// 		.map((users) => {
// 			if(users.receiver._id == req.user.id) {
// 				return {...users._doc,sender: users.receiver,receiver: users.sender};
// 			}
// 			return users
// 		})

// 		res.status(201).send({ status: res.statusCode, body: filteredUsers })
// 	} catch (error) {
//         // console.log(error)
// 		res.status(401).send({ message: 'Error reading Message' })
// 	}
// }

exports.getAllConnectedUser = async (req, res) => {
  const { id: userId } = req.user;

  const messages = await Message.find({
    $or: [{ receiver: userId }, { sender: userId }],
  })
    .sort({ createdAt: -1 })
    .populate("receiver sender")
  let array = [];

  for (const message of messages) {
    array.push(
      { ...message.sender._doc, message: message.message , createdAt: message.createdAt},
      { ...message.receiver._doc, message: message.message, createdAt: message.createdAt }
    );
  }
  let users = array.reduce((prev, next) => {
    if (prev?.length === 0) {
      return [next];
    }
    let isPresent = prev?.find((p) => p._id.toString() == next._id.toString());
    if (!isPresent) {
      return [...prev, next];
    } else {
      return prev;
    }
  }, []);
  const filteredUsers = users.filter((u) => u._id.toString() !== userId);

//   res.send(filteredUsers);
  res.status(201).send({ status: res.statusCode, body: filteredUsers })
};