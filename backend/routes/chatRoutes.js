const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router();

router.route("/").post(protect, accessChat); //for accessing chat and create chat
router.route("/").get(protect, fetchChats); //to get all chats from db for that user
router.route("/group").post(protect, createGroupChat);  //    "users": "[\"64f302fe80b1422947db365d\".\"64fb1246219d21dc91c3c2b4\"]" to stringify users id
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup); 

module.exports = router;