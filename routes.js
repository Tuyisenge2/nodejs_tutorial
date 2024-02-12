const express = require("express")
    const Post = require("./post") // new
    const router = express.Router()
    
    // Get all posts
    router.get("/posts", async (req, res) => {
        const posts = await Post.find()
        res.send(posts)
    })
    
    router.get("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.params.id })
            res.send(post)
        } catch {
            res.status(404)
            res.send({ error: "Post doesn't exist!" })
        }
    })


    router.post("/posts", async (req, res) => {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
        })
        await post.save()
        res.send(post)
    })

    module.exports = router