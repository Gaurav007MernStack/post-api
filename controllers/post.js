const { POST } = require('../models/index');

const postRegister = async (req, res) => {
    try {
        const { title, authorInformation, content } = req.body;

        if (!title || !authorInformation || !content)
            return res.status(400).json({ message: "All Field Are Required" });

        const postData = new POST(req.body)
        await postData.save();
        return res.status(200).json({ message: "Success", post: postData });

    } catch (error) {
        return res.status(400).json({ error: "User not Found" });
    }

}

const postGetAll = async (req, res) => {
    try {
        const post = await POST.find()
        if (!post)
            return res.status(400).json({ message: "Post are not available" });

        return res.status(200).json({ message: "Success", data: post });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const postgetById = async (req, res) => {
    try {
        const post = await POST.findOne({ _id: req.params._id })
        if (!post)
            return res.status(400).json({ message: "Post Not Found" })
        return res.status(200).json({ message: "Success", data: post })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const postUpdate = async (req, res) => {
    try {
        const post = await POST.findByIdAndUpdate({ _id: req.params._id }, req.body, {
            new: true
        });
        if (!post)
            return res.status(201).json({ message: "post Not Found" });

        return res.status(200).json({ message: "post Update Successfully ", data: post });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const postDelete = async (req, res) => {
    try {
        const post = await POST.findOneAndDelete({ _id: req.params._id });
        if (!post)
            return res.status(400).json({ message: "post Not Found" });
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ err: error.message });
    }
}
module.exports = { postRegister, postGetAll, postgetById, postUpdate, postDelete };