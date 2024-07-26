const { createAssignment, editAssignment, deleteAssignment, scheduledAssignment } = require("../models/assignment");


exports.createAssignment = async(data) => {
    try {
        return await createAssignment(data);
    } catch (err) {
        throw(err);
    }
}

exports.editAssignment = async(data) => {
    try {
        return await editAssignment(data);
    } catch (err) {
        throw(err);
    }
}

exports.deleteAssignment = async(data) => {
    try {
        return await deleteAssignment(data);
    } catch (err) {
        throw(err);
    }
}

exports.scheduledAssignment = async(data) => {
    try {
        return await scheduledAssignment(data);
    } catch (err) {
        throw(err);
    }
}